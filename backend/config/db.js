const mongoose = require("mongoose");
const ConnectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch( err){
        console.log("MongoDB error",err);
    }
};
module.exports = ConnectDB;