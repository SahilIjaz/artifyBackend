const categoryControllers = require("../controllers/categoryControllers");
const express = require("express");
const router = express.Router();

router.route("/create-category").post(categoryControllers.createCategory);

router.route("/get-one-category/:id").get(categoryControllers.getOneCategory);

router.route("/get-all-categories").get(categoryControllers.getAllCategories);

module.exports = router;
