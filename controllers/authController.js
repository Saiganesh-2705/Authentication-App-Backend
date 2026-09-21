const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// ======================
// SIGNUP
// ======================

const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      error: "Email already exists",
    });

  }
};


// ======================
// LOGIN
// ======================

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        error: "User not found",
      });

    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {

      return res.status(400).json({
        error: "Invalid password",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token: token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error",
    });

  }
};


module.exports = {
  signup,
  login,
};