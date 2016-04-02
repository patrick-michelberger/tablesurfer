'use strict';

var express = require('express');
var controller = require('./picture.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
