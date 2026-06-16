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
