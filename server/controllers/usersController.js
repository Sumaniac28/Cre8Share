const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
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
    const erroMsg = new Error("Unauthorized");
    erroMsg.statusCode = 401;
    return next(erroMsg);
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
      const erroMsg = new Error("User already exists");
      erroMsg.statusCode = 409;
      return next(erroMsg);
    }
  } catch (err) {
    const erroMsg = new Error("Internal Server Error");
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};

module.exports.signIN = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      const erroMsg = new Error("Invalid username or password");
      erroMsg.statusCode = 422;
      return next(erroMsg);
    }

    const token = jwt.sign(user.toJSON(), "cre8share", { expiresIn: "1d" });

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
    console.log(err);
    const erroMsg = new Error("Internal server error");
    erroMsg.statusCode = 500;
    next(erroMsg);
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
          return next(new Error("Failed to destroy session"));
        }
      });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    const erroMsg = new Error("Internal server error");
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
