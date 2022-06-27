import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    default: "abc123",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

export { User };
