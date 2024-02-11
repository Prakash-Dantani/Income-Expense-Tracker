const mongoose = require("mongoose");
// const {expenseCategoryItems} = require("./ExpenseCategoryItems");


const ExpenseSchema = new mongoose.Schema({
                            amount : {type:Number, required: true, min:1},
                            date : {
                                        type:Date, 
                                        required:true, 
                                        validate: {
                                            validator: function(value) {
                                                return value <= new Date();
                                            },
                                            message: props => `${props.value} is a future date is not allowed.`
                                        }, 
                                    },
                            expanse_category : {
                                    type: new mongoose.Schema({
                                        _id : {type: String, required:true},
                                        name : {type:String, required:true},
                                    }),
                                    required:true,
                            },
                            expanse_category_item : {
                                    type: new mongoose.Schema({
                                        _id : {type: String, required:true},
                                        name : {type:String, required:true},
                                    }),
                                    required:true,
                            },
                            created_by: { type:String, minlength:1, required:false },
                            created_at: { type: Date, default: Date.now },
                            updated_by: { type:String, minlength:1, required:false },
                            updated_at: { type:Date, required:false },
                            deleted_by: { type:String, required:false }, 
                            deleted_at: { type:Date, required:false },
                            is_deleted : {type:Boolean}
                        });

const Expense = mongoose.model('expenses', ExpenseSchema);
module.exports = Expense;