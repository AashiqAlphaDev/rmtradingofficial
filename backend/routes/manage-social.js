const Router = require("express").Router
const router = Router({});
const UsersManagementService = require("../services/user");
const _ = require("underscore")

router.put("follow/:user_id", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.follow(req.params.user_id, req.body);
	res.send(user);
}));

router.put("unfollow/:user_id", httpCoWrap(function* (req, res, next) {
    let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
    res.send(user);
}));

router.get("/recentPostsFromFriends", httpCoWrap(function* (req, res, next) {
    let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
    res.send(user);
}));

router.get("/notifications", httpCoWrap(function* (req, res, next) {
    let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
    res.send(user);
}));







module.exports = router;