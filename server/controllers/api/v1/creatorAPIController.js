const Creator = require("../../../models/creatorSchema");

exports.getCreatorData = async (req, res, next) => {
  try {
    const creator = await Creator.findById(req.user.id).select(
      "-_id -password"
    );
    if (!creator) {
      return next(createError(404, "Creator data not found"));
    }
    return res.status(200).json(creator);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
