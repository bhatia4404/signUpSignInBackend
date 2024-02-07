const { Router } = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config.js");
const {
  signUpUserMiddleware,
  signInMiddleware,
} = require("../middlewares/user");
const { User } = require("../db/index.js");

const router = Router();
router.post("/signup", signUpUserMiddleware, async function (req, res) {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const existing = await User.findOne({
    email,
  });
  if (existing) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }
  const timer = setTimeout(function () {
    //if the db call exceeds time limit of 10s
    res.status(500).json({
      message: "Something went wrong! Cannot signup",
    });
  }, 5000);
  await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  clearTimeout(timer);
  res.status(200).json({
    message: "Signed up successfully",
  });
});
router.post("/signin", signInMiddleware, async function (req, res) {
  const { email } = req.body;
  const { password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(404).json({
      message: "User does not exist",
    });
  } else {
    if (password !== existingUser.password) {
      res.status(403).json({
        message: "Wrong Password",
      });
      return;
    }
    res.status(200).json({
      message: "Logged in successfully",
      token: jwt.sign({ email, loggegIn: true }, jwtSecret),
    });
  }
});
router.get("/", function (req, res) {
  res.json({
    message: "Server is working",
  });
});
module.exports = router;
