import * as Koa from 'koa';
import Helper from '../utils/Helper';
import * as path from 'path';
import ArticleServ from '../service/ArticleServ';
export default {
    async getArticleHtml(ctx:Koa.ParameterizedContext){

        let {artcleid} = ctx.request.query;
        if(!artcleid){
            throw new Error('文章ID不能为空！');
        }
        let artList = await ArticleServ.getArticleList(artcleid);
        console.log(artList);
        var mdPath = path.resolve(__dirname,'../mdDir/router.md');
        var mdHtml = Helper.randerMarkdown(mdPath);
        ctx.response.body = Helper.sendSuccesResponse('获取成功',{html:mdHtml});
    }
    
}