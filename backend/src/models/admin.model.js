import mongoose from "mongoose"
import bcrypt from "bcrypt"


const adminSchema =  new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    Password:{
        type:String,
        required: true,
    },


   

}) 


adminSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next(); 
      this.Password = await bcrypt.hash(this.Password, 10)
    next()
})
adminSchema.methods.isPasswordCorrect = async function (Password){
    return await bcrypt.compare(Password, this.Password)
}

const admin = mongoose.model("admin",adminSchema);