const mongoose = require("mongoose");
const GetID = require('../middleware/getValidateID');
module.exports = function (req, res, next) {
    const id = GetID.GetID(req);
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID.");
    next();
};

module.exports.validateObjectID = function (id) {
    if (mongoose.Types.ObjectId.isValid(id))
        return false;
    return true;
};
