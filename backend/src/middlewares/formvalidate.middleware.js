import joi from "@hapi/joi"

export const authSchema = joi.object({
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().min(8).required()
})



