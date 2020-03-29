import {
    DB
} from "../utils/db";

import * as mysql from 'mysql';

export default {
    /**
     * 获取文章列表
     * @param id ID
     * @param type 类型
     * @param title 标题文本
     */
    async getArticleList(id: string = "", type: string = "", title: string = "") {
        if (!id && !type && !title) {
            throw new Error('查询条件不能为空');
        }
        let sql = ' select ID,WRITER,PRE_TEXT,TITLE,TYPE,DATE_TIME,READ_NUMBER,COMMENTS_NUMBER,W_FROM from article where 1=1 ';
        let params: String[] = [];
        if (id) {
            sql += ' and ID = ? ';
            params.push(id);
        }
        if (type) {
            sql += ' and TYPE = ? ';
            params.push(type);
        }
        if (title) {
            title = '%' + title + '%';
            sql += ' and TITLE like ?';
            params.push(title);
        }
        let result: any = await DB.query(sql, params);
        return result;
    },

    /**
     * 获取文章所有TAG
     * @param articleID 文章id
     */
    async getArticleTags(articleID: string) {
        let sql =
            `SELECT T.NAME,T.TYPE FROM article A
            LEFT JOIN article_tag AT ON A.ID = AT.ARTICLE_ID
            LEFT JOIN tag T ON AT.TAG_ID = T.ID
            WHERE A.ID = ?`;
        let parems = [articleID];
        let result: any = await DB.query(sql, parems);
        return result;
    },

    /**
     * 获取文章评论
     * @param articleID 文章id
     */
    async getArticleCommend(articleID: string) {
        let sql = "SELECT ID,USER,TYPE,COMMENT,PRE_COMMENT_ID,DATE_FORMAT(DATETIME,'%Y-%m-%d') AS DATETIME FROM comment WHERE ARTICLE_ID = ? ORDER BY PRE_COMMENT_ID,DEEP"
        let parems = [articleID];
        let result: any = await DB.query(sql, parems);
        return result;
    },

    /**
     * 根据标签获取文章列表
     * @param tagID 标签ID
     */
    async getArticleListFromTag(tagID: string) {
        let sql = `select ar.ID,ar.WRITER,ar.PRE_TEXT,ar.TITLE,ar.TYPE,ar.DATE_TIME,ar.READ_NUMBER,ar.COMMENTS_NUMBER,ar.W_FROM from article_tag art
        left join article ar on art.ARTICLE_ID = ar.ID
        where art.TAG_ID = ?`;
        let result: any = await DB.query(sql, [tagID]);
        return result;
    },

    /**
     * 搜索标题中包含某关键词的文章列表
     * @param searchStr 搜索的字符串
     */
    async searchArticle(searchStr: string) {
        let sql = `select ID,WRITER,PRE_TEXT,TITLE,TYPE,DATE_TIME,READ_NUMBER,COMMENTS_NUMBER,W_FROM from article where TITLE like '%?%'`
        let result: any = await DB.query(sql, [searchStr]);
        return result;
    },

    /**
     * 新增一条回复评论
     * @param articleId 文章id
     * @param preComment 回复评论的id
     * @param user 用户名
     * @param comment 回复内容
     * @param deep 回复排序
     */
    async addReplyComment(articleId: string, preComment: string, user: string, comment: string, deep: string) {
        let sql = "INSERT INTO comment(ARTICLE_ID,USER,COMMENT,PRE_COMMENT_ID,TYPE,DEEP,DATETIME) VALUES(?,?,?,?,?,?,NOW())";
        let params = [articleId, user, comment, preComment, "B", deep];
        let result: any = await DB.query(sql, params);
        return result;
    },
    /**
     * 获取回复评论ID的深度
     * @param {string} preComment 回复的评论ID
     */
    async getReplyDeep(preComment: string): Promise < Number > {
        let sql = "SELECT DEEP FROM comment WHERE PRE_COMMENT_ID = ? ORDER BY DEEP DESC";
        let param = [preComment];
        let result: any = await DB.query(sql, param);
        let deep = result[0].DEEP;
        let newDeep = Number(deep) + 1;
        return newDeep;
    },

    /**
     * 为文章添加评论
     * @param articleId 文章ID
     * @param user 用户名
     * @param comment 具体评论
     */
    async addComment(articleId: string, user: string, comment: string) {
        let insert = "INSERT INTO comment(ARTICLE_ID,USER,COMMENT,PRE_COMMENT_ID,TYPE,DEEP,DATETIME) VALUES(?,?,?,LAST_INSERT_ID()+1,?,?,NOW())";
        let params = [articleId, user, comment, "P", "0"];

        let result:any = await DB.query(insert,params);
        return result;
    }

}