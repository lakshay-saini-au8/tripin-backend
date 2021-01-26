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
      let data;
      if (req.user.role === "user") {
        data = await Booking.find({ userId: req.user._id }).populate(
          "userId",
          "name"
        );
      } else {
        if (req.query.q === "active") {
          data = await Booking.find({
            bookingDate: { $gte: new Date() },
          })
            .populate("userId", "name")
            .sort("-createdAt");
        } else if (req.query.q === "completed") {
          data = await Booking.find({
            bookingDate: { $lte: new Date() },
          })
            .populate("userId", "name")
            .sort("-createdAt");
        } else {
          data = await Booking.find()
            .populate("userId", "name")
            .sort("-createdAt");
        }
      }

      res.status(200).json({
        bookings: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  acceptBooking: async (req, res) => {
    const bookingId = req.body.id;
    const q = req.body.q;
    try {
      const booking = await Booking.findOne({ _id: bookingId });
      if (!booking) return res.status(406).json({ message: "User not exist" });
      if (q === "accept") {
        booking.isAccepted = true;
      } else {
        booking.isAccepted = false;
      }
      booking.save();

      return res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getFilterBooking: async (req, res) => {
    const { name, date } = req.body;
    try {
      let data;
      if (req.body.name && req.body.date) {
        data = await Booking.find({
          hotelName: name,
          bookingDate: new Date(date),
        }).populate("userId", "name");
      } else if (name) {
        data = await Booking.find({
          hotelName: name,
        }).populate("userId", "name");
      } else if (date) {
        data = await Booking.find({
          bookingDate: new Date(date),
        }).populate("userId", "name");
      }

      res.status(200).json({
        bookings: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
