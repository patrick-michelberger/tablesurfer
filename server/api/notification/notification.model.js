'use strict';

import mongoose from 'mongoose';

var NotificationSchema = new mongoose.Schema({
	title: String,
    message: String,
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model('Notification', NotificationSchema);
