const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, User, Notebook } = require('../../db/models');



const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notes = await Note.findAll();
  return res.json(notes);
}))

router.post('/notes', asyncHandler(async (_req, res) => {
  const {
    note,
    userId,
    private,
    noteBookId
  } = _req.body

  const user = User.findOne(id);
  const notebook = Notebook.findOne(id);

  const newNote = await Note.create({
    note,
    userId,
    private,
    noteBookId,
    user,
    notebook
  })

  res.redirect(`/notes/${newNote.id}`);
}))

module.exports = router;
