const express = require("express");
const cors = require("cors");
const roleRouter = require("./Routes/role");
const userRouter = require("./Routes/user");
const categoryRouter = require("./Routes/category");
const employeeRouter = require("./Routes/employee");
const serviceRouter = require("./Routes/service");
require("dotenv").config();
require("./models/db");
const nodemailer = require('nodemailer');
const mailRouter = require("./Routes/mail");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

// Import Routers
app.use("/roles",roleRouter)
app.use("/users",userRouter)
app.use("/section",categoryRouter)
app.use("/employee",employeeRouter)
app.use("/service",serviceRouter)
app.use("/sendmail",mailRouter)
// Routes Middleware


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
