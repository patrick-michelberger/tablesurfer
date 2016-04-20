'use strict';

var express = require('express');
var controller = require('./table.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index); // Should show all dinners of the user
router.get('/:id', controller.show); // TODO: Special public view

// Should only be used by admins, normally dinners are created by a job
router.post('/', auth.hasRole('admin'), controller.create); 

// Most fields should only be modified by the host
router.put('/:id/address', auth.isAuthenticated(), controller.changeAddress); 
router.put('/:id/time', auth.isAuthenticated(), controller.changeTime); 
router.put('/:id', auth.isAuthenticated(), controller.update); 
router.patch('/:id', auth.isAuthenticated(),controller.update);

// Should only be deleted by admins, the host can however cancel a dinner
// for this the patch/put route or a resource is used and the dinner remains in our DB.
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;