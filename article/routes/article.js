var express = require("express");
var router = express.Router();
var article = require("../models/article");
var Comment = require("../models/comment");


router.get("/new", function(req, res, next) {
    res.render("articleForm");
});
router.post("/", (req, res, next) => {
    article.create(req.body, (err, createdarticle) => {
        console.log(req.body);
        if (err) {
            return next(err);
        }
        res.redirect("article");
    });
});

router.get("/", (req, res) => {
    article.find({}, (err, article) => {
        console.log(err, article);
        if (err) return next(err);
        res.render("article", { articles: article });

    });

});

// router.get("/:id", (req, res, next) => {
//     var id = req.params.id;
//     article.findById(id, (err, article) => {
//         console.log(err, article);
//         if (err) return next(err);
//         Comment.find({ articleId: id }, (err, comment) => {
//             console.log(article, comment);
//             res.render("singlearticle", { article, comment });


//         })

//     });
// });

router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    article.findById(id).populate('comments').exec((err, result) => {
        if (err) return next(err);
        res.render("singlearticle", { result: result });

    });
});
router.get("/:id/edit", (req, res) => {
    var id = req.params.id;
    article.findById(id, (err, nextarticle) => {
        if (err) return next(err);
        res.render("editArticle", { article: nextarticle });

    })
});
router.get("/:id/delete", (req, res) => {
    var id = req.params.id;
    article.findByIdAndDelete(id, (err, nextarticle) => {
        if (err) return next(err);
        Comment.deleteMany({ articleId: nextarticle.id }, (err, updateData) => {
            res.redirect("/articles");

        })

    })
});
router.get("/:id/decrement", (req, res) => {
    var id = req.params.id;
    article.findByIdAndUpdate(
        id, { $inc: { likes: -1 } },
        (err, updatedArticle) => {
            if (err) return next(err);
            res.redirect("/articles/" + id);
        }
    );
});
router.get("/:id/increment", (req, res) => {
    var id = req.params.id;
    article.findByIdAndUpdate(
        id, { $inc: { likes: 1 } },
        (err, updatedArticle) => {
            if (err) return next(err);
            res.redirect("/articles/" + id);
        }
    );
});
router.post("/:id", (req, res) => {
    var id = req.params.id;
    article.findByIdAndUpdate(id, req.body, (err, nextarticle) => {
        if (err) return next(err);
        res.redirect("/articles/" + id)
    });

});
// article.find().sort({ insertedAt: 1 }).limit(10).exec((err, result) => {

// });
router.post("/:id/comments", (req, res, next) => {
    var id = req.params.id;

    req.body.articleId = id;
    Comment.create(req.body, (err, comment) => {
        console.log(err, comment);
        if (err) return next(err);
        article.findByIdAndUpdate(id, { $push: { comments: comment._id } }, (err, updateArticle) => {
            if (err) return next(err);
            res.redirect("/articles/" + id)


        })
    })
});

module.exports = router;