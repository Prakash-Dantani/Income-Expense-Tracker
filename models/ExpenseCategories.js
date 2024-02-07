const mongoose = require("mongoose");

const expansecategorySchema =  new mongoose.Schema({
    name: { type:String, minlength:3, maxlength:100, required:true },
    created_by: { type:String, minlength:1 },
    created_at: { type: Date, default: Date.now },
    updated_by: { type:String, minlength:1, required:false },
    updated_at: { type:Date, required:false },
    deleted_by: { type:String, required:false },
    deleted_at: { type:Date, required:false },
    is_deleted : {type:Boolean}
}); 

const expansecategory = mongoose.model('expanse_categories', expansecategorySchema);

exports.expansecategorySchema = expansecategorySchema;
exports.ExpenseCategories = expansecategory;