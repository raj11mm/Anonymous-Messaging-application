const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. In Render: Environment → add MONGO_URI (your MongoDB Atlas connection string)."
    );
  }

  const hostMatch = mongoUri.match(/@([^/?]+)/);
  if (hostMatch) {
    // eslint-disable-next-line no-console
    console.log(`Connecting to MongoDB host: ${hostMatch[1]}`);
  } else {
    // eslint-disable-next-line no-console
    console.log("MONGO_URI is set (host not logged).");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 20000,
      family: 4,
    });
  } catch (err) {
    throw new Error(
      `MongoDB connection failed: ${err.message}. ` +
        "Fix: add /anonymous_messages before ? in URI; URL-encode special chars in password (@ → %40); Atlas Network Access → 0.0.0.0/0."
    );
  }
  // eslint-disable-next-line no-console
  console.log("MongoDB connected successfully.");
};

module.exports = connectDB;
