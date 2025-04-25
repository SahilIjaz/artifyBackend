const contactUsControllers = require("../controllers/contactUsControllers");
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authContrllers");

router
  .route("/make-contact")
  .post(authControllers.protect, contactUsControllers.contactUs);

router
  .route("/get-all-contacts")
  .get(authControllers.protect, contactUsControllers.allContactsMade);

module.exports = router;
