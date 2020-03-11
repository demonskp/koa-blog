import Router = require("koa-router");
import HelloCtrl from '../controller/HelloCtrl';
import LoginCtrl from '../controller/LoginCtrl';
import ArticleCtrl from "../controller/ArticleCtrl";
import TagsCtrl from "../controller/TagsCtrl";

function loadRouter(router: Router) {
    // 路由
    router.get('/', HelloCtrl.hello);
    router.get('/user', HelloCtrl.user);
    router.get('/login', LoginCtrl.login);
    router.get('/back/article', ArticleCtrl.getArticleHtml);

    router.get('/hotTags', TagsCtrl.getAllTags);// 获取所有的Tags
    router.get('/listArticle', ArticleCtrl.listArticle);// 获取某一类型的文章列表
    router.get('/Article', ArticleCtrl.getArticleHtml);// 获取MarkDown文档
    router.get('/getArticleTags', ArticleCtrl.getArticleTags);// 获取文章所有标签
    router.get('/getCommend', ArticleCtrl.getArticleCommend);// 获取文章所有评论

    router.get('/ArticleByTag',ArticleCtrl.articleListFromTag);// 通过标签获取文章列表
}

export {
    loadRouter,
};