const express = require("express");
const {getBootCamps,getBootCamp,createBootCamp,updateBootCamp,deleteBootCamp } = require("../controllers/bootcamps");
const router = express.Router();
const courseRouter = require("./courses");
const { protect} = require("../middleware/auth");

router.use("/:bootcampId/courses",courseRouter);

router.route("/").get(getBootCamps).post(protect,createBootCamp);

router.route("/:id").get(getBootCamp).put(protect,updateBootCamp).delete(protect,deleteBootCamp);

 module.exports=router;