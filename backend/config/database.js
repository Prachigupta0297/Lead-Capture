import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lead_capture",
  password: "admin",
  port: 5432,
});

export default pool;
