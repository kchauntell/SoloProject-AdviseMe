const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, User, Notebook } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



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

//edit note
router.put('/:id(\\d+)', asyncHandler(async (_req, res, next) => {
  const note= await Note.findByPk(req.params.id);

  if (note) {
    note.title = req.body.title || note.title
    note.note = req.body.note || note.note
    note.hidden  = req.body.hidden || note.hidden

    await Note.save();
    return res.json({ note })
  }
}))

//deleting note
router.delete('/:id(\\d+)/delete', requireAuth, asyncHandler (async (_req, res, next) => {
  const userId = _req.user.id;
  const noteId = _req.params.id;

  const note = await Note.findByPk(noteId);

  if (note && note.userId === userId) {
    await note.destroy();
    return res.json({message: `Note ${noteId} is gone gone!`});
  } else {
    next(error)
  }
}))

module.exports = router;
