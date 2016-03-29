'use strict';

import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

import multipart from 'connect-multiparty';
var multipartMiddleware = multipart();

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/city', auth.isAuthenticated(), controller.changeCity);
router.put('/:id/phone', auth.isAuthenticated(), controller.changePhone);
router.put('/:id/email', auth.isAuthenticated(), controller.changeEmail);
router.put('/:id/weekdays', auth.isAuthenticated(), controller.changeWeekdays);
router.put('/:id/registration', auth.isAuthenticated(), controller.setRegistrationCompleted);
router.put('/:id/firstname', auth.isAuthenticated(), controller.changeFirstName);
router.put('/:id/lastname', auth.isAuthenticated(), controller.changeLastName);
router.put('/:id/gender', auth.isAuthenticated(), controller.changeGender);
router.post('/:id/picture', auth.isAuthenticated(), multipartMiddleware, controller.uploadPicture);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

export default router;
