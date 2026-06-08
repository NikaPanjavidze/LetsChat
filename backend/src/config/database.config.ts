import mongoose from "mongoose";
import { Env } from "./env.config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Conn error:", error);
    process.exit(1);
  }
};

export default connectDatabase;
