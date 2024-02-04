const Joi = require("joi");
const _ = require('lodash');
const ExpenseCategoryItems = require("../models/ExpenseCategoryItems");

module.exports.index = async(req, res) => {
    let expense_category_items = await ExpenseCategoryItems.find().select({name:1, _id:2}).sort('name');
    if(!expense_category_items) return res.status(400).send('Expense Category Items not found.');
    res.status(200).send({message : "Successfully Expense Category Items Fetched", data : expense_category_items});
}

module.exports.store = (req, res) => {
    const error = expenseItemsValidation(req.body, _.pick['name', 'expense_category']);
    if(error) return res.status(400).send({data:req.body, message:error});
}


const expenseItemsValidation = (FormData) => {
    const expense_items = Joi.object({
        "name" : Joi.string().min(3).max(50).required().regex(/^[a-zA-Z0-9\s]+$/
                ).messages({
                'string.pattern.base': `"Name" should have a only character not allowed special character`,
                'any.required': `"Name" is a required field`
            }),
        "expense_category" : Joi.string().required(),  
    });
    const is_valid = expense_items.validate(FormData);
    return is_valid.error;

}