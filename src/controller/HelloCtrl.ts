import * as Koa from 'koa';
import { userInfo } from 'os';

export default {
    /**
     * say hello
     * @param ctx 上下文
     */
    async hello(ctx:Koa.ParameterizedContext){
        ctx.body = 'sssssssssddaakkkdssssss';
        ctx.session.username = "张三";
        ctx.session.liwei = "liwei";
    },

    /**
     * 获取用户
     * @param ctx 上下文
     */
    async user(ctx:Koa.ParameterizedContext){
        var session = ctx.session;
        ctx.body = session.username;
    }
};