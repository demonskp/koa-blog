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
async function verifySession(ctx: Context, next: Next) {
    const url = ctx.request.url;
    const dirList = url.split('/');
    if (dirList[1] === option.startPath) {
        if (ctx.session[option.sessionName]) {
            ctx.isLogin = true;
            await next();
        } else {
            ctx.response.redirect(option.loginRoute);
        }
    } else {
        await next();
    }
}

/**
 * 验证设置
 */
class VerifyOption {
    loginRoute:string;
    sessionName:string;
    startPath:string;
    /**
     * 验证插件配置
     * @param loginRoute 登录路由
     * @param sessionName 会话名称
     * @param startPath 权限验证路由开头
     */
    constructor(loginRoute:string,sessionName:string,startPath:string){
        this.loginRoute = loginRoute;
        this.sessionName = sessionName;
        this.startPath = startPath;
    }
}

export default {
    VerifyMid,
    VerifyOption
};