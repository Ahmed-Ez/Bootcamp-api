const mongoose = require("mongoose");
const slugify = require("slugify");
const BootcampSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add a name"],
        unique:true,
        trim:true,
        maxlength:[50,"name can't be more than 50 characters"]
    },
    slug:String,
    description:{
        type:String,
        maxlength:[500,"Description can't be more than 500 characters"]
    },
    website:{
        type:String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please give a valid URL '
          ]
    },
    phone:{
        type:String,
        maxlength:[20,"Phone number can't exceed 20 numbers"]
    },
    email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email"]
    },
    address:{
        type:String,
        required:[true,"Please enter an address"]
    },
    careers:{
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            "UI/UX",
            "Data Science",
            "Business",
            "Other"
        ]
    },
    averageRating:{
        type:Number,
        min:[1,"Rating can't be lower than 1"],
        max:[10,"Rating can't be higher than 10"]
    },
    averageCost:Number,
    photo:{
        type:String,
        default:"no-photo.jpg"
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssistance:{
        type:Boolean,
        default:false
    },
    jobGuarentee:{
        type:Boolean,
        default:false
    },
    acceptGi:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

//create bootcamp slug from name

BootcampSchema.pre('save',function(next){
this.slug = slugify(this.name,{lower:true});
next();
});

module.exports = mongoose.model("Bootcamp",BootcampSchema);