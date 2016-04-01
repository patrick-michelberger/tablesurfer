'use strict';

import mongoose from 'mongoose';

var CountrySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Country', CountrySchema);
