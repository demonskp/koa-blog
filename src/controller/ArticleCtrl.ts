import * as Koa from 'koa';
import Helper from '../utils/Helper';
import * as path from 'path';
import ArticleServ from '../service/ArticleServ';
import {
    logger
} from '../utils/Logger';
export default {
    /**
     * 获取文章内容
     * @param ctx 上下文
     */
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
            ctx.response.body = Helper.sendErrorResponse('获取失败', error);
            console.log(error);
            logger.error(error);
        }

    },

    /**
     * 分类型获取文章列表
     * @param ctx 上下文
     */
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
    },

    /**
     * 获取某个文章的所有tags
     * @param ctx 上下文
     */
    async getArticleTags(ctx: Koa.ParameterizedContext) {
        let id = ctx.request.query.ID;
        try {
            if (!id) {
                throw new Error('请先输入文章id！');
            }
            let result = await ArticleServ.getArticleTags(id);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            ctx.body = Helper.sendErrorResponse('获取文章列表失败', error);
        }
    },

    /**
     * 获取文章评论
     * @param ctx 上下文
     */
    async getArticleCommend(ctx: Koa.ParameterizedContext) {
        let id = ctx.request.query.ID;
        try {
            if (!id) {
                throw new Error('请先输入文章id！');
            }
            let commendList = await ArticleServ.getArticleCommend(id);
            console.log(commendList);
            // TODO 修改文章评论获取不了的问题
            let result = commendList2tree(commendList);
            console.log(result);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            console.log(error);
            ctx.body = Helper.sendErrorResponse('获取文章评论失败', error);
        }
    },
}


/**
 * 文章评论列表转化为树形结构
 * @param data 评论数据list
 */
function commendList2tree(data: Array < any > ) {
    let commendList = [];
    let backCommendList = [];
    //为空返回
    if (!data || data.length <= 0) {
        return data;
    }

    for (let i = 0; i < data.length; i++) {
        let commend = data[i];
        if (commend.TYPE === "P") {
            commendList.push(commend);
            backCommendList = [];
        } else {
            backCommendList.push(commend);
            commendList[commendList.length - 1].BACK_COMMENTS = backCommendList;
        }
    }

    return commendList
}