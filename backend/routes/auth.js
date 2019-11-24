var Router = require("express").Router
var router = Router();
var authService = require("../services/auth");
var createError = require('http-errors');

router.post("/login", httpCoWrap(function* (req, res, next) {
	let user = yield authService.authorize(req.body);
	console.log("this is the session",req.session);
	if(user){
		req.session.user = user;
		let toJSON = user.toJSON();
		delete toJSON.password
		res.send(toJSON);
	}
	else{
		next(createError(404, 'Unauthorized'));
	}
}));

router.post("/register", httpCoWrap(function* (req, res, next) {
	let user = yield authService.register(req.body);
	res.send(user);
}));


router.post("/request-reset", httpCoWrap(function* (req, res, next) {
    yield authService.raiseResetRequest(req.body.email);
    res.send({});
}));

router.post("/reset-password", httpCoWrap(function* (req, res, next) {
    yield authService.resetPassword(req.body.request_id, req.body.user_id, req.body.password);
    res.send({});
}));


module.exports = router;
