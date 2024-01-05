const express = require("express");
const Validator = require("../middleware/validate");
const Auth = require("../controllers/AuthController");
const router = express.Router();

// router.get('/signup',Auth.signupValidation, Auth.signup);
router.post('/signup',Validator(Auth.signupValidation), Auth.signup);
// router.get('/login',Auth.login);

module.exports = router;