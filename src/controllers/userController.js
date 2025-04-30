const ErrorHandler = require("../utils/ErrorHandler");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../model/userModel");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("reaching")
  if (!email || !password) {
    return next(new ErrorHandler("Please Fill all Details", 400));
  }
  // find existing user
  try {
    let existingUser;
    existingUser = await User.findOne({ email }).lean().exec();
    if (existingUser) {
      return next(new ErrorHandler("Already Exist", 409));
    }
    const user = await User.create({ name, email, password });
    // console.log(user);
    const userTosend = await User.findById({ _id: user._id }).select(
      "-password"
    );
    // console.log(userTosend);
    return res
      .status(201)
      .json(new ApiResponse("User Registered Successfully", userTosend, 201));
  } catch (err) {
    console.log(err)
    return next(new ErrorHandler("Not Registered Successfully", 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill all Details", 400));
  }
  try {
    let existingUser;
    existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (!existingUser) {
      return next(new ErrorHandler("Please regsiter first", 404));
    }
    const validatePassword = await existingUser.validatePassword(password);
    // console.log(validatePassword, "i am");
    if (!validatePassword) {
      return next(new ErrorHandler("Email or Password is Incorrect", 401));
    } else {
      const token = await existingUser.genrateToken();
    //   console.log(token, "i am tokennn");
      existingUser.accessToken = token;
      await existingUser.save({ validateBeforeSave: false });
    //   console.log(existingUser);
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      const dataToSend = await User.findById({ _id: existingUser?._id }).select(
        "-password"
      );
      console.log(dataToSend);
      return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse("LoggedIn", dataToSend, 200));
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Not Registered Successfully", 500));
  }
};
const logout = async (req, res, next) => {
  // user already authenticated
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("user not authorized", 404));
    }
    user.accessToken = "";
    await user.save();
    console.log(user, 79);
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json(new ApiResponse("LoggedOut", {}, 200));
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

module.exports = { register, login, logout };
