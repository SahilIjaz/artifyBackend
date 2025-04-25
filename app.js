const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());
app.options("*", cors());

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/caegoryRoutes.js");

app.use("/api/v1/auth", authRoutes);
app.use("/pi/v1/category", categoryRoutes);

const globalErrors = require("./controllers/errControllers");

console.log("before going to upload the image");

app.use(globalErrors);

module.exports = app;
console.log("IN THE APP FILE");
