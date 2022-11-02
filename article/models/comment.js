const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Article", required: true }

}, {
    timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;