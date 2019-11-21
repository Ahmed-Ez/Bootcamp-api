//@desc  Get all bootcamps
//@route Get /api/v1/bootcamps
//@access  public
exports.getBootCamps =(req,res,next) => {
    res.status(200).json({success:true,msg:"show all bootcamps"});
}

//@desc  Get single bootcamp
//@route Get /api/v1/bootcamps/:id
//@access  public
exports.getBootCamp =(req,res,next) => {
    res.status(200).json({sucess:true,msg:`Display bootcamp ${req.params.id}` });
}

//@desc     create  bootcamp
//@route    Post /api/v1/bootcamps
//@access   private
exports.createBootCamp =(req,res,next) => {
    res.status(200).json({sucess:true,msg:"Create new bootcamp"});
}


//@desc     Update bootcamp
//@route    put /api/v1/bootcamps/:id
//@access   private
exports.updateBootCamp =(req,res,next) => {
    res.status(200).json({sucess:true,msg:`Update bootcamp ${req.params.id}` });
}

//@desc  Delete bootcamps
//@route delete /api/v1/bootcamps/:id
//@access  private
exports.deleteBootCamp =(req,res,next) => {
    res.status(200).json({sucess:true,msg:`Delete bootcamp ${req.params.id}` });
}