import pool from "../config/database.js";

export const createLead = async (data) => {
  const { full_name, email, business_name, message } = data;

  const result = await pool.query(
    `INSERT INTO leads (full_name, email, business_name, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, email, business_name, message],
  );

  return result.rows[0];
};

// GET all leads for admin panel
export const getAllLeads = async () => {
  const result = await pool.query(
    `SELECT 
      id,
      full_name,
      email,
      business_name,
      message,
      ai_score,
      ai_reason,
      ai_email_draft,
      created_at
     FROM leads
     ORDER BY created_at DESC`,
  );

  return result.rows;
};

export const updateLeadAI = async (id, ai) => {
  const result = await pool.query(
    `UPDATE leads
     SET ai_score = $1,
         ai_reason = $2,
         ai_email_draft = $3
     WHERE id = $4
     RETURNING *`,
    [ai.score, ai.reason, ai.email, id],
  );

  return result.rows[0];
};
