var Router = require("express").Router;
var router = Router();
var elastic_search = require("../services/elastic_search");

router.post("/", httpCoWrap(function*(req, res, next) {
    let result = yield elastic_search.search(req.body);
    res.send(result)
}));

module.exports = router;