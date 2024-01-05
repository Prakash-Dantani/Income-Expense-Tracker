const Joi = require("joi")

// Signup page Add
module.exports.signup = (req, res, next) =>{
    
    res.status(200).json({
        status:200,
        message:"Auth Controller Signup Method Call."
    })
}

//  Validation Start

// Signup Page Validation start
module.exports.signupValidation = (userData) => {
    const signUpSchema = Joi.object({
        name:Joi.string().min(5).max(30).required(),
        birthdate:Joi.date().max('now').allow("").allow(null),
        email:Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "in"] },
        }).required(),
        mobile:Joi.string().max(10).min(10).required(),
        gender:Joi.string().valid('Male', 'Female', 'Other').required(),
        password: Joi.string().min(3).max(15).required(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
        
    });
    
    const isValid = signUpSchema.validate(userData);
    return isValid.error;
}

//  Validation End