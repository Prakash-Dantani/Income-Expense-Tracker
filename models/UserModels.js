const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config'); 
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name:{ type:String, minlength:5, maxlength:30, required:true},
    birthdate:{ type:Date, default:null},
    email:{ type:String, required:true, unique:false},
    mobile:{ type:String, minlength:10, maxlength:10, required:true},
    gender:{ type:String, minlength:4, maxlength:6, required:true},
    password: { type:String, minlength:3, required:true},
    isAdmin: { type:Boolean, default:false}
});

userSchema.method('generateAuthToken', function(){
    const token = jwt.sign(
                            { _id : this._id,
                              isAdmin : this.isAdmin,
                              name:this.name,
                              mobile:this.mobile,
                              email:this.email
                            },
                          'Ram@1324',
                          { expiresIn: '1h' });
    return token;
})
const User = mongoose.model('users', userSchema);

module.exports = User;

module.exports.mongoose = mongoose;