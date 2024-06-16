// Requiring dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cron = require("node-cron");
const {refreshAnalyticsForAllCreators}= require('./controllers/creatorController');

// Requiring database
const db = require("./config/mongoose");

// Initializing port
const port = process.env.PORT || 8000;

// Initializing app
const app = express();

// Initializing CORS options
const corsOptions = {
  origin: "http://localhost:3000",
};

//scheduling cron job for every friday to refresh
cron.schedule("0 12 * * 5", async () => {
  try {
    await refreshAnalyticsForAllCreators();
    console.log("Refresh function executed successfully");
  } catch (error) {
    console.error("Error executing refresh function:", error);
  }
});


//usimg express-session
app.use(
  expressSession({
    secret: "cre8share",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Enabling CORS middleware
app.use(cors(corsOptions));

//including bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport strategies
const passportJWT = require("./config/passport-jwt-strategy");
const passportYouTube = require("./config/passport-youtube-strategy");
app.use(passport.initialize());

// Using router (should always be defined after session middleware)
app.use("/", require("./routes"));

// Firing up server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
