// import { reject } from 'any-promise';

const Router = require('koa-router');
const Users = require('../Schemas/users');
const Index = require('../app/controllers/index');
const UserModel = require('../app/controllers/UserModle');
const router = new Router({
    prefix: '/api'
});

router.get('/', async (ctx ,next)=>{
    await new Promise((resolve,reject)=>{
        Users
            .find()
            .where('_id').gt(2).lt(18)
            .limit(10)
            .exec(async (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
    }).then((res)=>{
        ctx.body = {
            code: 1,
            message: 'fail',
            data: res
        }
    });
});
router.post('/register', async (ctx, next) =>{
    let reqdata = ctx.request.body;
    let hasUser = await UserModel.findUserByName(reqdata.username);
    if (hasUser.code === 0){
        ctx.body = hasUser;
    }else{
        let user = {
            username: reqdata.username,
            password: reqdata.password,
        }
        let result = await UserModel.addUser(user);
        ctx.body = result;
    }
    // await new Promise((resolve,reject)=>{
    //     Users.findOne({
    //         username: reqdata.username
    //     }, (err, doc) => {
    //         if (err) {
    //             reject(err)
    //         } else {
    //             resolve(doc)
    //         }
    //     })
    // }).then((res)=>{
    //     return new Promise((resolve,reject)=>{
    //         if (res) {
    //             resolve({
    //                 code: '1',
    //                 message: '用户已注册',
    //                 data: null
    //             });
    //         } else {
    //             let id = null
    //             Index.addId(Users).then((res) => {
    //                 id = res;
    //                 Users.create({
    //                     _id: id,
    //                     username: reqdata.username,
    //                     password: reqdata.password,
    //                     logindate: new Date()
    //                 }, (err, doc) => {
    //                     if (err) {
    //                         reject({
    //                             code: '1',
    //                             message: '注册失败',
    //                             data: null
    //                         })
    //                     } else {
    //                         resolve({
    //                             code: '0',
    //                             message: '注册成功',
    //                             data: {
    //                                 _id: doc._id,
    //                                 username: doc.username
    //                             }
    //                         })
    //                     }
    //                 })
    //             })
    //         }
    //     })        
        
    // }).then((res)=>{
    //     ctx.body = res;
    // })
    
})

module.exports = router;