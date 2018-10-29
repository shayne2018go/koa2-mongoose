// import { reject } from 'any-promise';

const Router = require('koa-router');
const Users = require('../Schemas/users');
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

module.exports = router;