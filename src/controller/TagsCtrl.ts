import * as Koa from 'koa';
import TagsServ from '../service/TagsServ';
import Helper from '../utils/Helper';
import { logger } from '../utils/Logger';

export default {
    async getAllTags(ctx: Koa.ParameterizedContext){
        try {
            var resultList = await TagsServ.getAllTags();
            ctx.body = Helper.sendSuccesResponse('获取成功',resultList);
        } catch (error) {
            logger.error(error);
            ctx.body = Helper.sendErrorResponse('获取失败',error);
        }
        

    }
}