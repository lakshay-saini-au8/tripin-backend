module.exports = {
  forSellerAdmin: (req, res, next) => {
    if (req.user.role !== "seller" && req.user.role !== "admin")
      return res.status(401).json({ status: "error", data: "Access Denied" });
    next();
  },
  forAdmin: (req, res, next) => {
    if (req.user.role !== "admin")
      return res.status(401).json({ status: "error", data: "Access Denied" });
    next();
  },
};
