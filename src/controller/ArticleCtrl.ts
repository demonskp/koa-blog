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
            let artList: Array<any> = await ArticleServ.getArticleList(artcleid);
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
            let result = commendList2tree(commendList);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            console.log(error);
            ctx.body = Helper.sendErrorResponse('获取文章评论失败', error);
        }
    },

    /**
     * 通过标签获取文章猎豹
     * @param ctx 上下文信息
     */
    async articleListFromTag(ctx: Koa.ParameterizedContext) {
        let id = ctx.request.query.TagID;// 标签ID
        try {
            if (!id) {
                throw "未输入该标签ID";
            }
            let result = await ArticleServ.getArticleListFromTag(id);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            console.log(error);
            ctx.body = Helper.sendErrorResponse('获取文章列表失败！', error);
        }
    },

    /**
     * 检索标题含有关键字文章列表
     * @param ctx
     */
    async searchArticle(ctx: Koa.ParameterizedContext) {
        let { search } = ctx.request.query;
        try {
            if (!search) {
                throw '搜索字符串不能为空';
            }
            let result = await ArticleServ.searchArticle(search);
            ctx.body = Helper.sendSuccesResponse('获取成功', result);
        } catch (error) {
            console.log(error);
            ctx.body = Helper.sendErrorResponse('检索文章列表失败！', error);
        }
    },

    /**
     * 为文章添加评论
     * @param ctx
     */
    async addComment(ctx: Koa.ParameterizedContext) {
        let { ID, type, preComment, user, comment } = ctx.request.query;
        let articleId = ID;

        if (!Helper.isParamsFull(ID, type)) {
            throw "参数不完整！";
        }
        let result;
        if (type === 'B') {
            // 当评论类型为回复
            let deep = await ArticleServ.getReplyDeep(articleId);
            result = await ArticleServ.addReplyComment(articleId, preComment, user, comment, deep + "");
            console.log(result);
        } else {
            result = await ArticleServ.addComment(articleId, user, comment);
        }

        ctx.body = Helper.sendSuccesResponse('获取成功', result);
    }
}


/**
 * 文章评论列表转化为树形结构
 * @param data 评论数据list
 */
function commendList2tree(data: Array<any>) {
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