const mongoose = require("mongoose");

const Carsbook_Schema = new mongoose.Schema(
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
    carname: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
    price: {
      type: Number,
    },
    ownedby: {
      type: String,
    },
    owneraddress: {
      type: String,
    },
    rigistration: {
      type: String,
    },
    fuel: {
      type: String,
    },
    makeyear: {
      type: String,
    },
    uploaderid: {
      type: mongoose.Types.ObjectId,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true, // Add this option to enable timestamps
  }
);

var Cars_Book_Seat_Model = mongoose.model("carsbook", Carsbook_Schema);

module.exports = Cars_Book_Seat_Model;
