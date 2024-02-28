const Joi = require("joi");
const User = require("../models/UserModels");
const _ = require("lodash");
const bcrypt = require("bcrypt");

//// Signup User Details Add
module.exports.signup = async (req, res, next) =>{

    //// Check user with same email id is exist
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User with same Email already exist.');
    
    //// what we need from request get into array and pass for insert into database
    const userObject = _.pick(req.body, ['name', 'email', 'birthdate', 'mobile', 'gender', 'password']);

    const salt = await bcrypt.genSalt(10);
    userObject.password = await bcrypt.hash(userObject.password, salt);
    user = await new User(userObject).save();
    user.password = undefined;
     
    res.status(200).send({
        status:200,
        message:"Successfully Sign up.",
        data:user
    })
}

//// User Login Function 
module.exports.login = async (req, res, next) => {
    console.log('Login Called');
    const form_data = _.pick(req.body, ['email', 'password']);
    console.log(form_data);
    
    //// check user input validation
    let error = loginValidation(form_data);
    if(error) return res.status(400).send({status:400,message:"Invalid Email Id And Password."});
    
    //// check Email id and password for validate Email and password for user exist.
    const user = await User.findOne({email:req.body.email});
    if(!user)  return res.status(400).send('Invalid Email or Password.');

    //// return res.status(200).send({"Input ":req.body.password, "DB" : user.password, "data":user.name});

    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)  return res.status(400).send('Invalid Email or Password.');

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send({data:_.pick(user, ['id', 'name', 'email', 'birthdate', 'mobile', 'gender']), message:"Successfully Login"});

}
//// User Login Function End

//// Check User is Login function start
module.exports.isLogin = async (req, res, next) =>{
    
}
//// Check User is Login function End

//// Check User is Valid or not function start
module.exports.isValidUser = async (req, res, next) =>{
    console.log('Valid user...');
    next();
}
//// Check User is Valid or not function End



////  Validation Start

//// Signup Page Validation start
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
//// Signup Page Validation End


//// User Login Form Validation Code Start
const loginValidation = (formData) => {
    const login_schema = Joi.object({
                        email:Joi.string().email({
                            minDomainSegments: 2,
                            tlds: { allow: ["com", "net", "in"] },
                        }).required(),
                        password: Joi.string().min(8).max(15).required(),
                        
                    });
    const isValid = login_schema.validate(formData);
    return isValid.error;
} 
//// User Login Form Validation Code End

////  Validation End