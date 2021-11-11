const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note, User }  = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notebooks = await Notebook.findAll({
    include: Note, User
  });
  return res.json(notebooks);
}))

router.get('/:id(\\d+)', asyncHandler(async (_req, res) => {
  const notes = await Notebook.findByPk(_req.params.id, { include: Note});
  return res.json(notes)
}));


module.exports = router;
