const mongoose = require("mongoose");

const blockSchema=new mongoose.Schema({
    text:{type:String, required:true},
    showInOption:{type:Boolean, required:true},
    isAswer:{type:Boolean,required:true},
});

const quesSchema=new mongoose.Schema({
    type: { type: String, required: true },
    anagramType: { type: String, required: false },
    blocks: { type: [blockSchema], required: true },
    siblingId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    solution: { type: String, required: true },
    title: { type: String, required: true }, 
});
const Question=mongoose.model("Question",quesSchema);
module.exports=Question;