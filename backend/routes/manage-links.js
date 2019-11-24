var Router = require("express").Router
var router = Router();
const LinkManagementService = require("../services/link");



router.get("/",httpCoWrap(function*(req, res, next) {
    if(req.query.info=="true"){
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10,
        }
        let	links = yield LinkManagementService.links(page)
        return res.send(links)
    }
    else{
        let page={
            page:parseInt(req.query.page) || 1,
            limit:parseInt(req.query.limit) || 10
        }
        let	links = yield LinkManagementService.links(page)
        return res.send(links)
    }
}));

router.get("/:link_id",httpCoWrap(function*(req, res, next) {
        let	links = yield LinkManagementService.getLink(req.params.link_id)
        return res.send(links)
}));


router.get("/user/:user_id", httpCoWrap(function*(req, res, next) {
    let	links = yield LinkManagementService.linksOfUser(req.params.user_id)
    return res.send(links)
}))






router.post("/", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.createLink(req.body);
	res.send(link);
}));

router.put("/:link_id", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.updateLink(req.params.link_id,req.body);
	res.send(link);
}));

router.delete("/:link_id", httpCoWrap(function* (req, res, next) {
	yield LinkManagementService.deleteLink(req.params.link_id);
	res.send({});
}));

router.delete("/", httpCoWrap(function* (req, res, next) {
    yield LinkManagementService.deleteAll();
    res.send({});
}));

module.exports = router;