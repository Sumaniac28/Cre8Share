const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  return token;
};

module.exports = cookieExtractor;
