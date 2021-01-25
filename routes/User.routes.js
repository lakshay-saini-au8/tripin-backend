const express = require("express");
const router = express.Router();
const TOKEN = require("../helpers/token");
const ROLE = require("../helpers/role");
const UserController = require("../controllers/User.controller");
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/all", TOKEN.verifyToken, ROLE.forAdmin, UserController.getAllUser);
router.delete(
  "/delete/:userId",
  TOKEN.verifyToken,
  ROLE.forAdmin,
  UserController.deleteUser
);

module.exports = router;
