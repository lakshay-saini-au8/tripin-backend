const bcrypt = require("bcryptjs");
const TOKEN = require("../helpers/token");
const validate = require("../helpers/validaton_helper");
const Booking = require("../models/Booking.model");

module.exports = {
  createBooking: async (req, res) => {
    const { hotelName, cityName, cityId, price, bookingDate } = req.body;

    // create user
    try {
      const booking = new Booking({
        userId: req.user._id,
        hotelName,
        cityName,
        cityId,
        price,
        bookingDate,
      });
      const result = await booking.save();
      res.status(201).json({ booking: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserBooking: async (req, res) => {
    try {
      const data = await Booking.find({ userId: req.user._id }).populate(
        "userId",
        "name"
      );
      res.status(200).json({
        bookings: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
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
