import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  buddyUrl: { type: String },
  buddyName: { type: String },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  status: {
    type: String,
    enum: ["remote", "office"],
    default: "office",
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
