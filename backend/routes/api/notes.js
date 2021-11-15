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

router.get('/:id(\\d+)', asyncHandler(async (_req, res) => {
  const note = await Note.findByPk(_req.params.id)
  console.log(note);
  return res.json(note)
}))

router.post('/', asyncHandler(async (_req, res) => {
  const {
    note,
    title,
    userId,
    hidden,
    noteBookId
  } = _req.body

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


//deleting note
// router.delete('/:id(\\d+)/delete')
module.exports = router;
