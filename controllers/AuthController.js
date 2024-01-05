const Joi = require("joi")
const User = require("../models/UserModels")
const _ = require("lodash");

// Signup page Add
module.exports.signup = async (req, res, next) =>{

    const userObject = _.pick(req.body, ['name', 'email', 'birthdate', 'mobile', 'gender', 'password']);
    // const salt = await bcrypt.genSalt(10);
    // userObject.password = await bcrypt.hash(userObject.password, salt);
    console.log(userObject);
    // const user = User.create(userObject);
    const user = await new User(userObject).save();

     
    // const token = user.generateAuthToken();
    // return res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email', 'birthdate', 'mobile', 'gender', 'password']));


    res.status(200).json({
        status:200,
        message:"Successfully Sign up."
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