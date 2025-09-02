import User from "../models/User.js";

export const getMatches = async (req, res) => {
  try {
    const me = await User.findOne({ uid: req.user.uid });
    if (!me) return res.status(404).json({ message: "User profile not found" });
    const myDests = me.futureDestinations || [];
    const matches = await User.find({
      uid: { $ne: me.uid },
      futureDestinations: { $in: myDests },
    });
    return res.json(matches);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

