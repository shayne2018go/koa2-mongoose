const Koa = require('koa2');
const app = new Koa();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const registerRouter = require('./routers/routers');
const Index = require('./app/controllers/index');
const User = require('./Schemas/users.js');

app.use(cors())
app.use(bodyParser());

app.use(registerRouter());

let users = [];
for (var i = 1; i < 20; i++) {
    users.push({
        _id: i,
        username: 'owner'+i,                 
        password: '123456',                            
        userage: 20,                                
        logindate: new Date()                      
    })
}
Index.insert(User,users);

    

app.listen(3000);