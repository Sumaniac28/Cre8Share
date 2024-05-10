const express = require('express');

const router = express.Router();

const passport = require('passport');

const creatorsAPIController = require('../../../controllers/api/v1/creatorAPIController');
router.get("/", passport.authenticate("creator-jwt", { session: false }),creatorsAPIController.getCreatorData);

module.exports=router;