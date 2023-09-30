const express = require("express");
const carsController = require("../controllers/carsController");
const Cars_Book_Controller = require("../controllers/carsbookController");

const router = express.Router();

//cars api for upload delete update and show
router.get("/carsdisplay", carsController.cars_display);
router.get("/displaybyid/:id", carsController.display_by_id);
router.post("/carsinsert", carsController.cars_insert);
router.get("/displaycarsbyid/:id", carsController.get_carsby_userid);
router.get("/cardelete/:id", carsController.delete_car);
router.put("/carupdate/:id", carsController.update_cars);

//for booking and getting bookedcars
router.post("/carbooks", Cars_Book_Controller.cars_books);
router.get("/displaybooking", Cars_Book_Controller.booking_display);
router.get("/getbooksbyid/:id", Cars_Book_Controller.get_carsbooksby_userid);
router.get("/displaysbyid/:id", Cars_Book_Controller.displaybooking_by_id);
router.get("/deletebooking/:id", Cars_Book_Controller.delete_booking);

//for owner's side views of client details
router.post("/bookedcars", Cars_Book_Controller.booked_cars);
router.get(
  "/getbookedcarsbyid/:id",
  Cars_Book_Controller.get_bookedcarsby_userid
);
router.get("/deletebookedcars/:id", Cars_Book_Controller.delete_bookedcars);

module.exports = router;
