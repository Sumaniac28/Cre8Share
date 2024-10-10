const Creator = require("../models/creatorSchema");
const jwt = require("jsonwebtoken");
const Analytics = require("../models/analyticsSchema");
const google = require("googleapis").google;
const sendMail = require("../config/emailService");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
require("dotenv").config();

const otpMailPath = path.join(
  __dirname,
  "../EmailTemplates",
  "stockOTPTemplate.html"
);
let stockOTPTemplate = fs.readFileSync(otpMailPath, "utf8");

module.exports.signIN = async function (req, res, next) {
  try {
    const creator = await Creator.findOne({ email: req.user.email });

    if (!creator || creator.password !== req.user.password) {
      return next(createError(401, "Invalid email or password"));
    }

    const token = jwt.sign(creator.toJSON(), process.env.JWT_SECRET , { expiresIn: "1d" });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
    });

    res.redirect(`http://localhost:3000/Creator`);
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

module.exports.logOut = async function (req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure:  true,
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

module.exports.sendOTP = async function (req, res, next) {
  try {
    const creatorMail = await Creator.findById(req.user.id).select(
      "email , name"
    );
    stockOTPTemplate = stockOTPTemplate.replace(
      "{{username}}",
      creatorMail.name
    );
    stockOTPTemplate = stockOTPTemplate.replace("{{OTP_CODE}}", req.body.otp);
    sendMail(creatorMail.email, "OTP to add stock", stockOTPTemplate);
    res.status(200).json({ message: "Otp mail sent successfully" });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

const calculateTotalChange = (stats) => {
  let totalChange = 0;

  if (stats.length >= 2) {
    for (let i = 1; i < stats.length; i++) {
      const current = stats[i - 1];
      const previous = stats[i];

      const calculateRateChange = (currentValue, previousValue) => {
        const rateChange = (currentValue - previousValue) / previousValue;
        const intensity = Math.abs(rateChange);
        return rateChange * intensity;
      };

      totalChange += calculateRateChange(
        current.subscribers,
        previous.subscribers
      );
      totalChange += calculateRateChange(current.likes, previous.likes);
      totalChange += calculateRateChange(current.dislikes, previous.dislikes);
      totalChange += calculateRateChange(
        current.videoCount,
        previous.videoCount
      );
      totalChange += calculateRateChange(current.valuation, previous.valuation);
    }
  }
  return totalChange;
};

async function refresh(creatorID, next) {
  try {
    const creator = await Creator.findById(creatorID).populate("stocks");

    if (!creator) {
      return next(createError(404, "Creator not found"));
    } else {
      const analyticsData = await Analytics.find({ creator: creatorID });
      const accesstoken = creator.accessToken;
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accesstoken });

      const youtube = google.youtube({ version: "v3", auth: oauth2Client });
      const response = await youtube.channels.list({
        mine: true,
        part: "snippet,contentDetails,statistics",
      });

      const channelData = response.data.items[0];
      const uploadsPlaylistId =
        channelData.contentDetails.relatedPlaylists.uploads;

      const playlistResponse = await youtube.playlistItems.list({
        playlistId: uploadsPlaylistId,
        part: "contentDetails",
        maxResults: 50,
      });

      const videoIds = playlistResponse.data.items.map(
        (item) => item.contentDetails.videoId
      );

      let totalLikes = 0;
      let totalDislikes = 0;

      async function fetchVideoStats(videoIds, pageToken) {
        const videoResponse = await youtube.videos.list({
          id: videoIds.join(","),
          part: "statistics",
          maxResults: 50,
          pageToken: pageToken,
        });

        videoResponse.data.items.forEach((item) => {
          totalLikes += parseInt(item.statistics.likeCount);
          totalDislikes += parseInt(item.statistics.dislikeCount);
        });

        if (videoResponse.data.nextPageToken) {
          await fetchVideoStats(videoIds, videoResponse.data.nextPageToken);
        }
      }

      await fetchVideoStats(videoIds);

      let valuation;
      if (channelData.statistics.videoCount > 0) {
        valuation = parseFloat(
          (channelData.statistics.subscriberCount * 0.1 +
            totalLikes -
            totalDislikes) /
            channelData.statistics.videoCount
        );
      } else {
        valuation = 0;
      }

      const data = {
        subscribers: parseInt(channelData.statistics.subscriberCount),
        likes: totalLikes,
        dislikes: totalDislikes,
        videoCount: parseInt(channelData.statistics.videoCount),
        valuation: valuation,
        date: new Date().toISOString(),
      };

      const stats = [data, ...analyticsData[0].stats];

      if (stats.length > 4) {
        stats.pop();
      }

      const totalChange = calculateTotalChange(stats);

      for (let stock of creator.stocks) {
        const stockChange = totalChange * stock.weight;
        stock.currentValue += stockChange;
        await stock.save();
      }

      await analyticsData[0].updateOne({ stats: stats });
    }
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
}

module.exports.refreshAnalyticsForAllCreators = async function (
  req,
  res,
  next
) {
  try {
    const creators = await Creator.find({});

    for (let creator of creators) {
      await refresh(creator._id, next);
    }

    res.status(200).json({ message: "Analytics refreshed for all creators" });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};
