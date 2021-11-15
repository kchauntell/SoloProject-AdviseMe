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
  const userId = _req.user.id;
  const notebookId = _req.params.id;

  const {title, genre, hidden} = _req.body
  console.log(_req.body)

  const notebook = await Notebook.findByPk(notebookId);

  if(notebook && notebook.userId === userId) {
    notebook.title = req.body.title || notebook.title
    notebook.genre = req.body.genre || notebook.genre
    notebook.hidden = req.body.hidden || notebook.hidden

    await Notebook.save();
  }
  return res.json({notebook})
}))


//delete notebook
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (_req, res, next) => {
  const userId = _req.user.id;
  const notebookId = _req.params.id;

  const notebook = await Notebook.findByPk(notebookId);

  if (notebook && notebook.userId === userId) {
    // console.log(notebook, 'ppppppppppppppp');
    await notebook.destroy();
    res.json(notebook);
  } else {
    next(error)
  }
}))



router.post('/')
module.exports = router;
