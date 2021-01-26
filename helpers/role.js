module.exports = {
  forAdmin: (req, res, next) => {
    if (req.user.role !== "admin")
      return res.status(401).json({ message: "Access Denied" });
    next();
  },
};
