/* eslint-disable consistent-return */

const express = require('express');
const Budget = require('../models/budget');
const handleError = require('../utils/handleError');

// helpers

async function getTestMiddleware(req, res, next) {
  return handleError(res, async () => {
    const test = await Budget.findById(req.params.id);
    if (test == null) {
      return res.status(404).json(`Id ${req.params.id} is not found`);
    }

    res.test = test;
    next();
  });
}

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  handleError(res, async () => {
    const rows = await Budget.find();
    res.json(rows);
  });
});

router.get('/:id', getTestMiddleware, (req, res) => {
  res.json(res.test);
});

// CREATE
router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'invalid name' });
  }
  if (!req.body.amount) {
    return res.status(400).json({ message: 'invalid amount' });
  }

  const budget = new Budget({
    name: req.body.name,
    amount: req.body.amount,
  });

  try {
    const newRow = await budget.save();
    return res.status(201).json(newRow);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.patch('/:id', getTestMiddleware, async (req, res) => {
  handleError(res, async () => {
    if (req.body.name) {
      res.test.name = req.body.name;
    }

    const updated = await res.test.save();
    return res.json(updated);
  });
});

// DELETE
router.delete('/:id', getTestMiddleware, async (req, res) => {
  handleError(res, async () => {
    const original = res.test;
    await original.remove();

    return res.status(200).json(`deleted id ${req.params.id}`);
  });
});

module.exports = router;
