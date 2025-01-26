const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: String,
  anagramType: String,
  blocks: [
    {
      text: String,
      showInOption: Boolean,
      isAnswer: Boolean,
    },
  ],
  siblingId: mongoose.Schema.Types.ObjectId,
  solution: String,
  title: String,
  options: [
    {
      text: String,
      isCorrectAnswer: Boolean,
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
