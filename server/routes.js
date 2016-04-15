/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/pictures', require('./api/picture'));
  app.use('/api/countries', require('./api/country'));
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/passwords', require('./api/password'));
  app.use('/api/verifycodes', require('./api/verifycode'));
  app.use('/api/universities', require('./api/university'));
  app.use('/api/cities', require('./api/city'));
  app.use('/api/phonecodes', require('./api/phonecode'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.use('/webhook', require('./webhook'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
