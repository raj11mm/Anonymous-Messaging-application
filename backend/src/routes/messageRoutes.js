const express = require("express");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middleware/authMiddleware");
const {
  deleteMessage,
  getMessages,
  reactToMessage,
  sendAnonymousMessage,
  toggleReadStatus,
} = require("../controllers/messageController");

const router = express.Router();

const anonymousMessageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many messages sent. Please try again later.",
});

router.get("/", authMiddleware, getMessages);
router.post("/:username", anonymousMessageLimiter, sendAnonymousMessage);
router.delete("/:id", authMiddleware, deleteMessage);
router.patch("/:id/read", authMiddleware, toggleReadStatus);
router.patch("/:id/react", authMiddleware, reactToMessage);

module.exports = router;
