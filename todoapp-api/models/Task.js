import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
  day: String,
  reminder: Boolean
});

export default mongoose.model('Task', taskSchema);