import { Schema, model, models, Types } from "mongoose";

const categorySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
  },
  { timestamps: true }
);

export default models.Category || model("Category", categorySchema);
