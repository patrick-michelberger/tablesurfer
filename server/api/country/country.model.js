'use strict';

import mongoose from 'mongoose';

var CountrySchema = new mongoose.Schema({
    name: String
});

export default mongoose.model('Country', CountrySchema);