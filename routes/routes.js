const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');
const joiSchemaValidation = require('../middlewares/joiMiddleware.js');
const tripSchema = require('../models/tripSchema');

router.get(`/trips/:id`,
    joiSchemaValidation.joiValidate(tripSchema.tripIdSchema, `path`),
    controller.findById);

router.get('/trips',
    controller.getAll
);

//UPDATE DELETE CREATE
router.post('/trips',
    joiSchemaValidation.joiValidate(tripSchema.create, 'body'),
    controller.create
);

router.put('/trips/:id',
    joiSchemaValidation.joiValidate(tripSchema.tripIdSchema, 'params'),
    joiSchemaValidation.joiValidate(tripSchema.update, 'body'),
    controller.update
);

router.delete('/trips/:id',
    joiSchemaValidation.joiValidate(tripSchema.tripIdSchema, 'params'),
    controller.delete
);

module.exports = router;