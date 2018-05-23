let base = require("./Base");
let ObjectId = base.ObjectId;

let MusicSchema = new base.Schema({
  name:String,
  author:String,
  url:String,
  time:Date,//歌曲长度
  album:String,//专辑名
  playTimes:Number,//播放次数
  likeTimes:Number,//喜欢次数
  unlikeTimes:Number,//不喜欢次数
  tagsid:ObjectId,//标签表id
});

let MusicModel = base.mongoose.model("MusicModel", MusicSchema, "music");

exports.MusicModel = MusicModel;
