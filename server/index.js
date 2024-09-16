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
    secret: "cre8share",
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
app.use(errorHandler);

app.use("/", require("./routes"));

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

async function testNotiflow(){
  try{
    const response = axios.post('http://localhost:8080/user/register',{
      name:'Sumit Grover',
      email:'',
      phone:'',
      password:'password',
      confirmPassword:'password'
    })

    console.log(response.message);
  }catch(err){
    console.log(err);
  }
}

async function testNotiflowMail(){
  try{
    const response = axios.post('http://localhost:8080/api/email/schedule/sendTemplateMail',{
      fromEmail: "",
      password: "",
      subject: "Testing scheduled mail",
      message: "Email for testing scheduled mail",
      recipients: [
          { "email": "", "type": "TO" },
          { "email": "", "type": "CC" },
          { "email": "", "type": "BCC" }
      ],
      scheduleFutureMail: '2024-08-31T19:56:00',
      templateImages: {
          "coverImageUrl": "https://images.unsplash.com/photo-1723398466717-12d0c8f6299c?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "companyLogoUrl": "https://images.unsplash.com/photo-1720491468850-368cd24ce9d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
  })
    console.log(response.data);
  }catch(err){
    console.log("error in sending mail "+err.data);
  }
}

//testNotiflow();
//testNotiflowMail();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
