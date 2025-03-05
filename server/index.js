import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/userRoutes.js";
import dotenv from "dotenv"

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
app.use("/",router)


mongoose.connect("mongodb://127.0.0.1:27017/crudDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
