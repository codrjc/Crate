import mongoose from "mongoose";
import { db } from "../config/db.config";

const uri = db.uri || "";

export const connectToDatabase = async () => {
  try {
    if (db.uri) await mongoose.connect(db.uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to MongoDB:", error);
  }
};
