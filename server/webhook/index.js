'use strict';

import express from 'express';
import config from '../config/environment';
import User from '../api/user/user.model';
import request from 'request';
var _ = require('lodash');

var Knwl = require("knwl.js");

const router = express.Router();
const Bot = require('./bot.js');

let bot = new Bot({
    token: config.facebook.pageToken,
    verify: config.facebook.verifyToken
});

bot.on('message', (payload, reply) => {

    console.log("Payload.state ", payload.state);
    // special messages
    if (payload.message.text === 'Vergiss mich.' && payload.user) {
        payload.user.remove((err) => {
            if (err) {
                console.log(err);
                reply({ 'text': 'Wir konnten dich nicht vergessen.' });
                return;
            }
            reply({ 'text': 'Bis zum nächsten mal.' });
            return;
        });
    }

    if (payload.state === 'newUser') {
        bot.saveUser(payload.sender.id, (err, profile) => {
            if (err) {
                reply({ text: 'Hey ' + profile.first_name + ', your signup failed. We work on it! Please try it later again.' }, (err, info) => {});
            } else {
                reply({ text: 'Hey ' + profile.first_name + ', willkommen bei tablesurfer!' }, (err, info) => {});
                // handle received message
                //reply({ text: 'hey whats up!' }, (err, info) => {});
                bot.askForStatus(payload.sender.id);
            }
        });
    } else if (payload.state === 'askEmail') {
        let user = payload.user;
        let email = parseEmail(payload.message.text);

        if (!email) {
            reply({ 'text': 'Dein letzter Text enthielt leider keine E-Mail Adresse.' });
            return;
        }

        user.email = email;
        user.createVerifycode(function(err) {
            if (err) {
                console.log(err);
                reply({ 'text': 'Wir konnten deine E-Mail Adresse leider nicht abspeichern. Probiere es später nochmal.' });
                return;
            }
            bot.askForVerifycode(payload.sender.id);
        });
    } else if (payload.state === 'askVerifycode') {
        // We want to keep the verify code over the website.
        reply({ 'text': 'Du bist noch nicht verifiziert.' });
    } else if (payload.state === 'askWeekdays' && payload.message) {
        bot.askWit(payload.message.text, function(error, response) {
            if (error) {
                console.log('Oops! Got an error: ' + error);
            } else {
                const weekdaysEntities = response && response.outcomes && response.outcomes.length > 0 && response.outcomes[0] && response.outcomes[0].entities && response.outcomes[0].entities['weekday_type'];
                var weekdays = _.pluck(weekdaysEntities, 'value');

                var weekdaysString = weekdays.map((weekday) => {
                    return weekday.toUpperCase();
                });

                reply({ 'text': "Super, wir haben " + weekdaysString + " als deine bevorzugten Wochentage abgespeichert!" });
                reply({ 'text': "Sobald wir eine passende Tablesurfer Gruppe für dich gefunden haben, melden wir uns nochmal bei dir :)" });
            }
        });
    } else {
        bot.askWit(payload.message.text, function(response) {
            reply({ 'text': response });
        });
    }
});

var parseEmail = (string) => {
    let k = new Knwl();
    k.init(string);
    let emails = k.get('emails');

    if (emails.length > 0) {
        return emails[0].address;
    } else {
        return null;
    }
};

bot.on('postback', (payload, reply) => {
    switch (payload.postback.payload) {
        case 'change_language':
            reply({ 'text': 'change_language' });
            break;
        case 'signup':
            if (payload.state === 'newUser') {
                bot.saveUser(payload.sender.id, (err, profile) => {
                    if (err) {
                        reply({ text: 'Hey ' + profile.first_name + ', your signup failed. We work on it! Please try it later again.' }, (err, info) => {});
                    } else {
                        reply({ text: 'Hey ' + profile.first_name + ', willkommen bei tablesurfer!' }, (err, info) => {});
                        // handle received message
                        //reply({ text: 'hey whats up!' }, (err, info) => {});
                        bot.askForStatus(payload.sender.id);
                    }
                });
            }
            break;
        case 'student_status_yes':
            if (payload.state === 'askEmail') {
                reply({ 'text': 'Wie lautet deine Uni-Mail-Adresse? (z.B. sven.mustermann@tum.de)' });
            } else {
                reply({ 'text': 'Deine Campus-Email ' + payload.user.email + ' wurde schon verifiziert.' });
            }
            break;
        case 'student_status_no':
            reply({ 'text': 'Tablesurfer ist nur für Studenten.' });
            break;
        case 'resend_verifycode':
            if (!payload.user.verified) {
                payload.user.createVerifycode(function(err) {
                    if (err) {
                        console.log(err);
                        reply({ 'text': 'Wir konnten deine E-Mail Adresse leider nicht abspeichern. Probiere es später nochmal.' });
                        return;
                    }
                    reply({ 'text': 'Wir haben dir nochmal eine Email an ' + payload.user.email + ' geschickt.' });
                });
            } else {
                reply({ 'text': 'Deine Email ' + payload.user.email + ' wurde schon verifiziert.' });
            }
            break;
        default:
            reply({ 'text': 'Sorry, dieses Befehl kennen wir leider nicht.' });
    }
});

router.all('/', bot.middleware());

export
default router;
