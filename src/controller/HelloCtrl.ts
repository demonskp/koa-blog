import * as Koa from 'koa';
import {
    logger
} from '../utils/Logger';
import {
    DB
} from '../utils/db';

export default {
    /**
     * say hello
     * @param ctx 上下文
     */
    async hello(ctx: Koa.ParameterizedContext) {
        let sqls = ['select * from article','select * from article_tag'];
        let params: any[] = [[],[]];
        try {
            let results = await DB.transaction(sqls,params);
            ctx.body = {a:results};
        } catch (error) {
            ctx.body = error;
        }
        
        
    },

    /**
     * 获取用户
     * @param ctx 上下文
     */
    async user(ctx: Koa.ParameterizedContext) {
        var session = ctx.session;
        ctx.body = session.username;
    }
};