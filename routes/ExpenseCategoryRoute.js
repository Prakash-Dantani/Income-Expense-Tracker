const express = require("express");
const isAuthentic = require("../middleware/isAuthentic");
const isAdmin = require("../middleware/isAdmin");
const validateID = require("../middleware/validateID");
const ExpenseCategory = require("../controllers/ExpenseCategory");
const router = express.Router();


// only Admin and Login User can access this route
router.get('/index', isAuthentic, ExpenseCategory.index);
router.post('/store', isAuthentic, isAdmin, ExpenseCategory.store);
router.post('/edit/:id?', isAuthentic, isAdmin, validateID, ExpenseCategory.edit);
router.put('/update', isAuthentic, isAdmin, validateID, ExpenseCategory.update);
router.delete('/delete/:id?', isAuthentic, isAdmin, validateID, ExpenseCategory.delete);

module.exports = router;
