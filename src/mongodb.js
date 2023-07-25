const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Petopia") //mongo db connection to mongodb
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})




const collection=new mongoose.model("users",LoginSchema)

module.exports=collection