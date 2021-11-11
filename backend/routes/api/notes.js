const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notes = await Note.findAll();
  return res.json(notes);
}))


module.exports = router;
