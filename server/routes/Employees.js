const express = require("express");
const pool = require("../db/connectDb");

const router = express.Router();

router.post("/employees", async (req, res) => {
  try {
    const {
      empid,
      firstname,
      lastname,
      phone,
      email,
      address,
      department,
      designation,
    } = req.body;
    const query = `INSERT INTO employees (empid, firstname, lastname, phone, email, address, department, designation) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
    await pool.query(query, [
      empid,
      firstname,
      lastname,
      phone,
      email,
      address,
      department,
      designation,
    ]);
    res.json({
      success: true,
      data: `Successfully Inserted`,
    });
  } catch (err) {
    res.json({
      success: false,
      data: `Error in Inserting data : ${err}`,
    });
  }
});

router.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      phone,
      email,
      address,
      department,
      designation,
    } = req.body;
    const query = `UPDATE employees SET firstname=$1, lastname=$2,phone=$3,email=$4,address=$5,department=$6,designation=$7 WHERE empid=$8`;

    await pool.query(query, [
      firstname,
      lastname,
      phone,
      email,
      address,
      department,
      designation,
      id,
    ]);
    res.json({
      success: true,
      data: `Updated Successfully`,
    });
  } catch (err) {
    res.json({
      success: false,
      data: `Error in Updating data : ${err}`,
    });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM employees WHERE empid=$1`;
    await pool.query(query, [id]);
    res.json({
      success: true,
      data: `Data Removed Successfully`,
    });
  } catch (err) {
    res.json({
      success: false,
      data: `Error in Removing data : ${err}`,
    });
  }
});
router.get("/employees/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.json({
      success: false,
      data: `Error in Loading data : ${err}`,
    });
  }
});

module.exports = router;
