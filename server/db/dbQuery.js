const pool = require("./connectDb");

module.exports = async () => {
  try {
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS employees (
          id SERIAL PRIMARY KEY,
          empid VARCHAR(10) UNIQUE NOT NULL,
          firstname VARCHAR(50) NOT NULL,
          lastname VARCHAR(50) NOT NULL,
          phone VARCHAR(15) NOT NULL,
          email VARCHAR(100) NOT NULL,
          address VARCHAR(10),
          department VARCHAR(50),
          designation VARCHAR(50)
        );
      `
    );

    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
  }
};
