const mongoose = require("mongoose");
const Cars_Book_Seat_Model = require("../models/carsbookModel");
const carsbook = require("../models/carsbookModel");
const bookedcars = require("../models/bookedcarsModel");

const Users = require("../models/userModel");

class Cars_Book_Controller {
  // controller for booking cars
  static cars_books = async (req, res) => {
    const {
      name,
      email,
      mobile_no,
      address,
      city,
      pin_code,
      carname,
      image,
      price,
      ownedby,
      owneraddress,
      registration,
      fuel,
      makeyear,
      uploaderid,
      user,
    } = req.body;

    let existingUser;
    try {
      existingUser = await Users.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable TO FInd User By This ID" });
    }
    const cars = new carsbook({
      name,
      email,
      mobile_no,
      address,
      city,
      pin_code,
      carname,
      image,
      price,
      ownedby,
      owneraddress,
      registration,
      fuel,
      makeyear,
      uploaderid,
      user,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await cars.save({ session });
      existingUser.carsbook.push(cars);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err, status: true });
    }

    return res.status(200).json({ cars, status: true });
  };

  static get_carsbooksby_userid = async (req, res, next) => {
    const userId = req.params.id;
    let userBookings;
    try {
      userBookings = await Users.findById(userId).populate("carsbook");
    } catch (err) {
      return console.log(err);
    }
    return res.status(200).json({ user: userBookings });
  };

  static booking_display = async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      const displaybooks = await carsbook.find();
      res.status(200).json({
        success: true,
        displaybooks,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static displaybooking_by_id = async (req, res) => {
    console.log(req.params.id);
    try {
      res.header("Access-Control-Allow-Origin", "*");
      const display_by_id = await Cars_Book_Seat_Model.findById(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        display_by_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static delete_booking = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
      const bookingdelete = await carsbook.findByIdAndDelete(req.params.id);
      if (!carsbook) {
        return res
          .status(500)
          .send({ status: "unsuccess", message: "car Not Found" });
      }

      res
        .status(200)
        .send({ status: "success", message: "car Delete Success" });
    } catch (error) {
      console.log(error);
    }
  };

  static update_booking = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    try {
      const updatebooking = await carsbook.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        city: req.body.city,
        pin_code: req.body.pin_code,
      });

      res.status(200).json({
        success: true,
        updatebooking,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //controllers for booking details for uploader
  static booked_cars = async (req, res) => {
    const {
      name,
      email,
      mobile_no,
      address,
      city,
      pin_code,
      uploaderid,
      image,
      carname,
    } = req.body;

    let existingUser;
    try {
      existingUser = await Users.findById(uploaderid);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable TO FInd User By This ID" });
    }
    const cars = new bookedcars({
      name,
      email,
      mobile_no,
      address,
      city,
      pin_code,
      uploaderid,
      image,
      carname,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await cars.save({ session });
      existingUser.bookedcars.push(cars);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err, status: true });
    }

    return res.status(200).json({ cars, status: true });
  };

  static get_bookedcarsby_userid = async (req, res, next) => {
    const userId = req.params.id;
    let userBookings;
    try {
      userBookings = await Users.findById(userId).populate("bookedcars");
    } catch (err) {
      return console.log(err);
    }
    return res.status(200).json({ user: userBookings });
  };

  static delete_bookedcars = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
      const bookingdelete = await bookedcars.findByIdAndDelete(req.params.id);
      if (!bookedcars) {
        return res
          .status(500)
          .send({ status: "unsuccess", message: "client Not Found" });
      }

      res
        .status(200)
        .send({ status: "success", message: "client Delete Success" });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Cars_Book_Controller;
