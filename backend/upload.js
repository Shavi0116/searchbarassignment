const connect=require("./connect.js");
const Question=require("./schema.js");
const fs=require("fs");
const path=require("path");

connect();

async function upload() {
    try{
        const file=path.join(__dirname,"questions.json");
        const questions=JSON.parse(fs.readFileSync(file,"utf8"));
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log("Questions uploaded");

    }catch(err){
        console.log("Error in uploading",err);
    }
}
upload();