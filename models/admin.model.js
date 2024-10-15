import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignments: [{ type : mongoose.Schema.Types.ObjectId , ref :"Assignment"}]
});

const adminModel = mongoose.model("Admin",adminSchema);

export default adminModel;
