let base = require("./Base");
let ObjectId = base.ObjectId;

let CommentSchema = new base.Schema({
  cnotent:String,
  time:Date,//话题时间
});

let CommentModel = base.mongoose.model("CommentModel", CommentSchema, "comment");

exports.CommentModel = CommentModel;
