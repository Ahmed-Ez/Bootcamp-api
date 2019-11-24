const ErrorResponse = require("..//utils/errorResponse");
const asyncHandler = require("..//middleware/async");
const User = require("..//models/User");


//@desc  Register user 
//@route Post /api/v1/auth/register
//@access  public
exports.register = asyncHandler(async(req,res,next) =>{
   const {name,email,password,role} = req.body;
   const user = await User.create({
       name,
       email,
       password,
       role
   });

   sendTokenResponse(user,200,res);
});


//@desc  login user 
//@route Post /api/v1/auth/login
//@access  public
exports.login = asyncHandler(async(req,res,next) =>{
    const {email,password} = req.body;
    
    //validate email and password
    if(!email || !password) return next(new ErrorResponse('please provide an email and password',400));

    const user = await User.findOne({email}).select('+password');

    if(!user) return next(new ErrorResponse('Invalid user or password',401));
    
    //check if password match
    const isMatch = await user.matchPassword(password);

    if(!isMatch) return next(new ErrorResponse('Invalid user or password',401));


    sendTokenResponse(user,200,res);
 });

 // get token from model,create cookie then send
const sendTokenResponse = (user,statusCode,res) =>{

    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true,
    };

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({sucess:true,token});
}


//@desc  get current user 
//@route get /api/v1/auth/me
//@access  private
exports.getMe = asyncHandler(async(req,res,next) =>{
    req.user = await User.findById(req.user.id);
    res.status(200).json({sucess:true,data:user});
 });
 