var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");

router.get("/:id/edit", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findById(id, (err, comment) => {
        console.log(comment);
        res.render("updateComment", { comment: comment });

    })

});
router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findById(id, (err, comment) => {
        console.log(comment);
        res.render("updateComment", { comment: comment });

    })

});
router.post("/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    Comment.findByIdAndUpdate(id, (err, nextarticle) => {
        console.log(nextarticle);
        if (err) return next(err);
        res.redirect("/comments/" + id)
    });

});
module.exports = router;