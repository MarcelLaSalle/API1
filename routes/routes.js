const express = require('express');
const router = express.Router();

const controller = require('../controller/myController');

router.get('/1', controller.example1);

module.exports = router;