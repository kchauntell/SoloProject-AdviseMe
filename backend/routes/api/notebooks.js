const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note }  = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notebooks = await Notebook.findAll({
    include: Note
  });
  return res.json(notebooks);
}))

module.exports = router;
