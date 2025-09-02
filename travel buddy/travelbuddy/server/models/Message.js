import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: String, // 'global' or 'uid_uid' for private
  sender: String, // uid
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
