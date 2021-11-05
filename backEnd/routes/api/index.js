const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');

const { User } = require('../../db/models');
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      username: 'DemUs'
    },
  })
  setTokenCookie(res, user);
  return res.json({ user })
}));

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if(user) { res.json({ user: user.toSafeObject()}) }
    res.json({})
  }
);


// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
const { route } = require('./session.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;


/* Used Fetch request in Console DevTools to check api route
fetch('/api/test', {
  method: "POST",
    headers: {
    "Content-Type": "application/json",
        "XSRF-TOKEN" : "kb57E1W5-Pq9Knt9h5a1wFw9o7jpwZ6TkGYk"
  },
    body: JSON.stringify({ hello: 'world'})
}).then(res => res.json()).then(data => console.log(data));
 */
