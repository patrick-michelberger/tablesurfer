'use strict';

import express from 'express';
import passport from 'passport';
import { setTokenCookie } from '../auth.service';

var router = express.Router();

router
    .get('/', passport.authenticate('linkedin', {
        failureRedirect: '/signup',
        session: false,
        scope: ['r_basicprofile', 'r_emailaddress']
    }))
    .get('/callback', passport.authenticate('linkedin', {
        failureRedirect: '/signup',
        session: false
    }), setTokenCookie);

export default router;
