const Creator = require("../models/creatorSchema");
const jwt = require("jsonwebtoken");
const Analytics = require("../models/analyticsSchema");
const google = require("googleapis").google;

module.exports.signIN = async function (req, res) {
  try {
    const creator = await Creator.findOne({ email: req.user.email });

    if (!creator || creator.password != req.user.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(creator.toJSON(), "cre8share", { expiresIn: "1d" });
    res.redirect(`http://localhost:3000/MyCreator?token=${token}`);
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

module.exports.refresh = async function (req, res) {
  try {
    const creator = await Creator.findById(req.user._id);

    if (!creator) {
      return res.json(422, {
        message: "Invalid user",
      });
    } else {
      const analyticsData = await Analytics.find({ creator: req.user._id });
      const accesstoken = creator.accessToken;
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accesstoken });
      // Create a new instance of YouTube Data API
      const youtube = google.youtube({ version: "v3", auth: oauth2Client });
      const response = await youtube.channels.list({
        mine: true,
        part: "snippet,contentDetails,statistics",
      });

      const channelData = response.data.items[0];
      const uploadsPlaylistId =
        channelData.contentDetails.relatedPlaylists.uploads;

      // Fetch all videos in the uploads playlist
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

      // Helper function to fetch video statistics recursively
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
      const stats = [data, ...analyticsData[0].stats];

      await analyticsData[0].updateOne({ stats: stats });

      return res.json(200, analyticsData[0]);
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
