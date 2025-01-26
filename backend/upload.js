const mongoose = require("mongoose");
const connect = require("./connect"); 
const Question = require("./schema"); 
const fs = require("fs");

async function uploadData() {
    try {
      connect();
  
      const data = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
  
      const questions = data.map((q) => ({
        ...q,
        _id: q._id?.$oid ? new mongoose.Types.ObjectId(q._id.$oid) : new mongoose.Types.ObjectId(q._id),
        siblingId: q.siblingId?.$oid ? new mongoose.Types.ObjectId(q.siblingId.$oid) : new mongoose.Types.ObjectId(q.siblingId),
      }));
      await Question.insertMany(questions);
      console.log("Data uploaded successfully!");
      process.exit(); 
    } catch (err) {
      console.error("Error uploading data:", err.message);
      process.exit(1); 
    }
  }
  

uploadData();
