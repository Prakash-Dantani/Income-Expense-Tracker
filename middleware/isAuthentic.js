const jwt = require('jsonwebtoken');
const config = require('config'); 

module.exports = function (req, res, next){
    const token = req.header('x-auth-header');
    if(!token) return res.status(401).send('Access denied. No Token Provided.');

    try {
        const decode = jwt.verify(token, config.get(JWT_SECRET_KEY));
        req.user = decode;
        console.log(req.user);
        next();
    } catch (ex) {
        return res.status(400).send('Invalid Token');
    }
}