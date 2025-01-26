const mongoose = require("mongoose");
const connect = require("./connect"); // Import your connect function
const Question = require("./schema"); // Import the Question model
const fs = require("fs");

async function uploadData() {
    try {
      // Connect to MongoDB
      connect();
  
      // Read and parse the JSON file
      const data = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
  
      // Convert `_id` and `siblingId` to ObjectId if they exist
      const questions = data.map((q) => ({
        ...q,
        _id: q._id?.$oid ? new mongoose.Types.ObjectId(q._id.$oid) : new mongoose.Types.ObjectId(q._id),
        siblingId: q.siblingId?.$oid ? new mongoose.Types.ObjectId(q.siblingId.$oid) : new mongoose.Types.ObjectId(q.siblingId),
      }));
  
      // Insert data into the collection
      await Question.insertMany(questions);
      console.log("Data uploaded successfully!");
      process.exit(); // Exit the process after uploading
    } catch (err) {
      console.error("Error uploading data:", err.message);
      process.exit(1); // Exit with failure
    }
  }
  

uploadData();
