const Budget = require("../models/Budget");

// SET / UPDATE BUDGET
const setBudget = async (req, res) => {
  try {
    const { month, limit } = req.body;

    if (!month || !limit) {
      return res.status(400).json({ message: "Month and limit required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, month },
      { limit },
      { new: true, upsert: true }
    );

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CURRENT MONTH BUDGET
const getBudget = async (req, res) => {
  try {
    const { month } = req.query;

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
    });

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { setBudget, getBudget };
