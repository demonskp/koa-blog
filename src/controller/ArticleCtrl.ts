import * as Koa from 'koa';
import Helper from '../utils/Helper';
import * as path from 'path';
export default {
    async getArticleHtml(ctx:Koa.ParameterizedContext){
        var mdPath = path.resolve(__dirname,'../mdDir/router.md');
        var mdHtml = Helper.randerMarkdown(mdPath);
        ctx.response.body = mdHtml;
    }
}