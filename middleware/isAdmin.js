const jwt = require('jsonwebtoken');
const config = require('config'); 

module.exports = function (req, res, next){
    try {
        if(!req.user.isAdmin)
            return res.status(403).send('You have not permission to access this page.');
        next();
    } catch (ex) {
        return res.status(400).send('Invalid Token');
    }
}