# koa2-mongodb学习笔记

## 一、koa2

### 1. 安装

koa 依赖node V7.6.0及以上版本， 首先确认node版本在7.6.0以上，版本低的请自行搞定。
> npm init   // 初始化package.json
>
> npm i --save-dev koa2 koa-router koa-bodyparser koa-compose koa-cors koa-session koa-static mongoose glob //安装依赖

* [koa2](http://example.net/) 框架
* [koa-router](https://www.npmjs.com/package/koa-router) 路由
* [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) 解析请求中的body内容
* [koa-compose](https://www.npmjs.com/package/koa-compose) 合并中间件
* [koa-cors](https://www.npmjs.com/package/koa-cors) 跨域处理
* [koa-session](https://www.npmjs.com/package/koa-session) 缓存
* [koa-static](https://www.npmjs.com/package/koa-static) 静态文件处理
* [mongoose](https://www.npmjs.com/package/mongoose) mongodb
* [glob](https://www.npmjs.com/package/glob) 批量处理文件

### *app.js*

```js
const Koa = require('koa2');
const app = new Koa();
const cors = require('koa-cors');//
const registerRouter = require('./routers/routers');
const Index = require('./app/controllers/index');
const User = require('./Schemas/users.js');


app.use(cors())//跨域处理
app.use(registerRouter());//路由处理

/**
 * 调用Index.insert()函数，填充模拟数据
 * 
 * */
let users = [];
for (var i = 1; i < 20; i++) {
    users.push({
        _id: i,
        username: 'owner'+i,
        userpwd: '123456',
        userage: 20,
        logindate: new Date()
    })
}
Index.insert(User,users);


app.listen(3000);//服务端口


```

### *routers/api.js*

```js

const Router = require('koa-router');
const Users = require('../Schemas/users');
const router = new Router({
    prefix: '/api'//路由前缀
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
            })//查询数据
    }).then((res)=>{
        ctx.body = {
            code: 0,
            message: 'success',
            data: res
        }
    });
});

module.exports = router;
```

### *routers/web.js*

```js
const Router = require('koa-router');
const router = new Router();
const Index = require('../app/controllers/index.js')

router.get('/',Index.IndexController);//加载Index.IndexController()函数

module.exports = router;
```

### **routers/routers.js 合并路由**

```js
const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => (value.indexOf('routers.js') === -1))
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)//将合并后的路由返回
}

module.exports = registerRouter
```

## 二、mongodb数据库

### 1、安装

> 官网[下载]()