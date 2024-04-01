const express = require('express');
const ExpenseCategoryItem = require("../controllers/ExpenseCategoryItem")
const isAuthentic = require("../middleware/isAuthentic");
const isAdmin = require("../middleware/isAdmin");
const validateID = require("../middleware/validateID");

const router = express.Router();

router.get('/index', isAuthentic, ExpenseCategoryItem.index);
router.post('/store', isAuthentic, isAdmin, ExpenseCategoryItem.store);
router.post('/edit', isAuthentic, isAdmin, validateID, ExpenseCategoryItem.edit);
router.put('/update', isAuthentic, isAdmin, validateID, ExpenseCategoryItem.update);
router.delete('/delete', isAuthentic, isAdmin, validateID, ExpenseCategoryItem.delete);

module.exports = router;