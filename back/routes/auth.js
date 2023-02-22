var express = require('express');
var router = express.Router();

const pass = "asdf";

router.post('/', function(req, res, next) {
	var authorized = req.body.pass===pass;

	res.send(authorized);
});



module.exports = router;
