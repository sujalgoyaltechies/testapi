const mongoose = require("mongoose");

const Cars_Schema = new mongoose.Schema(
  {
    carname: { type: String, required: true },

    brand: {
      type: String,
      required: true,
    },
    makeyear: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    insurancevalidity: {
      type: String,
      required: true,
    },
    enginecapacity: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },

    driven: {
      type: String,
      required: true,
    },

    registration: {
      type: String,
      required: true,
    },
    ownedby: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    approve: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var Book_Seat_Model = mongoose.model("cars", Cars_Schema);

module.exports = Book_Seat_Model;
