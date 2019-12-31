import { Context, Next } from "koa";
import Helper from "../utils/Helper";


function ErrorDeal(){
    return deal;
}

/**
 * 处理抛出的错误
 * @param ctx 上下文
 * @param next 下一函数
 */
async function deal(ctx:Context,next:Next){
    try {
        await next();
    } catch (error) {
        ctx.body = Helper.sendErrorResponse(error.message,error);
    }
} 

export default {ErrorDeal};