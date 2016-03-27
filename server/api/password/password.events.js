/**
 * Password model events
 */

'use strict';

import {EventEmitter} from 'events';
var Password = require('./password.model');
var PasswordEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PasswordEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Password.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PasswordEvents.emit(event + ':' + doc._id, doc);
    PasswordEvents.emit(event, doc);
  }
}

export default PasswordEvents;
