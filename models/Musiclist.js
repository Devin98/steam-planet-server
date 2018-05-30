let base = require("./Base");
let ObjectId = base.ObjectId;

let MusiclistSchema = new base.Schema({
  name:String,
  userId:ObjectId,//用户id
  musicId:ObjectId,//歌曲id
});

let MusiclistModel = base.mongoose.model("MusiclistModel", MusiclistSchema, "musiclist");

exports.MusiclistModel = MusiclistModel;
