import { Schema, model, models, Types } from "mongoose";

const budgetSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ["weekly", "monthly"], required: true },
    startDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default models.Budget || model("Budget", budgetSchema);
