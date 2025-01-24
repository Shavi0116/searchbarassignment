const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    text: { type: String, required: true },
    showInOption: { type: Boolean, default: false }, 
    isAnswer: { type: Boolean, default: false }, 
});

const quesSchema = new mongoose.Schema({
    type: { type: String, required: true },
    anagramType: { type: String, default: null }, 
    blocks: { type: [blockSchema], required: true },
    siblingId: { type: mongoose.Schema.Types.ObjectId, default: null }, 
    solution: { type: String, required: true },
    title: { type: String, required: true },
});

const Question = mongoose.model("Question", quesSchema);
module.exports = Question;
