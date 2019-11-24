const Router = require("express").Router
const router = Router({});

router.post("/", httpCoWrap(function* (req, res, next) {
	req.session.user_id=10;
    if (!req.session.user_id) {
        res.status(401).send({});
        return;
    }
    else{
        res.status(200).send({});
    }

}));



module.exports = router;