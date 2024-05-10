// Setting up our database

// requiring mongoose
const mongoose = require("mongoose");

// connecting to our database
mongoose.connect("mongodb://0.0.0.0:27017/cre8sare");

// checking for connection
const db = mongoose.connection;

// if there is an error
db.on("error", console.error.bind(console, "connection error:"));

// if connection is successfull
db.once("open", () => {
  console.log("Database successfully connected!!");
});
