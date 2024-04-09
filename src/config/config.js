// config.js

module.exports = {
  // MongoDB connection string
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://aokoh:youarenice@cluster0.ocxlxsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

  // JWT secret for authentication
  jwtSecret: process.env.JWT_SECRET || "password",

  // Port for the server to listen on
  port: process.env.PORT || 3000,
};
