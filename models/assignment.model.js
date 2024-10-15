import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
    task : { type: String , require : true },
    admin : { type: mongoose.Schema.Types.ObjectId, ref : "Admin"},
    status : { type : String , enum : ["pending" , "accepted", "rejected" ], default : "pending" }
})

const assignmentModel = mongoose.model("Assignment",assignmentSchema);

export default assignmentModel;