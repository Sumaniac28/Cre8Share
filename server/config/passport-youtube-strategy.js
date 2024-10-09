const passport = require("passport");
const googleAuthStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const google = require("googleapis").google;
const Creator = require("../models/creatorSchema");
const Analytics = require("../models/analyticsSchema");
const sendMail = require("../config/emailService");
const fs = require("fs");
const path = require("path");

const welcomeMailPath = path.join(
  __dirname,
  "../EmailTemplates",
  "welcomeTemplate.html"
);

let welcomeMailTemplate = fs.readFileSync(welcomeMailPath, "utf8");

passport.use(
  new googleAuthStrategy({}, async function (
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    try {
      const creator = await Creator.findOne({
        email: profile.emails[0].value,
      });

      if (creator) {
        Creator.findByIdAndUpdate(creator._id, {
          accessToken: accessToken,
        });
        return done(null, creator);
      } else {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });

        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        const response = await youtube.channels.list({
          mine: true,
          part: "snippet,contentDetails,statistics",
        });
        if (!response.data.items) {
          return done(null, false);
        }
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

        const creator = new Creator({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
          channelName: channelData.snippet.title,
          channelImage: channelData.snippet.thumbnails.default.url,
          channelID: channelData.id,
          accessToken: accessToken,
        });

        await creator.save();

        let valuation;
        if (channelData.statistics.videoCount > 0) {
          valuation = parseFloat(
            (channelData.statistics.subscriberCount * 0.1 + likes - dislikes) /
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
        };

        const analytics = new Analytics({
          channelID: channelData.id,
          stats: [data],
          creator: creator._id,
        });

        await analytics.save();

        welcomeMailTemplate = welcomeMailTemplate.replace(
          "{{username}}",
          profile.displayName
        );
        sendMail(
          profile.emails[0].value,
          "Welcome to Cre8Share",
          welcomeMailTemplate
        );

        return done(null, creator);
      }
    } catch (err) {
      console.log("Error in google strategy passport ", err);
      return done(err);
    }
  })
);

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
