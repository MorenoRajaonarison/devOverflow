import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.DB_URL) return console.log("Missing database url!");
  if (isConnected) return console.log("Db already connected!!!");

  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "devoverflow",
    });
    isConnected = true;
    console.log("Db Connected");
  } catch (error) {}
};
