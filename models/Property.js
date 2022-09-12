const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const propertySchema = new Schema({
    name:{
        type:String,
        required:[true,"The propery name is required !"]
    },
    Bedroom:{
        type:Number,
        required:true
    },
    Sittingroom:{
        type:Number,
        required:true,
    },
    kitchen:{
        type:Number,
        required:true
    },
    noPerson:{
        type:Number,
        required:true
    },
    noFemale:{
        type:Number,
        required:true
    },
    noMale:{
        type:Number,
        required:true
    },
    option:{
        type:String,
        required:true,
        enum:["sale","rent","housemate"]
    },
    likeCount:{
        type:[String],
        default:[]
    }, carParking:{
        type:Boolean,
        default:false
    },
    FullyFurnished:{
        type:Boolean ,
        default:false        
    },
    constIncludeSocialFacilities:{
        type:Boolean ,
        default:false
        },
    PartlyFurnished:{
        type:Boolean,
        required:function(){
            return this.FullyFurnished === false
        }
    },
    payFor3months:{
        type:Boolean ,
        default:false
    },
    
})
module.exports = mongoose.model('Property',propertySchema);