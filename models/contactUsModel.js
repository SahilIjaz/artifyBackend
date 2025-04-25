const mongoose = require("mongoose");
const validator = require("validator");
const contactUsModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required in user schema."],
      validate: [validator.isEmail, "Provide correct email."],
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const ContactUs = mongoose.model("ContactUs", contactUsModel);
module.exports = ContactUs;
