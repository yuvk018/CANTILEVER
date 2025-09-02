import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const room = req.params.room;
    const msgs = await Message.find({ room }).sort({ createdAt: 1 });
    return res.json(msgs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const postMessage = async (req, res) => {
  try {
    const room = req.params.room;
    const msg = await Message.create({
      room,
      sender: req.user.uid,
      text: req.body.text,
    });
    return res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
