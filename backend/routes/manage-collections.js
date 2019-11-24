var Router = require("express").Router
var router = Router();
const CollectionManagementService = require("../services/collections");

router.post("/", httpCoWrap(function* (req, res, next) {
	let collection = yield CollectionManagementService.createCollection(req.body);
	res.send(collection);
}));

router.put("/:collection_id", httpCoWrap(function* (req, res, next) {
    console.log("this",req.params.collection_id);
	let collection = yield CollectionManagementService.updateCollection(req.params.collection_id,req.body);
	res.send(collection);
}));

router.delete("/:collection_id", httpCoWrap(function* (req, res, next) {
    yield CollectionManagementService.deleteCollection(req.params.collection_id);
    res.send({});
}));

router.get("/", httpCoWrap(function*(req, res, next) {
    let page={
        page:parseInt(req.query.page) || 1 ,
        limit:parseInt(req.query.limit) || 10,
    }
    let	topics = yield CollectionManagementService.collections(page)
    return res.send(topics)
}))


router.get("/:collection_id", httpCoWrap(function*(req, res, next) {
    let	collections = yield CollectionManagementService.collectionDetail(req.params.collection_id)
    return res.send(collections)
}))

router.get("/user/:user_id", httpCoWrap(function*(req, res, next) {
    let	topics = yield CollectionManagementService.collectionsOfUser(req.params.user_id)
    return res.send(topics)
}))

router.get("/admin", httpCoWrap(function*(req, res, next) {
    let	topics = yield CollectionManagementService.collectionsOfAdmin(req.params.user_id)
    return res.send(topics)
}))

router.delete("/", httpCoWrap(function* (req, res, next) {
    yield CollectionManagementService.deleteAll();
    res.send({});
}));


module.exports = router;