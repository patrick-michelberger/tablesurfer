'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    domain: process.env.DOMAIN,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'tablesurfer-secret'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    linkedin: {
        apiKey: process.env.LINKEDIN_API_KEY || 'id',
        apiSecret: process.env.LINKEDIN_SECRET_KEY || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/linkedin/callback'
    },

    xing: {
        apiKey: process.env.XING_API_KEY || 'id',
        apiSecret: process.env.XING_SECRET_KEY || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/xing/callback'
    },


    twitter: {
        clientID: process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

    mail: {
        username: process.env.GMAIL_USERNAME ||  'username',
        password: process.env.GMAIL_PASSWORD ||  'password',
        service: 'gmail'
    },

    instagram: {
        accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || 'token',
        clientId: process.env.INSTAGRAM_CLIENT_ID || 'id',
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'secret'
    },

    aws: {
        accessKey: process.env.AWS_ACCESS_KEY || 'key',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ||  'secret',
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./shared'),
    require('./' + process.env.NODE_ENV + '.js') || {});
