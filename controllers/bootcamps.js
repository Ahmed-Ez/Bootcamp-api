const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//@desc  Get all bootcamps
//@route Get /api/v1/bootcamps
//@access  public
exports.getBootCamps = asyncHandler(async(req,res,next) => {
    
        const bootcamps = await Bootcamp.find();
        res.status(200).json({sucess:true,count:bootcamps.length,data:bootcamps});
    
});

//@desc  Get single bootcamp
//@route Get /api/v1/bootcamps/:id
//@access  public
exports.getBootCamp = asyncHandler(async(req,res,next) => {
    
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(bootcamp) res.status(200).json({sucess:true,data:bootcamp});
        else  next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`,404));
        
    
});

//@desc     create  bootcamp
//@route    Post /api/v1/bootcamps
//@access   private
exports.createBootCamp = asyncHandler(async (req,res,next) => {
    
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({
        success:true,
        data:bootcamp
    });

});


//@desc     Update bootcamp
//@route    put /api/v1/bootcamps/:id
//@access   private
exports.updateBootCamp = asyncHandler(async (req,res,next) => {
    
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`,404));

    res.status(200).json({sucess:true,data:bootcamp});

});

//@desc  Delete bootcamps
//@route delete /api/v1/bootcamps/:id
//@access  private
exports.deleteBootCamp = asyncHandler(async (req,res,next) => {
    
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp) return  next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`,404));

    res.status(200).json({sucess:true,data:{}});

    
});