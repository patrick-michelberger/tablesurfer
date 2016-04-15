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
    } else {
      // handle received message
      //reply({ text: 'hey whats up!' }, (err, info) => {});
    	bot.askForStatus(payload.sender.id);
    }
})

router.all('/', bot.middleware());

export default router;
