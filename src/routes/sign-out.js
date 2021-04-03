const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  req.currentUser.set('token', null);
  res.send({});
});

module.exports = router;
