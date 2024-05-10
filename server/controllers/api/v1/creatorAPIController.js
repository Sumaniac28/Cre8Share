const Creator = require("../../../models/creatorSchema");

exports.getCreatorData = async (req, res) => {
  try {
    const creator = await Creator.findById(req.user.id).select("-_id -password");
    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }
    return res.status(200).json(creator);
  } catch (error) {
    console.error("Error retrieving creator data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
