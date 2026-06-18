import fetch from "node-fetch";

export const analyzeLeadAI = async (lead) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // ✅ FREE & STABLE MODEL
          messages: [
            {
              role: "system",
              content: "You are a strict sales lead qualification assistant.",
            },
            {
              role: "user",
              content: `
You are a STRICT sales qualification AI.

Classify the lead ONLY using these rules:

🔥 HOT:
- Must clearly mention urgency or timeline
- Keywords: urgent, asap, immediately, today, deadline, next week
- Strong buying intent

🌤️ WARM:
- Interested but NO urgency
- Asking for pricing, demo, discussion, future planning

❄️ COLD:
- Only information request
- Browsing, casual enquiry
- No buying intent

IMPORTANT RULES:
- Interest alone ≠ Hot
- If urgency is NOT mentioned → NEVER mark Hot
- If no buying intent → MUST be Cold
- Choose ONLY ONE: Hot, Warm, or Cold

Return ONLY valid JSON in this exact format:
{
  "score": "Hot | Warm | Cold",
  "reason": "one short reason",
  "email": "short professional reply email"
}

Lead Details:
Name: ${lead.full_name}
Business: ${lead.business_name}
Message: ${lead.message}
`,
            },
          ],
          temperature: 0.2,
        }),
      },
    );

    const data = await response.json();

    // 🛡️ Safe parsing
    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      throw new Error("Invalid AI response");
    }

    const aiResult = JSON.parse(aiText);

    return aiResult;
  } catch (error) {
    console.error("AI ERROR:", error.message);

    // 🔁 fallback so app never crashes
    return {
      score: "Warm",
      reason: "AI fallback due to service issue",
      email:
        "Thank you for contacting us. Our team will get back to you shortly.",
    };
  }
};
