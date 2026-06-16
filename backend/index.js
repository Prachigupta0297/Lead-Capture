import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leadRoutes from "./routes/leads.js";
import pool from "./config/database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// test DB connection
pool
  .connect()
  .then(() => console.log("PostgreSQL Connected ✅"))
  .catch((err) => console.log("DB Error", err));

// routes
app.use("/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

console.log("INDEX FILE RUNNING");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
