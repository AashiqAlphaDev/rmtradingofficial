const Router = require("express").Router
const router = Router({});
const UsersManagementService = require("../services/user");
const _ = require("underscore")

router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	let users = yield UsersManagementService.users(query);
	_.each(users.docs,function(item){
	item.password=undefined
	})
	res.send(users)
}));

router.get("/:user_id", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userWithId(req.params.user_id);
	user.password=undefined;
	res.send(user);
}));

router.post("/", httpCoWrap(function* (req, res, next) {

	let user = yield UsersManagementService.createUser(req.body);
	res.send(user);
}));

router.put("/:user_id", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
	res.send(user);
}));


module.exports = router;