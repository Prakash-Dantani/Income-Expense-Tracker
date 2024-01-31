const mongoose = require("mongoose");

module.exports = function (req, res, next) {
    let id = req.params.id;
    if(req.method === 'POST')
      id = req.body.id;

console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID.");
    next();
};
