let base = require("./Base");
let ObjectId = base.ObjectId;

let CommentSchema = new base.Schema({
  userId:ObjectId,//作者用户id
  cnotent:String,
  topicId:ObjectId,//话题id
  time:Date,//评论时间
});

let CommentModel = base.mongoose.model("CommentModel", CommentSchema, "comment");

exports.CommentModel = CommentModel;
