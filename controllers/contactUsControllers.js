const nodemailer = require("nodemailer");
const ContactUs = require("../models/contactUsModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.contactUs = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const contactUs = await ContactUs.create({ name, email, subject, message });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_USERNAME,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    text: `From: ${name} (${email})\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Contact saved and email sent!",
      data: contactUs,
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      message: "Contact saved, but email failed to send.",
      data: contactUs,
    });
  }
});

exports.allContactsMade = catchAsync(async (req, res, next) => {
  const contacts = await ContactUs.find();

  if (contacts.length === 0) {
    return next(new appError("No contacts found.", 404));
  }
  res.status(200).json({
    message: "All contacts found successfully.",
    status: 200,
    length: contacts.length,
    data: contacts,
  });
});
