const router = require('express').Router();
const passport = require('passport');

const analyticsAPIController = require('./../../../controllers/api/v1/analyticsAPIController');

router.get('/', passport.authenticate('creator-jwt', { session: false }), analyticsAPIController.showAnalytics);

module.exports=router;