const User = require("../models/User");

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (err) {
    next(err);
  }
};
