import { DB } from "../utils/db";

export default {
    /**
     * 获取文章列表
     * @param id ID
     * @param type 类型
     * @param title 标题文本
     */
    async getArticleList(id:string="",type:string="",title:string=""){
        if(!id&&!type&&!title){
            throw new Error('查询条件不能为空');
        }
        let sql = ' select ID,WRITER,PRE_TEXT,TITLE,TYPE,DATE_TIME,READ_NUMBER,COMMENTS_NUMBER,W_FROM from article where 1=1 ';
        let params: String[] = [];
        if(id){
            sql += ' and ID = ? ';
            params.push(id);
        }
        if(type){
            sql += ' and TYPE = ? ';
            params.push(type);
        }
        if(title){
            title = '%'+title+'%';
            sql += ' and TITLE like ?';
            params.push(title);
        }
        let result:any = await DB.query(sql,params);
        return result;
    },

    /**
     * 获取文章所有TAG
     * @param articleID 文章id
     */
    async getArticleTags(articleID:string) {
        let sql =
          `SELECT T.NAME,T.TYPE FROM article A
            LEFT JOIN article_tag AT ON A.ID = AT.ARTICLE_ID
            LEFT JOIN tag T ON AT.TAG_ID = T.ID
            WHERE A.ID = ?`;
        let parems = [articleID];
        let result:any = await DB.query(sql,parems);
        return result;
      },
    
      /**
       * 获取文章评论
       * @param articleID 文章id
       */
    async getArticleCommend(articleID:string){
        let sql = "SELECT ID,USER,TYPE,COMMENT,PRE_COMMENT_ID,DATE_FORMAT(DATETIME,'%Y-%m-%d') AS DATETIME FROM comment WHERE ARTICLE_ID = ? ORDER BY PRE_COMMENT_ID,DEEP"
        let parems = [articleID];
        let result:any = await DB.query(sql,parems);
        return result;
    },

    /**
     * 根据标签获取文章列表
     * @param tagID 标签ID
     */
    async getArticleListFromTag(tagID:string){
        let sql = `select ar.ID,ar.WRITER,ar.PRE_TEXT,ar.TITLE,ar.TYPE,ar.DATE_TIME,ar.READ_NUMBER,ar.COMMENTS_NUMBER,ar.W_FROM from article_tag art
        left join article ar on art.ARTICLE_ID = ar.ID
        where art.TAG_ID = ?`;
        let result:any = await DB.query(sql,[tagID]);
        return result;
    }

}

