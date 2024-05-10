const express = require('express');
const router = express.Router();
const passport = require('passport');

const stockListAPIController = require('../../../controllers/api/v1/stockListAPIController');

router.get('/',passport.authenticate('user-jwt',{session:false}),stockListAPIController.getStockList);
module.exports = router;