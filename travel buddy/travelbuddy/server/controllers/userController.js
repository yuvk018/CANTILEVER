import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const uid = req.user.uid;
    const payload = req.body;
    const user = await User.findOneAndUpdate({ uid }, payload, {
      new: true,
      upsert: true,
    });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
