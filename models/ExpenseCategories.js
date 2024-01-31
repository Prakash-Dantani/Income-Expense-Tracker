const mongoose = require("mongoose");

const expansecategorySchema =  new mongoose.Schema({
    name: { type:String, minlength:5, maxlength:30, required:true },
    created_by: { type:Number, minlength:1, required:true },
    created_at: { type: Date, default: Date.now },
    updated_by: { type:Number, minlength:1, required:false },
    updated_at: { type:Date, required:false },
}); 

const expansecategory = mongoose.model('expanse_categories', expansecategorySchema);

module.exports = expansecategory;