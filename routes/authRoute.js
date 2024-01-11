const express = require("express");
const Validator = require("../middleware/validate");
const Auth = require("../controllers/AuthController");
const router = express.Router();

router.post('/signup',Validator(Auth.signupValidation), Auth.signup);
router.post('/login', Auth.login);

module.exports = router;