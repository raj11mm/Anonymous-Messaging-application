const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. In Render: Environment → add MONGO_URI (your MongoDB Atlas connection string)."
    );
  }

  // Log host only (no credentials) — helps confirm env is loaded on Render
  try {
    const host = new URL(mongoUri.replace(/^mongodb(\+srv)?:\/\//, "https://")).host;
    // eslint-disable-next-line no-console
    console.log(`Connecting to MongoDB host: ${host}`);
  } catch {
    // eslint-disable-next-line no-console
    console.log("MONGO_URI set; could not parse host for logging.");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
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
