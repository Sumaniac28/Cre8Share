// Setting up our database

// requiring mongoose
const mongoose = require("mongoose");
require("dotenv").config();

// connecting to our database
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// checking for connection
const db = mongoose.connection;

// if there is an error
db.on("error", console.error.bind(console, "connection error:"));

// if connection is successfull
db.once("open", () => {
  console.log("Database successfully connected!!");
});
