import {
    Context,
    Next
} from "koa";

// 设置
let option:VerifyOption;

/**
 * 验证中间件
 * @param verifyOption 验证设置
 */
function VerifyMid(verifyOption:VerifyOption) {
    option = verifyOption;
    return verifySession;
}

/**
 * 验证是否存在session，来确认登录
 * @param ctx Koa上下文
 * @param next Koa Next函数
 */
function verifySession(ctx: Context, next: Next) {
    if (ctx.URL.pathname !== option.loginRoute) {
        if (ctx.session[option.sessionName]) {
            next();
        } else {
            ctx.response.redirect(option.loginRoute);
        }
    } else {
        next();
    }
}

/**
 * 验证设置
 */
class VerifyOption {
    loginRoute:string;
    sessionName:string;
    constructor(loginRoute:string,sessionName:string){
        this.loginRoute = loginRoute;
        this.sessionName = sessionName;
    }
}

export default {
    VerifyMid,
    VerifyOption
};