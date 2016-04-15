'use strict';

import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';
import request from 'request';

const router = express.Router();
const Bot = require('./bot.js')

let bot = new Bot({
    token: config.facebook.pageToken,
    verify: config.facebook.verifyToken
});

bot.on('message', (payload, reply) => {
    if (payload.state == 'newUser') {
        bot.getProfile(payload.sender.id, (err, profile) => {
            var user = new User({
                first_name: profile.first_name,
                last_name: profile.last_name,
                picture: profile.profile_pic,
                messengerId: payload.sender.id
            });
            user.save(function(err) {
                if (err) {
                    reply({ text: 'Hey ' + profile.first_name  + ', your signup failed. We work on it! Please try it later again.' }, (err, info) => {});
                } else {
                    reply({ text: 'Hey ' + profile.first_name  + ', welcome to tablesurfer!' }, (err, info) => {});
                }
            });
        });
    } else  {
        // handle received message
        //reply({ text: 'hey whats up!' }, (err, info) => {});
    	sendGenericMessage(payload.sender.id);
    }
})

function sendGenericMessage(sender) {
  var messageData = {
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
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: config.facebook.pageToken},
    method: 'POST',
    json: {
      recipient: {id:sender},
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

router
    .all('/', bot.middleware());

export default router;
