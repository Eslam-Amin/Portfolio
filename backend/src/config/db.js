const mongoose = require("mongoose");
const dns = require("dns");

// Ensure SRV records resolve reliably when local/ISP DNS refuses SRV queries
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  let uri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eslam_portfolio";

  if (process.env.MONGODB_USER) {
    uri = uri.replace(
      /<MONGODB_USER>/g,
      encodeURIComponent(process.env.MONGODB_USER)
    );
  }
  if (process.env.MONGODB_PASSWORD) {
    uri = uri
      .replace(
        /<MONGODB_PASSWORD>/g,
        encodeURIComponent(process.env.MONGODB_PASSWORD)
      )
      .replace(
        /<MONOGDB_PASWORD>/g,
        encodeURIComponent(process.env.MONGODB_PASSWORD)
      );
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
