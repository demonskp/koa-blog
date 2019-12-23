import * as MarkdownIt from 'markdown-it';
import * as path from 'path';
import * as fs from 'fs';

const md = new MarkdownIt();

export default {
    /**
     * 获取错误消息
     * @param code 错误代码
     * @param msg 错误消息
     * @param err 错误详情
     */
    sendErrorResponse(code: string, msg: string, err ? : Error): Object {
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
    sendSuccesResponse(msg: string, result: any): Object {
        return {
            code: "0",
            msg,
            result
        }
    },
    /**
     * 渲染MD文档
     * @param mdPath md文件所在的绝对路径
     */
    randerMarkdown(mdPath:string): string {
        try {
            var mdStr = fs.readFileSync(mdPath).toString();
            var mdHtml = md.render(mdStr);
            return mdHtml;
        } catch (error) {
            throw new Error(`无法渲染${mdPath}处的文档！`);
        }
    }
}