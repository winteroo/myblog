# 为vuepress搭建的网站添加无后台的评论功能

前些日子，利用业余时间搭建了自己的静态网站[进击的小超人](https://winteroo.github.io/myblog/)（即为此网站），
但是一直苦于网站是静态站点，无法看到别的小伙伴对我的网站的评价，但是今天，我发现了一款可以无后台的评论插件，于是，
如获珍宝般的赶紧添加进自己的网站，现在给大家介绍一个集成的方法。

## 基础知识

* 首先利用vuepress如何搭建网页这里就不多说了，如果没有接触过这方面的知识，建议移步[vuepress官网](https://www.vuepress.cn/)学习搭建网页的知识。

* [Valine - 一款快速、简洁且高效的无后端评论系统](https://valine.js.org/)，这里是我用到的主要评论功能的文档。

* [leanCloud](https://www.leancloud.cn/)，为valine提供云服务的云产品，我们需要按要求注册账号才可使用valine。（其中有需要支付宝实名认真的功能，开始还不是很放心，不过后来还是认证了）

* 想要在vuepress中集成该评论组件，我们还需要将其封装成vuepress可使用的插件才行，这里已经有大佬帮我们实现好了，地址[Vuepress-comment-plugin](https://www.npmjs.com/package/vuepress-plugin-comment)


## 集成过程

* 1、首先我们需要按照Valine的要求在LeanCloud上注册账户并创建项目。创建成功后会如下图所示:

![leanCloud1](~@Front/Vue/images/addcomment1.png)

* 2、在vuepress项目中安装插件[Vuepress-comment-plugin](https://www.npmjs.com/package/vuepress-plugin-comment)

* 3、在vuepress的config文件中配置插件，下面贴上我自己的配置，可以直接使用

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine',
        options: {
          el: '#valine-vuepress-comment',
          // lencloud上注册的appid和appkey
          appId: 'your app id',
          appKey: 'your app key',
          // 评论组件的placeholder
          placeholder: '发表你的感想...(添加网址可直接点击头像文字进入该地址哦)',
          // 分辨当前页面请求的评论内容
          path: '<%- frontmatter.to.path %>',
          // 评论用户头像
          avatar: 'robohash'
        }
      }
    ]
  ]
}

```

![addcomment2](~@Front/Vue/images/addcomment2.png)

::: warning 注意
封装的vuepress插件使用了vue-router，我们这里采用的是```path: '<%- frontmatter.to.path %>'```，类似于
```router.to.path```，所以可以理解为，我们要访问的界面的地址，而不是```window.location.href```，
我调试中发现，插件在路由跳转之前就去加载下一页的评论列表，所以会导致，用户点击下一页时，加载的依然是当前页的数据，
引发数据错乱。所以配置成即将跳转的路由路径便能实现查询下一的数据信息。
:::