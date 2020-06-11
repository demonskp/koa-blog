import * as Koa from 'koa';
import Helper from '../utils/Helper';
import { MyContext } from '../interface/MyContext';
export default {
    async login(ctx: MyContext) {
        let { username, password } = ctx.request.query;
        if (username === "aa") {
            ctx.session.username = username;
            ctx.response.body = Helper.sendSuccesResponse('成功！', {});
        } else {
            ctx.response.body = Helper.sendErrorResponse('密码错误');
        }
    }
}