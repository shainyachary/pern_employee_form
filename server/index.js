const express = require("express");
const cors = require("cors");
const connectDb = require("./db/dbQuery");
const employeeRoute = require("./routes/Employees");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/", employeeRoute);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
