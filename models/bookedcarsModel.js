const mongoose = require("mongoose");

const bookedcars_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
    carname: {
      type: String,
    },
    uploaderid: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

var Booked_Cars_Seat_Model = mongoose.model("bookedcars", bookedcars_Schema);

module.exports = Booked_Cars_Seat_Model;
