'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var AWS = require('../../components/aws');
var fs = require('fs');

var validationError = function(res, err) {
    return res.status(422).json(err);
};

var populateFields = "currentCity university";

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword -phonecode').populate(populateFields).exec(function(err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId).populate(populateFields).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.status(500).send(err);
        return res.status(204).send('No Content');
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.status(200).send('OK');
            });
        } else {
            res.status(403).send('Forbidden');
        }
    });
};

/**
 * Change a users current city
 */
exports.changeCity = function(req, res, next) {
    var userId = req.user._id;
    var city = req.body.city;
    User.findById(userId, function(err, user) {
        user.currentCity = city._id;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change a users's first name
 */
exports.changeEmail = function(req, res, next) {
    var userId = req.user._id;
    var email = req.body.email;
    User.findById(userId, function(err, user) {
        user.email = email;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change a users's first name
 */
exports.changeFirstName = function(req, res, next) {
    var userId = req.user._id;
    var firstName = req.body.firstName;
    User.findById(userId, function(err, user) {
        user.first_name = firstName;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change a users's gender
 */
exports.changeGender = function(req, res, next) {
    var userId = req.user._id;
    var gender = req.body.gender;
    User.findById(userId, function(err, user) {
        user.gender = gender;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change a users's profile picture 
 */
exports.uploadPicture = function(req, res, next) {
    var file = req.files.file;
    fs.readFile(file.path, function(err, imageData) {
        fs.unlinkSync(file.path);
        AWS.uploadS3('tablesurfer', "profile_pictures/" + file.name, imageData, file.type, function(err, s3Url) {
            if (err) {
                console.log("Error uploading to S3: ", err);
            }
            var userId = req.user._id;
            var picture = s3Url;

            User.findById(userId, function(err, user) {
                user.picture = picture;
                user.save(function(err) {
                    if (err) return validationError(res, err);
                    res.status(200).send({picture: s3Url});
                });
            });
        });
    });
};


/**
 * Change a users's last name
 */
exports.changeLastName = function(req, res, next) {
    var userId = req.user._id;
    var lastName = req.body.lastName;
    User.findById(userId, function(err, user) {
        user.last_name = lastName;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change registration status
 */
exports.setRegistrationCompleted = function(req, res, next) {
    var userId = req.user._id;
    var registrationCompleted = req.body.registrationCompleted;
    User.findById(userId, function(err, user) {
        user.registrationCompleted = registrationCompleted;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};

/**
 * Change a users phone number
 */
exports.changePhone = function(req, res, next) {
    var userId = req.user._id;

    User.findById(userId, function(err, user) {
        if (err || !req.body.phone) {
            return next(err);
        }
        user.phone = req.body.phone;

        user.createPhonecode(function(err) {
            if (err) {
                return next(err);
            }
            res.send(200);
        });

    });

};

/**
 * Change a users preferred weekdays
 */
exports.changeWeekdays = function(req, res, next) {
    var userId = req.user._id;
    User.findById(userId, function(err, user) {
        if (err || !req.body.weekdays) {
            return next(err);
        }
        user.weekdays = req.body.weekdays;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
};


/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -password -phonecode -verifycode').populate(populateFields).exec(function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
