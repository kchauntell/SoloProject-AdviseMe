const express = require('express');
const asyncHandler = require('express-async-handler');
const { Advice} = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const advice = await Advice.findAll();
  return res.json(advice);
}))

module.exports = router;
