const express = require('express');
const router = express.Router();

const { getTransactions, addTransaction, deleteTransaction, login } = require('../controllers/transactionController');

router.route('/users').get(login)
router.route('/').get(getTransactions).post(addTransaction);
router.route('/:id').delete(deleteTransaction);

module.exports = router;