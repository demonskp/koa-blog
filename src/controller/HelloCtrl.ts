import * as Koa from 'koa';
import {logger} from '../utils/Logger';

export default {
    /**
     * say hello
     * @param ctx 上下文
     */
    async hello(ctx:Koa.ParameterizedContext){
        ctx.body = 'sssssssssddaakkkdssssss';
        logger.warn('aaaaa');
        logger.info('------------------------------');
        logger.error('error============');
        logger.debug('ssssssssssssss');
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