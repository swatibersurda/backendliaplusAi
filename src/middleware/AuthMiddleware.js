const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const dotenv = require("dotenv");
const User = require("../model/userModel");
dotenv.config({ path: "./.env" });
const authMiddleware = async (req, res, next) => {
  // token
  // token not return
  // jwt verify token
  // req.user add next return
  try {
    const bearerToken = req.header("Authorization");
    const token =
      req?.cookies?.accessToken ||
      (bearerToken && bearerToken.startsWith("Bearer ")
        ? bearerToken.split(" ")[1]
        : null);
    if (!token) {
      return next(new ErrorHandler("Unauthenticate request", 401));
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodeToken?._id).select("-password");

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error"));
  }
};
module.exports = authMiddleware;
