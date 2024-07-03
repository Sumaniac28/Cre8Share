// Requiring dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cron = require("node-cron");
const { refreshAnalyticsForAllCreators } = require("./controllers/creatorController");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt-strategy");
const passportYouTube = require("./config/passport-youtube-strategy");

// Initializing port
const port = process.env.PORT || 8000;

// Initializing app
const app = express();
const server = http.createServer(app);

// Initializing CORS options
const corsOptions = {
  origin: "http://localhost:3000",
};

// Scheduling cron job for every Friday to refresh
cron.schedule("0 12 * * 5", async () => {
  try {
    await refreshAnalyticsForAllCreators();
    console.log("Refresh function executed successfully");
  } catch (error) {
    console.error("Error executing refresh function:", error);
  }
});

// Using express-session
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

// Including bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Using router (should always be defined after session middleware)
app.use("/", require("./routes"));

// Handling socket events
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Hello Uncle Howdy");

  const refreshEvents = () => {
    socket.broadcast.emit("refreshUserStocks");
    socket.broadcast.emit("refreshCreatorStocks");
    socket.broadcast.emit("refreshCreatorAnalytics");
  };

  socket.on("addCreatorStocks", refreshEvents);
  socket.on("buyStock", refreshEvents);
  socket.on("sellStock", refreshEvents);
});

// Firing up server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
