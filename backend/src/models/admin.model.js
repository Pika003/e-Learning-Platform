import mongoose from "mongoose"
import bcrypt from "bcrypt"


const adminSchema =  new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
    },

}) 


adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); 
      this.password = await bcrypt.hash(this.password, 10)
    next()
})
adminSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

const admin = mongoose.model("admin",adminSchema);

export {admin}