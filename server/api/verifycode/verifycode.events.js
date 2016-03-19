/**
 * Verifycode model events
 */

'use strict';

import {EventEmitter} from 'events';
var Verifycode = require('./verifycode.model');
var VerifycodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VerifycodeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Verifycode.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VerifycodeEvents.emit(event + ':' + doc._id, doc);
    VerifycodeEvents.emit(event, doc);
  }
}

export default VerifycodeEvents;
