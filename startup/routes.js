const authRoute = require("../routes/authRoute");
const ExpenseCategoryRoute = require("../routes/ExpenseCategoryRoute");
const ExpenseCategoryItemRoute = require("../routes/ExpenseCategoryItemRoute")

module.exports = function(app){
    app.use("/auth", authRoute);
    
    app.use("/expense_category", ExpenseCategoryRoute);
    
    app.use('/expense_category_item', ExpenseCategoryItemRoute)

    app.use("*", (req, res) =>
    res.status(404).json({ status: 500, message: "No Routes Found..!" })
    );
    // app.use(error);
}