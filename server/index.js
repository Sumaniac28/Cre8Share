require('dotenv').config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cron = require("node-cron");
const {
  refreshAnalyticsForAllCreators,
} = require("./controllers/creatorController");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt-strategy");
const passportYouTube = require("./config/passport-youtube-strategy");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const axios = require("axios");

const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true for HTTPS in production
      httpOnly: true,
      sameSite: "Lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.use(errorHandler);

cron.schedule("0 12 * * 5", async () => {
  try {
    await refreshAnalyticsForAllCreators();
    console.log("Refresh function executed successfully");
  } catch (error) {
    console.error("Error executing refresh function:", error);
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const refreshEvents = () => {
    io.emit("refreshUserStocks");
    io.emit("refreshCreatorStocks");
    io.emit("refreshCreatorAnalytics");
  };

  socket.on("addCreatorStocks", refreshEvents);
  socket.on("buyStock", refreshEvents);
  socket.on("sellStock", refreshEvents);
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});