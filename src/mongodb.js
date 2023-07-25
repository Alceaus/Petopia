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

const PetSchema=new mongoose.Schema({
    petname:{
        type:String,
        required:true
    },
    furtype:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    likes:{
        type:String,
        required:true
    },
    dislikes:{
        type:String,
        required:true
    }
})


const collection =new mongoose.model("users",LoginSchema)
const collection1 =new mongoose.model("pets",PetSchema)

module.exports=collection,collection1