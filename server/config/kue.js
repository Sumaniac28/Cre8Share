const kue = require("kue");

const queue = kue.createQueue({
  redis: {
    port: 6379,
    host: "localhost",
  },
});

module.exports = queue;
