import mongoose from "mongoose";
import env from "dotenv"

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/userManagement" )
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(error => {
        console.log(error);
    });
}