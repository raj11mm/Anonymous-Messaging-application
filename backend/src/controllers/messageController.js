const validator = require("validator");
const Message = require("../models/Message");
const User = require("../models/User");
const filterMessage = require("../utils/filterMessage");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipientId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch messages." });
  }
};

const sendAnonymousMessage = async (req, res) => {
  try {
    const { username } = req.params;
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Message content is required." });
    }

    const normalizedContent = validator.escape(content.trim());
    if (!normalizedContent) {
      return res.status(400).json({ message: "Message cannot be empty." });
    }

    if (normalizedContent.length > 500) {
      return res.status(400).json({ message: "Message exceeds 500 characters." });
    }

    const recipient = await User.findOne({ username: username.toLowerCase() });
    if (!recipient) {
      return res.status(404).json({ message: "User not found." });
    }

    const message = await Message.create({
      recipientId: recipient._id,
      content: filterMessage(normalizedContent),
    });

    return res.status(201).json({
      message: "Anonymous message sent successfully.",
      id: message._id,
      createdAt: message.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send message." });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      recipientId: req.user._id,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    await message.deleteOne();
    return res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete message." });
  }
};

const toggleReadStatus = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      recipientId: req.user._id,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    message.read = !message.read;
    await message.save();

    return res.status(200).json({
      message: "Message status updated.",
      read: message.read,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update message status." });
  }
};

const reactToMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      recipientId: req.user._id,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    message.likes += 1;
    await message.save();

    return res.status(200).json({
      message: "Reaction added.",
      likes: message.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to react to message." });
  }
};

module.exports = {
  getMessages,
  sendAnonymousMessage,
  deleteMessage,
  toggleReadStatus,
  reactToMessage,
};
