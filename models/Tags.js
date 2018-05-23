let base = require("./Base");
let ObjectId = base.ObjectId;

let TagSchema = new base.Schema({
  tagname: String,
  owner:ObjectId,//歌曲或用户id
  level:Number,
});

let TagModel = base.mongoose.model("TagModel", TagSchema, "tag");

exports.TagModel = TagModel;
