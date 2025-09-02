import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  createdBy: String, // firebase uid
  participants: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);
