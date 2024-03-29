const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

//@desc  Get all courses 
//@route Get /api/v1/courses
//@route Get /api/v1/bootcamps/:bootcampId/courses
//@access  public
exports.getCourses = asyncHandler(async(req,res,next)=>{
let query;
if(req.params.bootcampId){
    query = Course.find({bootcamp:req.params.bootcampId});
}else{
    query = Course.find().populate({
        path:'bootcamp',
        select:'name description'
    });
}

const courses = await query;

res.status(200).json({
    sucess:true,
    count:courses.length,
    data:courses
    });
});


//@desc  Get signle course 
//@route Get /api/v1/courses/:id
//@access  public
exports.getCourse = asyncHandler(async(req,res,next)=>{
    const course = await Course.findById(req.params.id).populate({
        path:"bootcamp",
        select:'name description'
    });

    if(!course){
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`),404);
    }
    
    res.status(200).json({
        sucess:true,
        data:course
        });
    });

//@desc  Post signle course 
//@route Post /api/v1/bootcamps/:bootcampId/courses
//@access  private
exports.addCourse = asyncHandler(async(req,res,next)=>{

    req.body.bootcamp=req.params.bootcampId;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp){
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),404);
    }

    const course = await Course.create(req.body);
    
    res.status(200).json({
        sucess:true,
        data:course
        });
    });


//@desc  update  course 
//@route put /api/v1/courses/:id
//@access  private
exports.updateCourse = asyncHandler(async(req,res,next)=>{

    let course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`),404);
    }

     course = await Course.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true
     });
    
    res.status(200).json({
        sucess:true,
        data:course
        });
    });



    
    
    
//@desc  Delete  course 
//@route delete /api/v1/courses/:id
//@access  private
exports.deleteCourse = asyncHandler(async(req,res,next)=>{

    const course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`),404);
    }

    await course.remove();
    
    res.status(200).json({
        sucess:true,
        data:course
        });
    });

