import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.NEXT_DB_HOST,
  port: parseInt(process.env.NEXT_DB_PORT as string),
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASSWORD,
  database: process.env.NEXT_DB_DATABASE,
});

const selectBySQL = async <T>(sql: string): Promise<{ data: T[]; error: string | null }> => {
  try {
    const [rows] = await pool.query(sql);

    return { data: rows as T[], error: null };
  } catch (error) {
    const err = error as Error;

    return { data: [], error: err.message };
  }
};

export default selectBySQL;
