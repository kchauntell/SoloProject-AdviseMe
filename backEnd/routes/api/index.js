const router = require('express').Router();

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
