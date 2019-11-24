const jwt = require("jsonwebtoken");
const ErrorResponse = require("..//utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("..//models/User");


exports.protect = asyncHandler (async(req,res,next)=>{
let token;

if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer')){
token = req.headers.authorization.split(' ')[1];
}

else if(req.cookies.token){
token = req.cookies.token
}

//check if cookie is sent
if(!token) return next(new ErrorResponse('Not authorized to acess',401));

try{
    //verify token
    const decoded = jwt.verify(token,process.env.SECRET);
    req.user = await User.findById(decoded.id);
    next();
}catch(err){
    return next(new ErrorResponse('Not authorized to acess',401));
}
});