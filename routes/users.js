var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/google', function(req, res, next) {
  res.send('logging in with google');
});

module.exports = router;
