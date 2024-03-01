import joi from "@hapi/joi"
import { asyncHandler } from "../utils/asyncHandler.js"



const authSchema = asyncHandler(async(req,_, next) =>{

    const schema = joi.object({
        Email: joi.string().email().lowercase().required(),
        Password: joi.string().min(8).max(16).required()
    })
    
    const result = await schema.validateAsync(req.body)


    req.user = result
    next()
})


export {authSchema}



