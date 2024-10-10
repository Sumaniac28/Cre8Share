const express = require("express");

const router = express.Router();

const passport = require("passport");

const cors = require("cors"); // Import cors package

const creatorController = require("../controllers/creatorController");

require("../config/passport-jwt-strategy");

// youtube authentication route
router.get(
  "/auth/youtube",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
  })
);

router.get(
  "/auth/youtube/callback",
  passport.authenticate("google", { failureRedirect: (process.env.CLIENT_URL || "http://localhost:3000") }),
  creatorController.signIN
);

router.get("/logout", creatorController.logOut);
router.post(
  "/sendOTP",
  passport.authenticate("creator-jwt", { session: false }),
  creatorController.sendOTP
);

module.exports = router;
