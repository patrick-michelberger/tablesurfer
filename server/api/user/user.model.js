'use strict';

import crypto from 'crypto';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import { Schema } from 'mongoose';
import Phonecode from '../phonecode/phonecode.model';
import Verify from '../verifycode/verifycode.model';
import University from '../university/university.model';
import City from '../city/city.model';
import mail from '../../components/mail';
import config from '../../config/environment';
import Whatsapp from '../../components/whatsapp';
import Password from '../password/password.model';

const authTypes = ['facebook'];

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: String,
    provider: String,
    salt: String,
    locale: String,
    facebook: {},
    picture: String,
    phone: String,
    verifiedPhone: {
        type: Boolean
    },
    verified: {
        type: Boolean,
        default: false
    },
    registrationCompleted: {
        type: Boolean,
        default: false
    },
    verifycode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verifycode"
    },
    forgotpasswordcode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forgotpassword"
    },
    phonecode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phonecode"
    },
    currentCity: {
        "type": mongoose.Schema.ObjectId,
        "ref": "City"
    },
    university: {
        "type": mongoose.Schema.ObjectId,
        "ref": "University"
    },
    weekdays: []
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'first_name': this.first_name,
            'last_name': this.last_name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function(password) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        return this.constructor.findOne({ email: value }).exec()
            .then(function(user) {
                if (user) {
                    if (self.id === user.id) {
                        return respond(true);
                    }
                    return respond(false);
                }
                return respond(true);
            })
            .catch(function(err) {
                throw err;
            });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        // Handle new/update passwords
        if (!this.isModified('password')) {
            return next();
        }

        if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
            next(new Error('Invalid password'));
        }

        // Make salt with a callback
        this.makeSalt((saltErr, salt) => {
            if (saltErr) {
                next(saltErr);
            }
            this.salt = salt;
            this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
                if (encryptErr) {
                    next(encryptErr);
                }
                this.password = hashedPassword;
                next();
            });
        });
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate(password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        this.encryptPassword(password, (err, pwdGen) => {
            if (err) {
                return callback(err);
            }

            if (this.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
        }

        return crypto.randomBytes(byteSize, (err, salt) => {
            if (err) {
                callback(err);
            } else {
                callback(null, salt.toString('base64'));
            }
        });
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
            if (err) {
                callback(err);
            } else {
                callback(null, key.toString('base64'));
            }
        });
    },

    /**
     * Create phonecode and saves user
     *
     * @param {Function} callback
     * @api public
     */
    createPhonecode: function(callback) {
        var user = this;

        Phonecode.create({
            user: user._id,
            code: createRandomPhonecode(),
            phone: user.phone
        }, function(err, phonecode) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            user.phonecode = phonecode._id;
            user.verifiedPhone = false;
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                Whatsapp.sendMessage(user.phone, "Dein Verifizierungscode lautet: " + phonecode.code, true);
                callback();
            });
        });

    },

    /**
     * Create forgot password code and saves user
     *
     * @param {Function} callback
     * @api public
     */
    createForgotPasswordCode: function(callback) {
        var user = this;

        Password.create({ email: user.email, user: user._id }, function(err, forgotpasswordcode) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            user.forgotpasswordcode = forgotpasswordcode._id;

            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                var data = {
                    to: user.email,
                    url: config.domain + '/#/resetpassword/' + user.forgotpasswordcode,
                    user: user.profile,
                    template: 'forgotpassword.hbs',
                    subject: 'Tablesurfer - You are guest'
                };
                mail.send(data, callback);
            });
        });
    },
    
    /**
     * Create verifycode and saves user
     *
     * @param {Function} callback
     * @api public
     */
    createVerifycode: function(callback) {
        var user = this;

        Verify.create({ email: user.email, user: user._id }, function(err, verifycode) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            user.verifycode = verifycode._id;
            user.verified = false;
            user.save(function(err) {
                if (err) {
                    return callback(err);
                }

                var data = {
                    to: user.email,
                    url: config.domain + '/verify/' + user.verifycode,
                    template: 'verify.hbs',
                    subject: 'tablesurfer.org - verify your email'
                };

                mail.send(data, callback);
            });
        });
    },
};

// Create random phonecode
var createRandomPhonecode = function() {
    function randomIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
    var numbers = new Array(6);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = randomIntInc(1, 9);
    }
    return numbers.join("");
};

export default mongoose.model('User', UserSchema);
