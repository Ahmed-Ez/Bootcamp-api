const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//@desc  Get all bootcamps
//@route Get /api/v1/bootcamps
//@access  public
exports.getBootCamps = asyncHandler(async(req,res,next) => {
        let query;
        //copy req
        const reqQuery = {... req.query};
        
        //fields to delete
        const removeFields = ["select",'sort','limit','page'];

        //remove fields
        removeFields.forEach(element => delete reqQuery[element]);
        //ADD CORRECT OPERATOORS '$'
        let queryString = JSON.stringify(reqQuery);
        queryString=queryString.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`);
        query=Bootcamp.find(JSON.parse(queryString)).populate('courses');

        //selecting certain fields
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query=query.select(fields);
        }

        //sort
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query=query.sort("-createdAt");
        }



        //paginatation
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 20;
        const startIndex = (page-1) * limit;
        const endIndex = page*limit;
        const total = await Bootcamp.countDocuments();

        query=query.skip(startIndex).limit(limit);

        //pagination results
        const pagination ={};

        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }

        //executing 
        const bootcamps = await query;
        res.status(200).json({sucess:true,count:bootcamps.length,pagination,data:bootcamps});
    
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
    
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) return  next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`,404));

    bootcamp.remove();
    res.status(200).json({sucess:true,data:{}});

    
});