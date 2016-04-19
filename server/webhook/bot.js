'use strict'
const EventEmitter = require('events').EventEmitter;
const request = require('request');
import User from '../api/user/user.model';
import config from '../config/environment';

class Bot extends EventEmitter {
    constructor(opts) {
        super()

        opts = opts || {}
        if (!opts.token) {
            throw new Error('Missing page token. See FB documentation for details: https://developers.facebook.com/docs/messenger-platform/quickstart')
        }
        this.token = opts.token
        this.verify_token = opts.verify || false
    }

    saveUser(id, cb) {
        if (!cb) cb = Function.prototype
        this.getProfile(id, (err, profile) => {
            var user = new User({
                first_name: profile.first_name,
                last_name: profile.last_name,
                picture: profile.profile_pic,
                messengerId: id
            });
            user.save((err) => {
                cb(err, user);
            });
        });

    }

    getProfile(id, cb) {
        if (!cb) cb = Function.prototype
        request({
            method: 'GET',
            uri: 'https://graph.facebook.com/v2.6/' + id,
            qs: {
                fields: 'first_name,last_name,profile_pic',
                access_token: this.token
            },
            json: true
        }, (err, res, body) => {
            if (err) return cb(err)
            if (body.error) return cb(body.error)
            cb(null, body)
        })
    }

    sendMessage(recipient, payload, cb) {
        if (!cb) cb = Function.prototype

        request({
            method: 'POST',
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this.token
            },
            json: {
                recipient: { id: recipient },
                message: payload
            }
        }, (err, res, body) => {
            if (err) return cb(err)
            if (body.error) return cb(body.error)

            cb(null, body)
        })
    }

    verify(token) {
        return (req, res) => {
            if (req.method === 'GET') {
                let query = req.query;

                if (query['hub.verify_token'] === token) {
                    return res.send(query['hub.challenge'])
                }

                return res.send('Error, wrong validation token')
            }
        }
    }

    middleware() {
        return (req, res) => {
            var self = this;


            if (this.verify_token && req.method === 'GET') return this.verify(this.verify_token)(req, res)
            if (req.method !== 'POST') return res.end()

            let entries = req.body.entry

            entries.forEach((entry) => {
                let events = entry.messaging

                events.forEach((event) => {

                    let senderId = event.sender.id;

                    // lookup user with provider = facebook and id = sender.id
                    User.findOne({
                        messengerId: senderId
                    }, (err, user) => {
                        if (err) return res.end()

                        // append user object to event
                        event.user = user;

                        if (!user) {
                            event.state = "newUser";
                            // create new user
                        } else if (!user.email) {
                            event.state = "askEmail";
                            // add campusMail to user
                            // create verify code
                            // save user
                            // send verify code message with resend button
                        } else if (!user.verified) {
                            event.state = "askVerifycode";

                        } else if (!user.weekdays || user.weekdays.length === 0) {
                            // send weekday buttons
                            event.state = "askWeekdays";
                        }

                        // handle inbound messages
                        if (event.message) {
                            self._handleEvent('message', event)
                        }

                        // handle postbacks
                        if (event.postback) {
                            self._handleEvent('postback', event)
                        }

                        // handle message delivered
                        if (event.delivery) {
                            self._handleEvent('delivery', event)
                        }
                    });
                })
            })

            res.json({ status: 'ok' });
        }
    }

    _handleEvent(type, event) {
        this.emit(type, event, this.sendMessage.bind(this, event.sender.id))
    }

    _request(recipientId, messageData) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: config.facebook.pageToken
            },
            method: 'POST',
            json: {
                recipient: { id: recipientId },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    askForStatus(recipientId) {
        let messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Bist du ein Student?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Ja",
                        "payload": "student_status_yes"
                    }, {
                        "type": "postback",
                        "title": "Nein",
                        "payload": "student_status_no"
                    }]
                }
            }
        };
        this._request(recipientId, messageData);
    }

    askForVerifycode(recipientId) {
        let messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Gehe bitte auf den Verifizierungslink, den wir an deine E-Mail Adresse gesendet haben.",
                    "buttons": [{
                        "type": "postback",
                        "title": "Nochmal senden?",
                        "payload": "resend_verifycode"
                    }]
                }
            }
        }
        this._request(recipientId, messageData);
    }

    askPreferredWeekdays(recipientId, cb) {
        if (!cb) cb = Function.prototype
        let messageData1 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Deine bevorzugten Wochentage?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Montag",
                        "payload": "preferred_weekdays_monday"
                    }, {
                        "type": "postback",
                        "title": "Dienstag",
                        "payload": "preferred_weekdays_montag"
                    }, {
                        "type": "postback",
                        "title": "Mittwoch",
                        "payload": "preferred_weekdays_mittwoch"
                    }]
                }
            }
        };

        let messageData2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Deine bevorzugten Wochentage?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Donnerstag",
                        "payload": "preferred_weekdays_thursday"
                    }, {
                        "type": "postback",
                        "title": "Freitag",
                        "payload": "preferred_weekdays_friday"
                    }, {
                        "type": "postback",
                        "title": "Samstag",
                        "payload": "preferred_weekdays_saturday"
                    }]
                }
            }
        };
        this.sendMessage(recipientId, messageData1, () => {
            this.sendMessage(recipientId, messageData2, cb);
        });
    }
}

module.exports = Bot
