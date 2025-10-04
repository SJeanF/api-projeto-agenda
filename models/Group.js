import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
});

export default mongoose.model("Group", GroupSchema);
