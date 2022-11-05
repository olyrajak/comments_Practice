var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var article = require("../models/article");

router.get("/:id/edit", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findById(id, (err, comment) => {
        if (err) return next(err);
        console.log(comment);
        res.render("updateComment", { comment: comment });

    })

});
router.get("/:id/delete", (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, updateComment) => {
        if (err) return next(err);
        article.findByIdAndUpdate(updateComment.articleId, { $pull: { comments: updateComment.id } }, (err, article) => {
            if (err) return next(err);
            res.redirect("/articles/" + article.articleId);


        });

    })

});
router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findById(id, (err, comment) => {
        if (err) return next(err);
        console.log(comment);
        res.render("updateComment", { comment: comment });

    })

});
router.post("/:id", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Comment.findByIdAndUpdate(id, req.body, (err, updateComment) => {
        if (err) return next(err);
        res.redirect("/articles/" + updateComment.articleId);
    });

});
module.exports = router;