let base = require("./Base");
let ObjectId = base.ObjectId;

let UserSchema = new base.Schema({
  name: String,
  email: String,
  pwd: String,
  userType:Number,//
  username:String,
  mobile:String,
  headPortrait:String,//头像url
  message:String,//个人信息
  sex:Number,
  address:String,//地区
  birthday:Date,
  lastloginTime:Date,//上次登录时间
  tagsid:ObjectId,//标签关系表
});

let UserModel = base.mongoose.model("UserModel", UserSchema, "user");

exports.UserModel = UserModel;
