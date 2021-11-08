const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;

  if(user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else res.json({});
});

//Validate Login
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

//Log-In
router.post('/', validateLogin, asyncHandler(async(req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if(!user) {
    const err = new Error(`Login Failed`);
    err.status = 401;
    err.title = 'Login Failed';
    err.errors = [`The provided credentials were invalid.`];
    return next(err);
  }

  setTokenCookie(res, user);
  return res.json({ user });
  }),
);

//Log-Out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});


module.exports = router;
