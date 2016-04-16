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
    if (payload.state === 'newUser') {
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
                    
                    // handle received message
                    //reply({ text: 'hey whats up!' }, (err, info) => {});
                    bot.askForStatus(payload.sender.id);
                }
            });
        });
    } else if (payload.state === 'askEmail') {
      let user = payload.user;
      let email = parseEmail(payload.message.text);
      
      if(!email) {
        reply({'text': 'Dein letzter Text enthielt leider keine E-Mail Adresse.'});
        return;
      }
      
      user.email = email;
      user.createVerifycode(function(err){
        if(err) {
          console.log(err);
          reply({'text': 'Wir konnten deine E-Mail Adresse leider nicht abspeichern. Probiere es später nochmal.'});
          return;
        }
        bot.askForVerifycode(payload.sender.id);
      });
    } else if (state === 'askVerifycode') {
      // We want to keep the verify code over the website.
      reply({'text': 'Du bist noch nicht verifiziert.'});
    } else {
      reply({ text: 'Hey!' }, (err, info) => {});
    }
});

var parseEmail = (string) => {
    let k = new Knwl();
    k.init(string);
    let emails = k.get('emails');
    
    if(emails.length === 1) {
      return emails[1];
    } else {
      return null;
    }
};

bot.on('postback', (payload, reply) => {
  console.log('Received postback payload', payload);
  
  
});

router.all('/', bot.middleware());

export default router;
