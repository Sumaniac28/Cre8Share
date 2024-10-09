const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const UserPortfolio = require("../models/userPortfolioSchema");
const sendMail = require("../config/emailService");
const fs = require("fs");
const path = require("path");

const welcomeMailPath = path.join(
  __dirname,
  "../EmailTemplates",
  "welcomeTemplate.html"
);
let welcomeMailTemplate = fs.readFileSync(welcomeMailPath, "utf8");

module.exports.signUP = async (req, res, next) => {
  if (req.body.password !== req.body.confirm_password) {
    return next(createError(401, "Password and confirm password do not match"));
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await User.create(req.body);
      await UserPortfolio.create({ user: newUser._id });
      welcomeMailTemplate = welcomeMailTemplate.replace(
        "{{username}}",
        req.body.name
      );
      sendMail(req.body.email, "Welcome to Cre8Share", welcomeMailTemplate);
      return res.status(200).json({ message: "User created successfully" });
    } else {
      return next(createError(409, "User already exists"));
    }
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

module.exports.signIN = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return next(createError(422, "Invalid username or password"));
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      crossSite: true,
    });

    return res
      .status(200)
      .json({ message: "Token generated successfully", token });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      path: "/",
    });

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return next(createError(500, "Failed to destroy session"));
        }
      });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};
