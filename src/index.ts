import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Session from 'koa-session';
import * as path from 'path';
import {
  accessLogger,
  logger
} from './utils/Logger';
import {config} from './config/index';

const app = new Koa();
const router = new Router();

import VerifyMid from './middleware/VerifyMid';

import {
  loadRouter
} from './route/router';
import ErrorDeal from './middleware/ErrorDeal';

// 设置Session中间件
app.keys = ["s2j21u.?2as21.asd;s"]; //密文
const CONFIG = {
  key: 'koa:sess',
  /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true,
  /** (boolean) automatically commit headers (default true) */
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false,
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(Session(CONFIG, app));

// 设置静态文件目录
app.use(Static(path.join(__dirname, './'+config.PublicPath)));

// 日志记录
app.use(accessLogger());

// 自定义中间件
// 验证登录
const verifyOption = new VerifyMid.VerifyOption('/login', 'username', 'back');
app.use(VerifyMid.VerifyMid(verifyOption));
// 错误处理
app.use(ErrorDeal.ErrorDeal());

// 导入路由
loadRouter(router);

app.use(router.routes());

app.on('error', (err, ctx) =>{
  logger.error("兜底：",err);
	console.error(err);
})

app.listen(3000, () => {
  console.log('请访问:' + 'http://localhost:3000/');
});