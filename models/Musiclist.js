let base = require("./Base");
let ObjectId = base.ObjectId;

let MusiclistSchema = new base.Schema({
  name:String,
  user:ObjectId,//用户id
  music:ObjectId,//歌曲id
});

let MusiclistModel = base.mongoose.model("MusiclistModel", MusiclistSchema, "musiclist");

exports.MusiclistModel = MusiclistModel;
