/**
 * Picture model events
 */

'use strict';

import {EventEmitter} from 'events';
var Picture = require('./picture.model');
var PictureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PictureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Picture.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PictureEvents.emit(event + ':' + doc._id, doc);
    PictureEvents.emit(event, doc);
  }
}

export default PictureEvents;
