const express = require("express");
const cors = require("cors");
const roleRouter = require("./Routes/role");
const userRouter = require("./Routes/user");
const categoryRouter = require("./Routes/category");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
app.use("/roles",roleRouter)
app.use("/users",userRouter)
app.use("/section",categoryRouter)
// Routes Middleware


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
