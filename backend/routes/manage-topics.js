var Router = require("express").Router
var router = Router({});
const TopicManagementService = require("../services/topics");

router.post("/", httpCoWrap(function* (req, res, next) {
	let topic = yield TopicManagementService.createTopic(req.body);
	res.send(topic);
}));

router.put("/:topic_id", httpCoWrap(function* (req, res, next) {
	let topic = yield TopicManagementService.updateTopic(req.params.topic_id,req.body);
	res.send(topic);
}));

router.delete("/:topic_id", httpCoWrap(function* (req, res, next) {

    console.log("in the backend",req.params.topic_id);
    yield TopicManagementService.deleteTopic(req.params.topic_id);
    res.send({});
}));

router.get("/", httpCoWrap(function*(req, res, next) {
    if(req.query.info=="true"){
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10,
            populate:['collections','links']
        }
        let	topics = yield TopicManagementService.topics(page)
        return res.send(topics)
    }
    else{
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10
        }
        let	topics = yield TopicManagementService.topics(page)
        return res.send(topics)
    }
}))


router.get("/trending", httpCoWrap(function*(req, res, next) {

        let	topics = yield TopicManagementService.trendingTopics(page)
        return res.send(topics)
}))
router.get("/latest", httpCoWrap(function*(req, res, next) {

    let	topics = yield TopicManagementService.latestTopics(page)
    return res.send(topics)
}))


router.get("/:topic_id", httpCoWrap(function*(req, res, next) {
        let	topics = yield TopicManagementService.fetchTopic(req.params.topic_id)
        return res.send(topics)
}))

router.delete("/", httpCoWrap(function* (req, res, next) {
    yield TopicManagementService.deleteAll();
    res.send({});
}));


module.exports = router;