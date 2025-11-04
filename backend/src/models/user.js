import mongoose, { Schema }  from "mongoose";

// Base User Schema

const userSchema= new mongoose.Schema({
    name:{type:String},
    role:{
        type: String,
        // ENUM stands for Enumeration. 
        // It is a data type that allows a column to store a value from a predefined, limited set of possible string values
        enum: ["Customer","Admin","Provider"],
        required:true,
    },
    isActivated:{type:Boolean,default:false}
})

// Customer Schema

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone:{type:Number, required:true, unique:true},
    role:{type:String, enum: ["Customer"], default:"Customer"},
    created_at:{
        type:Date,
        default:Date.now
    }
},{
    // here you can specified schema collection if you want it uppercase
    // {collection:'Customer'}
        timestamps:false
    })

// Admin Schema
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    role:{type:String, enum: ["Admin"],default:'Admin'}
})


// Provider Schema

const providerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phone:{type:Number, required:true},
    role:{type:String,enum:["Provider"],default:"Provider"},
    booking_fee: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    provider_id: {
        type: String,
        required:true,
        trim: true,
        lowercase: true,
    },
    contactd_info:{
        type:Object,
        // Using Object for flexible storage of address,Email,social handle etc
        default:{}
    }

})


export const Customer = mongoose.model("Customer",customerSchema);
export const Provider = mongoose.model("Provider",providerSchema);
export const Admin = mongoose.model("Admin",adminSchema);