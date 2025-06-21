import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "FlowFix",
    });

    isConnected = true;
    console.log("✅ MongoDB-тэй амжилттай холбогдлоо.");
  } catch (error) {
    console.error("❌ MongoDB-тэй холбогдоход алдаа гарлаа:", error);
    throw error;
  }
};

export default dbConnect;
