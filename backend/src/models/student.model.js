import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({

    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },

    Firstname:{
        type:String,
        required:true,
        trim:true,
        
    },

    Lastname:{
        type:String,
        required:true,
        trim:true,
    },

    Password:{
        type:String,
        required: true,
    },

},
{
    timestamps:true,
}
)

studentSchema.pre("save", async function(next) {
    if(this.isModified('Firstname') || this.isNew){
        this.Firstname = this.Firstname.charAt(0).toUpperCase() + this.Firstname.slice(1).toLowerCase();
    }

    if(this.isModified('Lastname') || this.isNew){
        this.Lastname = this.Lastname.charAt(0).toUpperCase() + this.Lastname.slice(1).toLowerCase();
    }

    next()
})

studentSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next(); 
      this.Password = await bcrypt.hash(this.Password, 10)
    next()
})







export const student = mongoose.model("student",studentSchema)