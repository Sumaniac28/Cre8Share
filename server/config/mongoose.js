// Setting up our database
require('dotenv').config();
// requiring mongoose
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_DB_URI;

// connecting to our database
mongoose.connect(mongoUri);

// checking for connection
const db = mongoose.connection;

// if there is an error
db.on("error", console.error.bind(console, "connection error:"));

// if connection is successfull
db.once("open", () => {
  console.log("Database successfully connected!!");
});
