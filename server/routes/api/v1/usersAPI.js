const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersAPIController= require('../../../controllers/api/v1/usersAPIController');

router.get("/", passport.authenticate("user-jwt", { session: false }),usersAPIController.getUserData);
router.get('/getPortfolio',passport.authenticate('user-jwt',{session:false}),usersAPIController.getPortfolio);

module.exports=router;