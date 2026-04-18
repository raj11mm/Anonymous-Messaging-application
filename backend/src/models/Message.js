const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    read: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
