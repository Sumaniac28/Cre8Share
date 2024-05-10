const express = require('express');

const router = express.Router();

const passport = require('passport');

const stockController = require('../../../controllers/api/v1/stocksAPIController');

router.get('/',passport.authenticate('creator-jwt',{session:false}),stockController.getStocks);

module.exports=router;