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
router.get("/:id/delete", (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, updateComment) => {
        res.redirect("/article/" + updateComment.articleId);

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
router.post("/:id", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findByIdAndUpdate(id, req.body, (err, updateComment) => {
        if (err) return next(err);
        res.redirect("/article/" + updateComment.articleId);
    });

});
module.exports = router;