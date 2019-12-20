import * as Koa from 'koa';
import Helper from '../utils/Helper';
export default {
    async login(ctx:Koa.ParameterizedContext){
        let {username,password} = ctx.request.query;
        if(username === "aa"){
            ctx.session.username = username;
            ctx.response.body = Helper.sendSuccesResponse('成功！',{});
        }else{
            ctx.response.body = Helper.sendErrorResponse('1','密码错误');
        }
    }
}