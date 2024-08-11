const Creator = require("../../../models/creatorSchema");

exports.getCreatorData = async (req, res,next) => {
  try {
    const creator = await Creator.findById(req.user.id).select(
      "-_id -password"
    );
    if (!creator) {
      const erroMsg = new Error("No creator data found for the user");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }
    return res.status(200).json(creator);
  } catch (error) {
    const erroMsg = new Error(error.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
