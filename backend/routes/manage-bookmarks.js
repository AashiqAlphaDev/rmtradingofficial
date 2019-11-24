var Router = require("express").Router
var router = Router();
const BookmarkManagementService = require("../services/bookmarks");

router.post("/", httpCoWrap(function* (req, res, next) {

    let userId = "5bc720c69a4df300125221c2";
    var newBookmark={}

    if(req.body.type=="link"){
        let newBookMark = yield BookmarkManagementService.addBookmarkLink(req.body.data,userId);
        res.send(newBookMark)
    }
    if(req.body.type=="collection"){
        let newBookMark = yield BookmarkManagementService.addBookmarkCollection(req.body.data,userId);
        res.send(newBookMark)
    }
}));


router.delete("/", httpCoWrap(function* (req, res, next) {
    yield BookmarkManagementService.deleteAll();
    res.send({});
}));


router.get("/:user_id", httpCoWrap(function* (req, res, next) {
    let userBookmarks = yield BookmarkManagementService.userBookMarks(req.params.user_id);
    res.send(userBookmarks);
}));

router.get("/", httpCoWrap(function* (req, res, next) {
    let userBookmarks = yield BookmarkManagementService.bookMarks();
    res.send(userBookmarks);
}));


module.exports = router;