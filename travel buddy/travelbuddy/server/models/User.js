import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // firebase uid
  name: String,
  email: String,
  bio: String,
  futureDestinations: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
