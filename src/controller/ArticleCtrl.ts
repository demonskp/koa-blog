import * as Koa from 'koa';
import Helper from '../utils/Helper';
import * as path from 'path';
import ArticleServ from '../service/ArticleServ';
import { logger } from '../utils/Logger';
export default {
    async getArticleHtml(ctx: Koa.ParameterizedContext) {

        let {
            ID
        } = ctx.request.query;
        var artcleid = ID;
        try {
            if (!artcleid) {
                throw new Error('文章ID不能为空！');
            }
            let artList: Array < any > = await ArticleServ.getArticleList(artcleid);
            if (artList.length == 0) {
                throw new Error('未查询到任何数据');
            }
            var mdPath = path.resolve(__dirname, '../mdDir/' + artList[0].ID + '.md');
            var mdHtml = Helper.randerMarkdown(mdPath);
            var headNodeList = Helper.getHeadNodeList(mdHtml);
            ctx.response.body = Helper.sendSuccesResponse('获取成功', {
                html: mdHtml,
                headList: headNodeList
            });
        } catch (error) {
            ctx.response.body = Helper.sendErrorResponse('获取失败',error);
            console.log(error);
            logger.error(error);
        }

    },

    async listArticle(ctx: Koa.ParameterizedContext) {
        let type = ctx.request.query.type;
        try {
            if (!type) {
                throw new Error('请先输入类型！');
            }

            let result = await ArticleServ.getArticleList(null, type);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            ctx.body = Helper.sendErrorResponse('获取文章列表失败', error);
        }
    }

}