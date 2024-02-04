const mongoose = require('mongoose');
const {expansecategorySchema} = require("./ExpenseCategories");

const expenseCategoryItemSchema = new mongoose.Schema({
    name: { type:String, minlength:3, maxlength:100, required:true },
    expense_category : {type:expansecategorySchema, required:true}, 
    created_by: { type:String, minlength:1, required:true },
    created_at: { type: Date, default: Date.now },
    updated_by: { type:String, minlength:1, required:false },
    updated_at: { type:Date, required:false },
    deleted_by: { type:String, required:false }, 
    deleted_at: { type:Date, required:false },
    is_deleted : {type:Boolean}
});

const expenseCategoryItems = mongoose.model('expenseCategoryItemSchema', expenseCategoryItemSchema);

module.exports = expenseCategoryItems;