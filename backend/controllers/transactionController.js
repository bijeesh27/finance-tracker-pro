const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const { startDate, endDate } = req.query;
    let query = {};

    if (startDate && endDate && startDate !== "null" && endDate !== "null") {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          error: "Invalid date format provided",
        });
      }

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    const allTransactions = await Transaction.find(query);

    const amounts = allTransactions.map((transaction) => transaction.amount);

    const totalBalance = amounts.reduce((acc, item) => (acc += item), 0);
    const totalIncome = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const totalExpense =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;

    // Category-wise spending for the chart (All filtered transactions)
    const spendingByCategory = allTransactions.reduce((acc, curr) => {
      if (curr.amount < 0) {
        if (!acc[curr.category]) acc[curr.category] = 0;
        acc[curr.category] += Math.abs(curr.amount);
      }
      return acc;
    }, {});

    const pagination = {};

    if (startIndex + transactions.length < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    return res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      pagination,
      currentPage: page,
      summary: {
        totalBalance: totalBalance.toFixed(2),
        totalIncome: totalIncome.toFixed(2),
        totalExpense: totalExpense.toFixed(2),
        spendingByCategory,
      },
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Public
exports.updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (error) {}
};
