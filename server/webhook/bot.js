'use strict'
const EventEmitter = require('events').EventEmitter;
const request = require('request');
const User = require('../api/user/user.model');

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

            if (this.verify_token && req.method === 'GET') return this.verify(this.verify_token)(req, res)
            if (req.method !== 'POST') return res.end()

            console.log("POST request from facebook...");

            let entries = req.body.entry

            entries.forEach((entry) => {
                let events = entry.messaging
                
                events.forEach((event) => {
                    
                    let sender_id = event.sender.id;
                    
                    // lookup user with provider = facebook and id = sender.id
                    User.findOne({
                      facebook_id: sender_id
                    }, (err, user) => {
                        if (err) return res.end()
                        
                        // append user object to event
                        event.user = user;
                      
                        if(!user)
                        {
                          event.state = "newUser";
                          // create new user
                          // fill all fields, that facebook gives us (name, id, maybe gender ...)
                        } else if(!user.email) {
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
                            this._handleEvent('message', event)
                        }

                        // handle postbacks
                        if (event.postback) {
                            this._handleEvent('postback', event)
                        }

                        // handle message delivered
                        if (event.delivery) {
                            this._handleEvent('delivery', event)
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
}

module.exports = Bot
