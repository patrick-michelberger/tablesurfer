'use strict';

import mongoose from 'mongoose';

var PictureSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Picture', PictureSchema);
