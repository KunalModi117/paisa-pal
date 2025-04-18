import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    image: String,
    provider: { type: String, required: true }, // e.g., "github" or "google"
    providerId: { type: String, required: true, unique: true }, // OAuth ID from any provider
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
