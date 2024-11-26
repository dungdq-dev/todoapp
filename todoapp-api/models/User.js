import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: "Your firstname is required",
      max: 255,
    },
    last_name: {
      type: String,
      required: "Your lastname is required",
      max: 255,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      select: false,
      max: 25,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '60m',
  });
};

export default mongoose.model("users", userSchema);
