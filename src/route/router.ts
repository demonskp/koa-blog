import Router = require("koa-router");
import HelloCtrl from '../controller/HelloCtrl';
import LoginCtrl from '../controller/LoginCtrl';

function loadRouter(router:Router){
    // 路由
    router.get('/', HelloCtrl.hello);
    router.get('/user', HelloCtrl.user);
    router.get('/login', LoginCtrl.login);
}

export default {
    loadRouter,
};

