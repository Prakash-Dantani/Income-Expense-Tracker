const express = require('express');
const ExpenseCategoryItem = require("../controllers/ExpenseCategoryItem")
const isAuthentic = require("../middleware/isAuthentic");
const isAdmin = require("../middleware/isAdmin");
const validateID = require("../middleware/validateID");

const router = express.Router();

router.get('/index', isAuthentic, isAdmin, ExpenseCategoryItem.index);
router.post('/store', isAuthentic, isAdmin, ExpenseCategoryItem.store);

module.exports = router;