const router = require('express').Router();

router.use('/usersAPI', require('./usersAPI'));
router.use('/creatorsAPI', require('./creatorsAPI'));
router.use('/analyticsAPI', require('./analytticsAPI'));
router.use('/stocksAPI',require('./stocksAPI'));
router.use('/stockListAPI',require('./stockListAPI'));
module.exports = router;