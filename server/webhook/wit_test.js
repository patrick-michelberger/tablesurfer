'use strict'

let config = require('../config/environment');

const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    console.log("context: ", entities);
    cb(context);
  },
  error(sessionId, context, error) {
    console.log(error.message);
  },
};

const Wit = require('node-wit').Wit;
const client = new Wit(config.wit.token, actions);

client.message('montag dienstag mittwoch', (error, data) => {
  if (error) {
    console.log('Oops! Got an error: ' + error);
  } else {
    console.log('Yay, got Wit.ai response: ', data.outcomes[0].entities);
  }
});