import { Schema, model, models, Types } from "mongoose";

const transactionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  categoryId: { type: Types.ObjectId, ref: "Category", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Transaction || model("Transaction", transactionSchema);
