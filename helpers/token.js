const jwt = require("jsonwebtoken");
module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_TOKEN_KEY
    );
  },
  verifyToken: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ status: "error", data: "Access Denied" });
    try {
      const user = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      req.user = user;
      next();
    } catch (error) {
      return res.status(400).json({ status: "error", data: "Invalid Token" });
    }
  },
};
