const {ExpenseCategories} = require("../models/ExpenseCategories");
const _ = require('lodash');
const GetID = require('../middleware/getValidateID');
const Joi = require("joi");

// // List or View Expense Category Code Start
module.exports.index = async (req, res) =>{
    let expense_categories = await ExpenseCategories.find().select({name:1, _id:2}).sort('name');
    if(!expense_categories) return res.status(400).send('Category not found.');
    // expense_categories = _.pick(expense_categories, ['name' , '_id']);
    res.status(200).send(expense_categories); 
};
// // List or View Expense Category Code End


// // Add Expense Category Code Start
module.exports.store = async(req, res) => {
    
    // Category Validation
    const error = category_validation(req.body, _.pick(['name']));
    console.log(error);
    if(error) return res.status(400).send({status:400,message:error.message});
    
    //// Check Category with same name is exist
    let ExpenseCategory = await ExpenseCategories.findOne({name:req.body.name});
    if(ExpenseCategory) return res.status(400).send('Category with same name already exist.');
    
    //// what we need from request get into array and pass for insert into database
    const category_object = _.pick(req.body, ['name']);
    category_object['created_by'] = req.user._id;

    ExpenseCategory = await new ExpenseCategories(category_object).save();

    return res
            // .header('x-auth-token', token)
            .send({
                    data:_.pick(ExpenseCategory, ['name']), 
                    message:"New Expense Category Successfully Added."
                });
}
// // Add Expense Category Code End


// // select Expense Category for Edit Code Start
module.exports.edit = async (req, res) =>{
    const id = GetID.GetID(req);

    let expense_category = await ExpenseCategories.findOne({'_id':id}).select({name:1, _id:2});
    if(!expense_category) return res.status(400).send('Category not found.');
    res.status(200).send(expense_category); 
};
// // select Expense Category for Edit Code End


// // Update Expense Category Code Start
module.exports.update = async (req, res) =>{
    const id = GetID.GetID(req);
        
    //// Check Category with id is exist or not
    let expense_category = await ExpenseCategories.findById(id);
    if(!expense_category) return res.status(404).send('Category not found.');
    
    //// Check Category with same name is exist
    expense_category = await ExpenseCategories.findOne({name:req.body.name});
    if(expense_category) return res.status(400).send('Category with same name already exist.');
    
    const updateObject = {
        name : req.body.name,
        updated_by : req.user._id,
        updated_at : Date.now(),
    };

    expense_category = await ExpenseCategories.findByIdAndUpdate(id, updateObject, {new : true} );
    if(!expense_category) return res.status(400).send({msg : 'Something wrong, Please Try again.'});
    
    return res.status(200).send({msg : 'Expense Category Successfully Updated.', data : _.pick(expense_category, ['name'])});
};
// // Update Expense Category Code End


// // Delete Expense Category Code Start
module.exports.delete = async (req, res) =>{
    const id = GetID.GetID(req);

    //// Check Category with id is exist or not
    let expense_category = await ExpenseCategories.findById(id);
    if(!expense_category) return res.status(404).send('Category not found.');
    
    const updateObject = {
        is_deleted : true,
        deleted_by : req.user._id,
        deleted_at : Date.now(),
    };

    expense_category = await ExpenseCategories.findByIdAndUpdate(id, updateObject, {new : true} );
    if(!expense_category) return res.status(400).send({msg : 'Something wrong, Please Try again.'});
    
    return res.status(200).send({msg : `Expense Category : ${expense_category.name} Successfully Deleted.`, data : _.pick(expense_category, ['name', 'is_deleted'])});
};
// // Delete Expense Category Code End

// // Category Validation Code start
const category_validation = (FormData) =>{
    const category_validation_schema = Joi.object({
        name:Joi.string().min(3).max(100).required().regex(/^[a-zA-Z0-9\s]+$/
            ).messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be an empty field`,
            'string.min': `"Name" should have a minimum length of {#limit}`,
            'string.max': `"Name" should have a maximum length of {#limit}`,
            'string.pattern.base': `"Name" should have a only character not allowed special character`,
            'any.required': `"Name" is a required field`
          })
    });

    const is_valid = category_validation_schema.validate(FormData);
    return is_valid.error;
}
// // Category Validation Code End