const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const UserRoute = require("./routes/User.routes");
const BookingRoute = require("./routes/Booking.routes");
const app = express();

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// env config
dotenv.config({ path: __dirname + "/config/config.env" });
// database connection
connectDB();
// // enables cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
// logger
app.use(morgan("dev"));

// url Check
app.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});
app.use("/user", UserRoute);
app.use("/booking", BookingRoute);
// PORT no.
const port = process.env.PORT || process.env.PORT_NO;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on ${port} no.`
    );
  }
});
