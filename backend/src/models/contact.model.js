import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    status: {
        type: Boolean,
        default: false
    }
})

const contact = mongoose.model("contact", contactSchema)

export {contact}
