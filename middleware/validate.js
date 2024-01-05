const AppError = require("../utils/appError");

module.exports = (handler) => {
  return async (req, res, next) => {
    console.log("Handler called...");
    console.log(req.body);
    const err = handler(req.body);
    if (err) return next(new AppError(err.details[0].message, 400));
    next();
    console.log("Handler called End...");
  };
};
