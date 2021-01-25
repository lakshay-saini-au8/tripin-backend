const bcrypt = require("bcryptjs");
const TOKEN = require("../helpers/token");
const validate = require("../helpers/validaton_helper");
const User = require("../models/User.model");

module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    // validate user data
    const { error } = validate.register({ name, email, password });
    if (error)
      return res.status(406).json({ message: error.details[0].message });

    // check whether a user exists or not
    const user = await User.findOne({ email: email });
    if (user) return res.status(200).json({ message: "User Already exist" });

    // password hasing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    try {
      const user = new User({
        name: name,
        email: email,
        role: req.body.role || "user",
        password: hashedPassword,
      });
      const result = await user.save();
      res.status(201).json({ user: { userId: result._id, role: result.role } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    // validate login data
    const { error } = validate.login({ email, password });
    if (error)
      return res.status(406).json({ message: error.details[0].message });

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "User not exist" });

    // password check
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(200).json({ message: "Invalid Password" });

    // token generation
    const token = TOKEN.generateToken(user);

    res.header("Authorization", token).json({
      user: { token, role: user.role, name: user.name },
    });
  },
  getAllUser: async (req, res) => {
    try {
      const data = await User.find().where("role").ne("admin");
      res.status(200).json({
        status: "success",
        result: { users: data },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        result: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) return res.status(406).json({ message: "User not exist" });
      await user.remove();

      return res.status(200).json({
        status: "success",
        result: "User deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        result: error.message,
      });
    }
  },
};
