import mongoose from "mongoose";

const dbConnection = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI); 
     console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};


export default dbConnection;