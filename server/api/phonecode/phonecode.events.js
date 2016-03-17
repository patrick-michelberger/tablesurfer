/**
 * Phonecode model events
 */

'use strict';

import {EventEmitter} from 'events';
var Phonecode = require('./phonecode.model');
var PhonecodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PhonecodeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Phonecode.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PhonecodeEvents.emit(event + ':' + doc._id, doc);
    PhonecodeEvents.emit(event, doc);
  }
}

export default PhonecodeEvents;
