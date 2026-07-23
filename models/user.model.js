const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      default: "",
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
