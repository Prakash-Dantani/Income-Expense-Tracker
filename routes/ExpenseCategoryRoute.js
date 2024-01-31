const express = require("express");
const isAuthentic = require("../middleware/isAuthentic");
const isAdmin = require("../middleware/isAdmin");
const ExpenseCategory = require("../controllers/ExpenseCategory");
const router = express.Router();
const validateID = require("../middleware/validateID");


// only Admin and Login User can access this route
router.get('/index', isAuthentic, isAdmin, ExpenseCategory.index);
router.post('/store', isAuthentic, isAdmin, ExpenseCategory.store);
router.post('/edit', isAuthentic, isAdmin, validateID, ExpenseCategory.edit);
// router.get('/edit/:id', isAuthentic, isAdmin, validateID, ExpenseCategory.edit);

module.exports = router;
