import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    // throw new Error("MONGO_URI is not defined");
    return console.log("MONGO_URI is not defined");
  }

  if (isConnected) {
    return console.log("Using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "To-Do",
    });

    isConnected = true;
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};
