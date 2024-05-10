const express= require('express');
const router= express.Router();
const stockController = require('../controllers/stockController');
const bodyParser = require('body-parser');
const passport = require('passport');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// will add failure redirect here
router.post('/addStock',passport.authenticate('creator-jwt',{session:false}),stockController.addStock);

module.exports=router;