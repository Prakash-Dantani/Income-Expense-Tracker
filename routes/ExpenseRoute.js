const express = require("express");
const isAuthentic = require("../middleware/isAuthentic");
const isAdmin = require("../middleware/isAdmin");
const ExpenseController = require("../controllers/ExpenseController");

const router = express.Router();

router.get('/index', isAuthentic, ExpenseController.index)
router.post('/store', isAuthentic, ExpenseController.store)
router.post('/edit', isAuthentic, ExpenseController.edit)
router.delete('/delete', isAuthentic, ExpenseController.delete)

module.exports = router;