const mongoose=require("mongoose");
function connect(){
    const uri="mongodb+srv://mail4shavi:8ea1Yjj820G4JdSS@cluster0.aapyk.mongodb.net/SearchBar?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnified:true
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(()=>{
        console.log("Error connecting to MongoDB");
    })
}
module.exports=connect;