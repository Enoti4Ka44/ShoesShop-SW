import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "crm_db",
  user: "postgres",
  password: "root",
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}
