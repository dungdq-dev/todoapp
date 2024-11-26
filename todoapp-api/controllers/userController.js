import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// @desc   Get all users
// @route  GET /api/users
export const getUsers = async (req, res, next) => {
  const pageSize = parseInt(req.query.pageSize);

  const users = await User.find();

  if (!isNaN(pageSize) && pageSize > 0) {
    return res.status(200).json(users.slice(0, pageSize));
  }

  res.status(200).json(users);
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET_KEY, { expiresIn: '1800s' });
}
