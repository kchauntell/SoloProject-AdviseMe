const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note, User }  = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const notebooks = await Notebook.findAll({ include: Note });
  return res.json(notebooks);
}))

router.get('/:id(\\d+)', asyncHandler(async (_req, res) => {
  const notes = await Notebook.findByPk(_req.params.id, { include: Note });
  return res.json(notes)
}));

router.post('/', asyncHandler(async (_req, res) => {
  const {
    title,
    userId,
    hidden,
    genre
  } = _req.body

  const newNotebook = await Notebook.create({
    title,
    userId,
    hidden,
    genre
  })
  console.log(newNotebook);
  res.json(newNotebook);
}))

// edit notebook

router.put('/:id(\\d+)', asyncHandler(async (_req, res, next) => {
  const notebook = await Notebook.findByPk(req.params.id);

  if(notebook) {
    notebook.title = req.body.title || notebook.title
    notebook.genre = req.body.genre || notebook.genre
    notebook.hidden = req.body.hidden || notebook.hidden

    await Notebook.save();
    return res.json({notebook})
  }
}))


//delete notebook
router.delete('/:id(\\d+)/delete', requireAuth, asyncHandler(async (_req, res, next) => {
  const userId = _req.user.id;
  const notebookId = _req.params.id;

  const notebook = await Note.findByPk(notebookId);

  if (note && notebook.userId === userId) {
    await notebook.destroy();
    return res.json({ message: `Note ${notebookId} is gone gone!` });
  } else {
    next(error)
  }
}))



router.post('/')
module.exports = router;
