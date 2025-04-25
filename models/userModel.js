const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required in user schema."],
      validate: [validator.isEmail, "Provide correct email."],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      //   required: [true, "Confirm Password is required"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match!",
      },
    },
    role: {
      type: String,
      enum: ["admin", "artist"],
      default: "artist",
    },
    otp: {
      type: Number,
    },
    otpExpiration: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    licenseVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    passwordResetPermission: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isNotification: {
      type: Boolean,
      default: true,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre(/^find/, function (next) {
  this.find({
    $and: [{ isDeleted: false }],
  });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
