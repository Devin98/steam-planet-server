let base = require("./Base");
let ObjectId = base.ObjectId;

let CommentSchema = new base.Schema({
  userId:ObjectId,//用户id
  commentId:ObjectId,//评论id
  time:Date,//点赞时间
});

let CommentModel = base.mongoose.model("CommentModel", CommentSchema, "comment");

exports.CommentModel = CommentModel;
