var Router = require("express").Router
var router = Router({mergeParams: true});

router.use("/api/auth", require("./auth"));
router.use("/api/categories", require("./manage-categories"));
router.use("/api/topics", require("./manage-topics"));
router.use("/api/collections", require("./manage-collections"));
router.use("/api/links", require("./manage-links"));
router.use("/api/users", require("./manage-users"));
router.use("/api/social", require("./manage-social"));
router.use("/api/search", require("./search"));
router.use("/session-check", require("./session-check"));
router.use("/api/bookmarks", require("./manage-bookmarks"));


module.exports = router
