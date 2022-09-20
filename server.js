const express = require("express");
const cors = require("cors");
const connectDB = require("./helpers/connectDB");
const { validationResult } = require("express-validator");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const http = require("http").Server(app);

// Connect to DB
connectDB();

app.use(cors());
if (process.env.NODE_ENV == "DEV") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Load Routes
const userRouter = require("./routes/user.route");
const rightRouter = require("./routes/right.route");
const roleRouter = require("./routes/role.route");

app.use("/user", userRouter);
app.use("/right", rightRouter);
app.use("/role", roleRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
