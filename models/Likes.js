let base = require("./Base");
let ObjectId = base.ObjectId;

let CommentSchema = new base.Schema({
  user:ObjectId,//用户id
  Comment:ObjectId,//评论id
  time:Date,//点赞时间
});

let CommentModel = base.mongoose.model("CommentModel", CommentSchema, "comment");

exports.CommentModel = CommentModel;
