const ExpenseCategories = require("../models/ExpenseCategories");
const _ = require('lodash');

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
    
    //// Check Category with same name is exist
    let ExpenseCategory = await ExpenseCategories.findOne({name:req.body.name});
    if(ExpenseCategory) return res.status(400).send('Category with same name already exist.');
    
    //// what we need from request get into array and pass for insert into database
    const category_object = _.pick(req.body, ['name']);
    category_object['created_by'] = 1;

    ExpenseCategory = await new ExpenseCategories(category_object).save();

    return res
            // .header('x-auth-token', token)
            .send({
                    data:_.pick(ExpenseCategory, ['name']), 
                    message:"New Expense Category Successfully Added."
                });
}
// // Add Expense Category Code End


// // List or View Expense Category Code Start
module.exports.edit = async (req, res) =>{
    let id = req.params.id;
    if(req.method === 'POST')
          id = req.body.id;

    let expense_category = await ExpenseCategories.findOne({'_id':id}).select({name:1, _id:2});
    if(!expense_category) return res.status(400).send('Category not found.');
    res.status(200).send(expense_category); 
};
// // List or View Expense Category Code End

