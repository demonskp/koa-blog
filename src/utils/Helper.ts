import * as MarkdownIt from 'markdown-it';
import * as path from 'path';
import * as fs from 'fs';

const md = new MarkdownIt();

 class Helper {
    /**
     * 获取错误消息
     * @param msg 错误消息
     * @param err 错误详情
     */
    sendErrorResponse(msg: string, err ? : Error): Object {
        return {
            'flag': 'E',
            'msg': msg,
            'err': err,
            'result': ''
        }
    }

    /**
     * 获取成功消息
     * @param msg 返回消息
     * @param result 返回结果
     */
    sendSuccesResponse(msg: string, result: any): Object {
        return {
            'flag': 'T',
            'msg': msg,
            'err': '',
            'result': result
        }
    }
    /**
     * 渲染MD文档
     * @param mdPath md文件所在的绝对路径
     */
    randerMarkdown(mdPath: string): string {
        try {
            var mdStr = fs.readFileSync(mdPath).toString();
            var mdHtml = md.render(mdStr);
            return mdHtml;
        } catch (error) {
            throw new Error(`无法渲染${mdPath}处的文档！`);
        }
    }
    /**
     *获取一段文本当中的所有标题列表
     *
     * @param {string} content文本内容
     * @returns 返回所有标题标签内容
     */
    getHeadArray(content: string) {
        //全局匹配所有的标题标签
        // var headRxg = new RegExp("(\\n)*<(H|h)[1-9] *id *= *\"(.*)\">(.*)</(H|h)[1-9]>", "g");
        var headRxg = new RegExp("(\\n)*<(H|h)[1-9](.*)>(.*)</(H|h)[1-9]>", "g");
        var resultList = content.match(headRxg);
        return resultList;
    }

    /**
     *获取一个标题标签的级别，id，和内容
     *
     * @param {string} headText标题标签文字
     * @returns 对象如{ lv: '1', id: 'webpack学习笔记', name: 'webpack学习笔记' }
     */
    getHeadNode(headText: string) {
        //匹配head标签的级别，是h1或h2
        var lvRxg = new RegExp("<(H|h)(.*)>");
        //匹配head标签的第一个属性""之中的东西
        var idRxg = new RegExp(">.*<", "i");
        //匹配head标签的名字
        var nameRxg = new RegExp(">(.*)<", "i");
        var result = {
            lv: "",
            id: "",
            name: ""
        };
        // TODO 修改获取Node节点的犯法

        // console.log(headText);
        // console.log(headText.match(lvRxg));
        // console.log(headText.match(idRxg));
        // console.log(headText.match(nameRxg));

        result.lv = headText.match(lvRxg)[2];
        result.id = headText.match(idRxg)[1];
        result.name = headText.match(nameRxg)[1];
        return result;
    }
    /**
   *将一段文本中的标题全部提取成对象数组
   *
   * @param {string} content文本
   * @returns标题对象数组
   */
  getHeadNodeList(content:string) {
    var result = [];
    var headArray = this.getHeadArray(content);
    for (var i = 0; i < headArray.length; i++) {
      var node = this.getHeadNode(headArray[i]);
      result.push(node);
    }
    return result;
  }
}

export default new Helper();