const User = require("../models/User");

const getDashboard = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id)
      .select("-password");

    if (!user) {

      return res.status(404).json({
        error: "User not found",
      });

    }

    res.json({
      message: "Welcome to Dashboard",
      user: user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error",
    });

  }
};

module.exports = {
  getDashboard,
};