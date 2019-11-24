const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new  mongoose.Schema({
name:{
    type:String,
    required:[true,"please add a name"]
},
email:{
    type:String,
    required:[true,"please add an email"],
    unique:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email"]
},
role:{
    type:String,
    enum:['user','publisher'],
    default:'user'
},
password:{
    type:String,
    required:[true,'please add a password'],
    minlength:6,
    select:false
},
resetPasswordToken:String,
resetPasswordExpire:Date,
createdAT:{
    type:Date,
    default:Date.now
}
});

//Eccrypt password using bcrypt
UserSchema.pre('save',async function (next){
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken=function(){
return jwt.sign({id:this._id},process.env.SECRET,{
    expiresIn:process.env.JWT_EXPIRE
});
}

//match userpassword
UserSchema.methods.matchPassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",UserSchema);