const Joi = require("joi");
const _ = require('lodash');
const ExpenseCategoryItems = require("../models/ExpenseCategoryItems");
const {ExpenseCategories} = require("../models/ExpenseCategories");
const {validateObjectID} = require("../middleware/validateID");

module.exports.index = async(req, res) => {
    let expense_category_items = await ExpenseCategoryItems.find().select({name:1, _id:2}).sort('name');
    if(!expense_category_items) return res.status(400).send('Expense Category Items not found.');
    return res.status(200).send({message : "Successfully Expense Category Items Fetched", data : expense_category_items});
}

module.exports.store = async (req, res) => {
    // validation
    let error = expenseItemsValidation(req.body, _.pick['name', 'expense_category']);
    if(error) return res.status(400).send({data:req.body, message:error});

    // Check already exist Expense category 
    let expense_category_item = await ExpenseCategoryItems.findOne({name:req.body.name});
    if(expense_category_item) return res.status(400).send({message: "Expense Category Items already exist."});

    // check is valid expense cateory id
    error = validateObjectID(req.body.expense_category);
    if(error) return res.status(400).send({message: "Expense Category Id is not Valid."});

    // get expnse category record using id
    const expense_category =  await ExpenseCategories.findOne({'_id':req.body.expense_category}).select({name:1, _id:2});
    if(!expense_category) return res.status(400).send({message: "Expense Category not Found."});

    // create object for store new record
    expense_category_item = {
        name : req.body.name,
        created_by : req.user._id,
        expense_category : {
            _id : expense_category._id,
            name : expense_category.name,
        }
    };

    expense_category_item = await ExpenseCategoryItems(expense_category_item).save();

    return res.status(200).send({
                    message : "New Expense Category Successfully Added.",
                    data : expense_category_item, 
                    // data : _.pick(expense_category_item, ['name']), 
                });
}


module.exports.edit = async (req, res) => {
    // check is valid expense cateory id
    let error = validateObjectID(req.body.id);
    if(error) return res.status(400).send({message: "Expense Category Item Id is not Valid."});

    // Check Expense category Item record is exist  
    const expense_category_item = await ExpenseCategoryItems.findOne({'_id':req.body.id});
    if(!expense_category_item) return res.status(400).send({message: "Expense Category Items Not found."});

    return res.status(200).send({
                    message : "Expense Category Item Successfully Fetched.",
                    data : expense_category_item, 
                });
}

module.exports.update = async (req, res) => {
    // validation
    let error = expenseItemsValidation(_.pick(req.body, ['name', 'expense_category']));
    if(error) return res.status(400).send({data:req.body, message:error});

     // check is valid expense cateory Item id
     error = validateObjectID(req.body.id);
     if(error) return res.status(400).send({message: "Expense Category Item Id is not Valid."});
 
     // check is valid expense cateory id
     error = validateObjectID(req.body.expense_category);
     if(error) return res.status(400).send({message: "Expense Category Id is not Valid."});

    // Check already exist Expense category 
    let expense_category_item = await ExpenseCategoryItems.findOne({
        $and: [
            {name:req.body.name},
            { _id: { $ne: req.body.id }}
        ]
      });
    if(expense_category_item) return res.status(400).send({message: "Expense Category Items already exist."});

    // get expnse category record using id
    const expense_category =  await ExpenseCategories.findOne({'_id':req.body.expense_category}).select({name:1, _id:2});
    if(!expense_category) return res.status(400).send({message: "Expense Category not Found."});

    // create object for store new record
    expense_category_item = {
        name : req.body.name,
        created_by : req.user._id,
        expense_category : {
            _id : expense_category._id,
            name : expense_category.name,
        }
    };

    // Check Expense category Item record is exist  
     expense_category_item = await ExpenseCategoryItems.findByIdAndUpdate(req.body.id, expense_category_item, {new:true});
    if(!expense_category_item) return res.status(400).send({message: "Expense Category Items Not found."});

    return res.status(200).send({
                    message : "Expense Category Successfully Updated.",
                    data : expense_category_item, 
                });
}


module.exports.delete = async (req, res) => {
    // check is valid expense cateory id
    let error = validateObjectID(req.body.id);
    if(error) return res.status(400).send({message: "Expense Category Item Id is not Valid."});

    // Check Expense category Item record is exist  
    const expense_category_item = await ExpenseCategoryItems.findOneAndDelete({'_id':req.body.id});
    if(!expense_category_item) return res.status(400).send({message: "Expense Category Items Not found."});

    return res.status(200).send({
                    message : "Expense Category Item Successfully Deleted.",
                    data : expense_category_item, 
                });
}


const expenseItemsValidation = (FormData) => {
    console.log(FormData);
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