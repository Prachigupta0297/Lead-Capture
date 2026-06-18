import express from "express";
import {
  createLead,
  getAllLeads,
  updateLeadAI,
} from "../models/lead.models.js";
import { analyzeLeadAI } from "../services/aiService.js";

const router = express.Router();

// CREATE LEAD + AI
router.post("/", async (req, res) => {
  try {
    const { full_name, email, business_name, message } = req.body;

    const savedLead = await createLead({
      full_name,
      email,
      business_name,
      message,
    });

    const aiResult = await analyzeLeadAI(savedLead);

    const updatedLead = await updateLeadAI(savedLead.id, aiResult);

    res.status(201).json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error("POST /leads error:", error);
    res.status(500).json({ success: false, message: "Lead creation failed" });
  }
});

// GET ALL LEADS
router.get("/", async (req, res) => {
  try {
    const leads = await getAllLeads();
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

export default router; // ✅ VERY IMPORTANT
