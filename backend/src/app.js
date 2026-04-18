const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const validator = require("validator");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const allowedOrigins = (
  process.env.CLIENT_URLS ||
  process.env.CLIENT_URL ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin) ||
  /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin) ||
  /^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin) ||
  /^https?:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin);

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server requests or tools that send no Origin header.
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || isAllowedDevOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: false,
};

const sanitizeInput = (value) => {
  if (Array.isArray(value)) return value.map(sanitizeInput);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeInput(nestedValue)])
    );
  }
  if (typeof value === "string") return validator.escape(value);
  return value;
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(globalLimiter);
app.use(express.json({ limit: "20kb" }));
app.use((req, _res, next) => {
  // express-mongo-sanitize middleware is incompatible with Express 5 query getter.
  if (req.body && typeof req.body === "object") {
    req.body = mongoSanitize.sanitize(req.body);
  }
  if (req.params && typeof req.params === "object") {
    req.params = mongoSanitize.sanitize(req.params);
  }
  next();
});
app.use((req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeInput(req.body);
  }
  if (req.params && typeof req.params === "object") {
    req.params = sanitizeInput(req.params);
  }
  next();
});

app.get("/", (_req, res) => {
  res.status(200).json({
    name: "WhisperBox API",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

module.exports = app;
