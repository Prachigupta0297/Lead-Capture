import express from "express";
import { createLead } from "../models/lead.models.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("ROUTE HIT HO GAYA");

  try {
    const { full_name, email, business_name, message } = req.body;

    const savedLead = await createLead({
      full_name,
      email,
      business_name,
      message,
    });

    res.status(201).json({
      message: "Lead saved successfully",
      data: savedLead,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
