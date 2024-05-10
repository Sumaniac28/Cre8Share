const express = require("express");

const router = express.Router();

const passport = require('passport');

const cors = require("cors"); // Import cors package

const creatorController = require("../controllers/createorController");

// youtube authentication route
router.get('/auth/youtube',
  passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'] }));

router.get(
  "/auth/youtube/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  creatorController.signIN
);
module.exports = router;
