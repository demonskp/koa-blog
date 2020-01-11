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

}

