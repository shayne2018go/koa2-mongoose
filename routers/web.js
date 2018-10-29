const Router = require('koa-router');
const router = new Router();
const Index = require('../app/controllers/index.js')

router.get('/',Index.IndexController);

module.exports = router;