const redis = require("redis");

// creating redis client
const redisClient = redis.createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error " + err);
});

module.exports = redisClient;
