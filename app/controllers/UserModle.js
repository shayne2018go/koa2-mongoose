const Users = require('../../Schemas/users');
const Index = require('./index');
//查找所有用户
exports.findAllUser = ()=>{
    return new Promise((resolve,reject)=>{
        Users.find({},(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}
//根据id查找用户
exports.findUserById = (id) =>{
    return new Promise((resolve,reject)=>{
        Users.findOne({_id: id},(err,doc)=>{
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}
// 根据用户名查找用户
exports.findUserByName = (obj) => {
    return new Promise((resolve, reject) => {
        Users.findOne({username: obj}, (err, doc) => {
            if (err) {
                reject(err)
            }else{
                if(doc){
                    resolve({
                        code: 0,
                        data: {
                            _id: doc._id,
                            username: doc.username
                        },
                        message: '用户已存在'
                    })
                }else{
                    resolve({
                        code: 1,
                        data: null,
                        message: '用户不存在'
                    })
                }
            }
            
        })
    })
}
//删除某个用户
exports.deletUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({ _id: id }, err => {
            if (err) {
                reject(err);
            }
            resolve({
                data: doc,
                message: '删除成功'
            });
        });
    });
}
// 添加用户
exports.addUser = (user) => {
    return new Promise((resolve,reject)=> {
        Index.addId(Users).then((res)=>{
            Users.create({
                _id: res,
                username: user.username,
                password: user.password,
                age: user.age,
                logindate: user.logindate
            },(err,doc)=> {
                if(err){
                    reject(err)
                }else{
                    resolve({
                        code: 0,
                        message: '注册成功',
                        data: {
                            _id: doc._id,                            
                            username:doc.username,
                        },
                    })
                }
            })
        })
    })
}