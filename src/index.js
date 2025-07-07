import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: ".env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("connected to database");
      console.log(`server running http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });