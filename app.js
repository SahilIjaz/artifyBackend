const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());
app.options("*", cors());

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const favoriteRoutes = require("./routes/favoritesRoutes");
const categoryRoutes = require("./routes/caegoryRoutes.js");
const contactUsRoutes = require("./routes/contactUsRoutes.js");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/pi/v1/category", categoryRoutes);
app.use("/api/v1/favorite", favoriteRoutes);
app.use("/api/v1/contactUs", contactUsRoutes);

const globalErrors = require("./controllers/errControllers");

console.log("before going to upload the image");

app.use(globalErrors);

module.exports = app;
console.log("IN THE APP FILE");
