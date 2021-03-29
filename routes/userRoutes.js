const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (username.trim() === "") {
      return res.status(400).json({ message: "Username must not be empty" });
    } else if (email.trim() === "") {
      return res.status(400).json({ message: "Email must not be empty" });
    } else if (password.trim() === "") {
      return res.status(400).json({ message: "Password must not be empty" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords dont match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    const result = await newUser.save();

    const token = jwt.sign(
      {
        id: result._id,
        email: result.email,
        username: result.username,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ data: { ...result._doc, token } });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (username.trim() === "") {
      return res.status(400).json({ message: "Username must not be empty" });
    } else if (password.trim() === "") {
      return res.status(400).json({ message: "Password must not be empty" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ data: { ...user._doc, token } });
  })
);

module.exports = router;
