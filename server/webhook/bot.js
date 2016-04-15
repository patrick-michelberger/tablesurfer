'use strict'
const EventEmitter = require('events').EventEmitter;
const request = require('request');
import User from '../api/user/user.model';

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
                            event.state = "askVerifyCode";

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
          recipient: {id: recipientId},
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
    
    askForStatus(recpientId) {
      let messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "First card",
              "subtitle": "Element #1 of an hscroll",
              "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
              "buttons": [{
                "type": "web_url",
                "url": "https://www.messenger.com/",
                "title": "Web url"
              }, {
                "type": "postback",
                "title": "Postback",
                "payload": "Payload for first element in a generic bubble",
              }],
            },{
              "title": "Second card",
              "subtitle": "Element #2 of an hscroll",
              "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
              "buttons": [{
                "type": "postback",
                "title": "Postback",
                "payload": "Payload for second element in a generic bubble",
              }],
            }]
          }
        }
      }
      this._request(recipientId, messageData);
    }
}

module.exports = Bot
