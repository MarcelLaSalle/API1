const express = require('express');
const router = express.Router();

const controller = require('../controller/exRoutes.js');
const middleware = require('../middlewares/joiMiddleware');
const userSchema = require('../models/userSchema');

router.get('/1', controller.ex1);
router.get('/2', controller.ex2);
// router.get('/3',
//     middlewate.checkNumberQueryParam,
//     controller.ex3);
router.get('/4', controller.ex4);
// router.get('/5', 
//     middlewate.checkParamGT1,
//     controller.ex5);
// router.put('/6',
//     middlewate.checkParamEqualsPassword,
//     controller.ex6);
//router.get('/7', controller.ex7);
router.get('/8', middleware.joiValidate(userSchema.createUserSchema, 'body'), controller.exjoi);

router.get('/9', controller.show);
router.post('/9', controller.add);
router.put('/9', controller.update);
router.delete('/9', controller.delete);

module.exports = router;