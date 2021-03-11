var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/insert', function (req, res, next) {});

router.get('/login', function (req, res, next) {});

router.get('/logout', function (req, res, next) {});

router.put('/{username}', function (req, res, next) {});
module.exports = router;
