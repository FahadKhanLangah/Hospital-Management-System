import app from "./app.js";
import { configDotenv } from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";
configDotenv();
connectCloudinary();
const PORT = process.env.PORT || 4000;
connectDB();
app.listen(PORT, () => {
  console.log("App is running on", PORT)
})
