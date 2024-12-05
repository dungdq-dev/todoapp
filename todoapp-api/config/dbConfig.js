import mongoose from "mongoose";

export async function dbConnect() {
  // connect to mongodb using mongoose
  try {
    await mongoose.connect(process.env.MONGO_CONN_STR);
    console.log("Connected to mongodb");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  } catch (error) {
    console.log("Error connect to database: " + error);
  }
}
