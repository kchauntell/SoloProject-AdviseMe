const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, User, Notebook } = require('../../db/models');



const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notes = await Note.findAll();
  console.log(_req.body)
  // console.log(notes.id);
  return res.json(notes);
}));

router.post('/', asyncHandler(async (_req, res) => {
  const {
    note,
    title,
    userId,
    hidden,
    noteBookId
  } = _req.body

  console.log('*****************************')
  console.log(_req.body)
  console.log('*****************************')

  const newNote = await Note.create({
    note,
    title,
    userId,
    hidden,
    noteBookId
  })
  console.log(newNote);
  res.json(newNote);
}))

module.exports = router;
