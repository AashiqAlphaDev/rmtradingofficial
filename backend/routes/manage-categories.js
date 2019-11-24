const Router = require("express").Router
const router = Router();
const CategoryManagementService = require("../services/category");
const TopicManagementService = require("../services/topics");
const _ = require("underscore")

router.post("/", httpCoWrap(function* (req, res, next) {
	let category = yield CategoryManagementService.createCategory(req.body);
	res.send(category);
}));

router.post("/:category_id/topics", httpCoWrap(function*(req, res, next) {
	let topic = yield TopicManagementService.createTopic(req.body);
	yield CategoryManagementService.addTopic(req.params.category_id, topic._id);
	return res.send(topic)
}));

router.get("/:category_id/topics", httpCoWrap(function*(req, res, next) {
	let topics = yield CategoryManagementService.getTopics(req.params.category_id);
	return res.send(topics)
}));

router.get("/",httpCoWrap(function*(req, res, next) {

	if(req.query.info=="true"){
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10,
            populate:'topics'
        }
        let	categories = yield CategoryManagementService.getCategories(page)
        return res.send(categories)
	}
	else{
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10
        }
        let	categories = yield CategoryManagementService.getCategories(page)
        return res.send(categories)
	}


}));

router.delete("/:category_id/topics/:topic_id", httpCoWrap(function*(req, res, next) {
	yield CategoryManagementService.deleteTopic(req.params.category_id, req.params.topic_id)
}));


router.put("/:category_id", httpCoWrap(function* (req, res, next) {
    console.log("this is in the backend",req.params.category_id)
	let category = yield CategoryManagementService.updateCategory(req.params.category_id, req.body);
	res.send(category);
}));

router.delete("/:category_id", httpCoWrap(function* (req, res, next) {
    yield CategoryManagementService.deleteCategory(req.params.category_id);
    res.send({});
}));

router.delete("/", httpCoWrap(function* (req, res, next) {
    yield CategoryManagementService.deleteAll();
    res.send({});
}));


//Give access control to this ... delete dev clear

module.exports = router;