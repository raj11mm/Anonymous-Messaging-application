const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. In Render: Environment → add MONGO_URI (your MongoDB Atlas connection string)."
    );
  }

  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    throw new Error(
      `MongoDB connection failed: ${err.message}. Check MONGO_URI, Atlas Network Access (0.0.0.0/0), and DB user password.`
    );
  }
  // eslint-disable-next-line no-console
  console.log("MongoDB connected successfully.");
};

module.exports = connectDB;
