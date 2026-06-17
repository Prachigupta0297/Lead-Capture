import express from "express";
import { createLead, getAllLeads } from "../models/lead.models.js";

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

// GET /leads
//  Fetch all leads (Admin Panel)

router.get("/", async (req, res) => {
  try {
    const leads = await getAllLeads();

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
});

export default router;
