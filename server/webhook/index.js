'use strict';

import express from 'express';
import config from '../config/environment';

const router = express.Router();
const Bot = require('./bot.js')

let bot = new Bot({
    token: config.facebook.pageToken,
    verify: config.facebook.verifyToken
})

bot.on('message', (payload, reply) => {
    console.log("message...");
    reply({ text: 'hey!' }, (err, info) => {})
})

router
    .get('/', bot.middleware());

/*
router
    .get('/facebook', function(req, res) {
        // Callback URL for webhook subscription verification
        if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9') {
            res.send(req.query['hub.challenge']);
        } else {
            res.send('Error, wrong validation token');
        }
    })
    .post('/facebook', function(req, res) {
        
        console.log("POST request from Facebook: ");
        console.log("----------------------------");
        console.log("Object Type: ", req.body.object);
        console.log("List of changes: ", req.body.entry);
        console.log("X-Hub-Signature", req.get('X-Hub-Signature'));        
        
        messaging_events = req.body.entry[0].messaging;
        for (i = 0; i < messaging_events.length; i++) {
            event = req.body.entry[0].messaging[i];
            sender = event.sender.id;
            if (event.message && event.message.text) {
                text = event.message.text;
                // Handle a text message from this sender
                sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
            }
        }
     

        res.sendStatus(200);
    });


function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
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

function verifySignature(payload) {
	var signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), ENV['SECRET_TOKEN'], payload);
}
*/

export default router;
