import * as Koa from 'koa';

export default {
    /**
     * say hello
     * @param ctx 上下文
     */
    async hello(ctx:Koa.ParameterizedContext){
        ctx.body = 'sssssssssddaakkkdssssss';
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