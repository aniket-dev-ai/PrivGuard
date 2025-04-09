import mongoose from "mongoose";

const VaultItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // From your User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String, // encrypted
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("VaultItem", VaultItemSchema);
