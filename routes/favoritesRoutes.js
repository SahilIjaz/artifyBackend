const favoritesControllers = require("../controllers/favriteControllers");
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authContrllers");

router
  .route("/add-remove-favorite/:id")
  .get(authControllers.protect, favoritesControllers.makeOrRemoveFavorite);

router
  .route("/my-favorites")
  .get(authControllers.protect, favoritesControllers.myFavoriteLists);

module.exports = router;
