import { appConfig } from "@pal/utils/appconfig";
import mongoose from "mongoose";

const MONGODB_URI = appConfig.mongodbUri;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  console.log("connected to db");

  return mongoose.connect(MONGODB_URI, {
    dbName: "paisa_pal",
  });
}
