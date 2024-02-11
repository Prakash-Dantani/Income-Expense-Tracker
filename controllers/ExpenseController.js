const Joi = require("joi")
const _ = require('lodash')
const ExpenseCategory = require("../controllers/ExpenseCategory")
const ExpenseCategoryItem = require("../controllers/ExpenseCategoryItem")
const Expense = require("../models/Expenses")
const { errorLogger } = require("../logger/winston-logger")
const { validateObjectID } = require("../middleware/validateID")
const { GetID } = require("../middleware/getValidateID")

module.exports.index = async (req, res) => {
    let expenses = await Expense.find().select();
    if(!expenses) return res.status(404).send({message:`Expense Detail not found.`, data:req.body, status:404});

    return res.status(200).send({message:`Sucessfully Fetched Expenses Details.`, data:expenses, status:200});

}

module.exports.store = async (req, res) => {
    let error = expnseValidation(_.pick(req.body, ['amount', 'date', 'expense_category_id', 'expense_category_item_id']));
    if(error) return res.status(400).send({message:error.message, data:[req.body]});
    
    let expense_category = await ExpenseCategory.getCategory(req.body.expense_category_id);;
    if(expense_category.status !== 200) return res.status(403).send({message:message, data:req.body});
    expense_category = expense_category.data;

    let expense_category_item = await ExpenseCategoryItem.getCategoryItems(req.body.expense_category_item_id);
    if(expense_category_item.status !== 200) return res.status(403).send({message:message, data:req.body});
    expense_category_item = expense_category_item.data;

    let expense = {
        amount : req.body.amount,
        date :req.body.date,
        expanse_category : {
            _id: expense_category._id,
            name:expense_category.name
        },
        expanse_category_item : {
            _id:expense_category_item._id,
            name:expense_category_item.name
        },
        created_by: req.user._id,
    };

    try{
        expense = await new Expense(expense).save();
    } catch(ex){
        errorLogger.error(ex.message);
        return res.status(500).send({message : "Internal Server Error, Please Contact administartor.", status:500, data:expense} );
    }

    return res.status(200).send({message : "Expsense Successfully Added.", status:200, data:expense} );
}

module.exports.edit = async(req, res) => {
    const id = GetID(req);
   
    let error = validateObjectID(id);
    if(error) return res.status(404).send({message:`Expense Detail not found or Invalid Expense ID.`, data:req.body, status:404});
    
    let expense = await Expense.findOne({'_id':id}).select();
    if(!expense) return res.status(404).send({message:`Expense Detail not found.`, data:req.body, status:404});

    const expense_categories = await ExpenseCategory.getAllCategory();
    const expense_category_items =await ExpenseCategoryItem.getAllCategoryItems();

    return res.
            status(200).send({
                message:`Sucessfully Fetched Expense Details.`, 
                data:expense, 
                expense_categories:expense_categories.data, 
                expense_category_items:expense_category_items.data, 
                status:200
            });
}



// USer Input Form Validation Start
const expnseValidation = (formData) => {
    const expense_validation = Joi.object({
        amount:Joi.number().required().min(1),
        date:Joi.date().less('now').iso().required(),
        expense_category_id:Joi.string().required(),
        expense_category_item_id:Joi.string().required(),
    });

    return expense_validation.validate(formData).error;
}
// USer Input Form Validation End