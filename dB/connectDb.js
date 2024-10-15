import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MongoDb connected successfully ");
        
    } catch (error) {
        console.log("MongoDb connection faild : ",error.message);
    }
}

export default connectDb;