var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {type: Number},
    username: { type: String },                    //用户账号
    userpwd: { type: String , default: '123456'},                        //密码
    userage: { type: Number },                        //年龄
    logindate: { type: Date }                       //最近登录时间
});

module.exports = mongoose.model('User', UserSchema)