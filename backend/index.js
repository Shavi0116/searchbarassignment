require("dotenv").config();
const { connectDB } = require("./connect");
const startServer = require("./server");

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    startServer();
  } catch (error) {
    console.error("Error starting the app:", error);
  }
};

startApp();
