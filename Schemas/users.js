var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {type: Number},
    username: { type: String },                    //用户账号
    password: { type: String , default: '123456'},                        //密码
    userage: { type: Number ,default: '20' },                        //年龄
    logindate: { type: Date, default: new Date()}                       //最近登录时间
});

module.exports = mongoose.model('User', UserSchema)