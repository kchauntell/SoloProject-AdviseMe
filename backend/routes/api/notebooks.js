const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook }  = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notebooks = await Notebook.findAll();
  return res.json(notebooks);
}))

module.exports = router;
