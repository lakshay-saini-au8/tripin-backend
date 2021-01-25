const express = require("express");
const router = express.Router();
const TOKEN = require("../helpers/token");
const ROLE = require("../helpers/role");
const BookingController = require("../controllers/Booking.controller");
router.post("/create", TOKEN.verifyToken, BookingController.createBooking);
router.get("/userbooking", TOKEN.verifyToken, BookingController.getUserBooking);
// router.get("/all", TOKEN.verifyToken, ROLE.forAdmin, UserController.getAllUser);
// router.delete(
//   "/delete/:userId",
//   TOKEN.verifyToken,
//   ROLE.forAdmin,
//   UserController.deleteUser
// );

module.exports = router;
