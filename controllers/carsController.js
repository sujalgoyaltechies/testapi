const cars = require("../models/carsModel");
const Users = require("../models/userModel");
const mongoose = require("mongoose");

class Book_Seat_Controller {
  static cars_display = async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      const uploadedcars = await cars.find();
      res.status(200).json({
        success: true,
        uploadedcars,
      });
    } catch (err) {
      console.log(err);
    }
  };
  static get_carsby_userid = async (req, res, next) => {
    const userId = req.params.id;
    let userBookings;
    try {
      userBookings = await Users.findById(userId).populate("cars");
    } catch (err) {
      return console.log(err);
    }
    return res.status(200).json({ user: userBookings });
  };

  static display_by_id = async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      const bookseatall = await cars.findById(req.params.id, req.body);
      res.status(200).json({
        success: true,
        bookseatall,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static cars_insert = async (req, res) => {
    const {
      carname,
      brand,
      makeyear,
      model,
      fuel,
      transmission,
      insurancevalidity,
      enginecapacity,
      driven,
      registration,
      ownedby,
      image,
      user,
      price,
      address,
      approve,
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
    const car = new cars({
      carname,
      brand,
      makeyear,
      model,
      fuel,
      transmission,
      insurancevalidity,
      enginecapacity,
      driven,
      registration,
      ownedby,
      image,
      user,
      price,
      address,
      approve,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await car.save({ session });
      existingUser.cars.push(car);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err, status: true });
    }

    return res.status(200).json({ car, status: true });
  };

  static delete_car = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
      const cardelete = await cars.findByIdAndDelete(req.params.id);
      if (!cars) {
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

  static update_cars = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    try {
      const updatecar = await cars.findByIdAndUpdate(req.params.id, req.body, {
        carname: req.body.carname,
        brand: req.body.brand,
        makeyear: req.body.makeyear,
        model: req.body.model,
        fuel: req.body.fuel,
        transmission: req.body.transmission,
        insurancevalidity: req.body.insurancevalidity,
        enginecapacity: req.body.enginecapacity,
        driven: req.body.driven,
        registration: req.body.registration,
        ownedby: req.body.ownedby,
        image: req.body.image,
        price: req.body.price,
        address: req.body.address,
        approve: req.body.approve,
      });

      res.status(200).json({
        success: true,
        updatecar,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Book_Seat_Controller;
