import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { full_name, email, business_name, message } = req.body;

    // basic validation
    if (!full_name || !email) {
      return res
        .status(400)
        .json({ error: "Full name and email are required" });
    }

    res.status(201).json({
      message: "Lead received successfully",
      data: { full_name, email, business_name, message },
    });
  } catch (error) {
    res.status(500).json({ error: "Servererror" });
  }
});

export default router;
