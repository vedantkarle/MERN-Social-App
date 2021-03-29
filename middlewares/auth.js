const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split("Bearer ")[1];
    }

    if (token) {
      const user = jwt.verify(token, SECRET);

      req.user = user;

      next();
    } else {
      return res.status(400).json({ message: "You must be logged in" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
