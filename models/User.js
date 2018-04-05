let base = require("./Base");
let ObjectId = base.ObjectId;

let UserSchema = new base.Schema({
  name: String,
  email: String,
  pwd: String,
});

let UserModel = base.mongoose.model("UserModel", UserSchema, "user");

exports.UserModel = UserModel;
