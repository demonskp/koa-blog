import { DB } from "../utils/db";

export default {
    /**
   * 获取所有的标签
   * @param {function} callback 
   */
   async getAllTags() {
    var sql = "SELECT NAME FROM tag";
    var resultList = await DB.query(sql);
    return resultList;
  },
}