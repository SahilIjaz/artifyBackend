const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const ContactUs = require("../models/contactUsModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
exports.contactUs = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const contactUs = await ContactUs.create({
    name,
    email,
    subject,
    message,
  });

  if (!contactUs) {
    return next(new appError("Requested contact was not created.", 400));
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `Contact Form: ${subject}`,
    text: `From: ${name} (${email})\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }

  res.status(200).json({
    message: "Contact us has been created successfully.",
    status: 200,
    data: contactUs,
  });
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
