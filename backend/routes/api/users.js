const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('express');

const router = express.Router();

//Sign-Up Validations
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

router.get('/', asyncHandler(async (_req, res) => {
  const user = await User.findAll();
  return res.json(user);
}))

router.get('/:id(\\d+)', asyncHandler( async (_req, res) => {
  const userNotebooks = await User.findByPk(_req.params.id, {include: Notebook})
  return res.json(userNotebooks)
}))

//Sign-Up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({ user });
  }),
);


module.exports = router;
