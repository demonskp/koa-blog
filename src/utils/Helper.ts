export default {
    /**
     * 获取错误消息
     * @param code 错误代码
     * @param msg 错误消息
     * @param err 错误详情
     */
    sendErrorResponse(code:string,msg:string,err?:Error):Object{
        return {
            code,
            msg,
            err,
        }
    },

    /**
     * 获取成功消息
     * @param msg 返回消息
     * @param result 返回结果
     */
    sendSuccesResponse(msg:string,result:any):Object{
        return {
            code:"0",
            msg,
            result
        }
    }
}