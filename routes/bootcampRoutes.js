const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcampsController");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

//Include other resource routers
const courseRouter = require("./courseRoutes");

const router = express.Router();

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router.route("/:id/photo").put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

module.exports = router;
