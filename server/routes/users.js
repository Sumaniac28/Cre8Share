const express= require('express');
const router= express.Router();
const usersController= require('../controllers/usersController');
const bodyParser = require('body-parser');
const passport = require('passport');``

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signUp',usersController.signUP);

router.post('/signIn',usersController.signIN);

router.post('/buy/:id',passport.authenticate('user-jwt'),usersController.buyStock);

router.post('/sell/:id',passport.authenticate('user-jwt'),usersController.sellStock);

module.exports=router;