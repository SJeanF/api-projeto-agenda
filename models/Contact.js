import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group", default: [] }],
  favorite: { type: Boolean, default: false },
});

export default mongoose.model("Contact", ContactSchema);
