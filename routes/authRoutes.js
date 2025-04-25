const authControllers = require("../controllers/authContrllers");
const express = require("express");
const router = express.Router();

router.route("/refresh-token/:token").post(authControllers.getRefreshToken);

router.route("/sign-Up").post(authControllers.signUp);

router.route("/resend-otp").post(authControllers.resendOTP);

router.route("/otp-verification").post(authControllers.otpVerification);

router
  .route("/otp-verification-password")
  .post(authControllers.otpVerificationPAssword);

router.route("/log-in").post(authControllers.logIn);

router.route("/forgot-password").post(authControllers.forgotPassword);

router.route("/reset-password").patch(authControllers.resetPassword);

router.route("/log-out").post(authControllers.protect, authControllers.logOut);

router
  .route("/delete-user")
  .post(authControllers.protect, authControllers.deleteUser);

router
  .route("/delete-me")
  .post(authControllers.protect, authControllers.deleteMe);

router.route("/change-password").patch(authControllers.changePassword);

module.exports = router;
