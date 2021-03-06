let menuConf = require('./menuConf');
const path = require('path');
const { PassThrough } = require('stream');

module.exports = {
  title: '进击的小超人',
  description: 'JavaScript、Nodejs、Vue、React、Algorithm',
  base: '/myblog/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/home.jpg',
    smoothScroll: true,
    editLinks: true,
    searchMaxSuggestions: 10,
    locales: {
      '/': {
        label: '简体中文',
        lastUpdated: '上次更新',
        nav: [{
            text: '首页',
            link: '/'
          },
          {
            text: '前端',
            link: '/Front/'
          },
          {
            text: '后端',
            // link: '/Backend/',
            items: [{
                text: 'Nodejs',
                link: '/Backend/Nodejs/'
              },
              {
                text: 'Java',
                link: '/Backend/Java/'
              }
            ]
          },
          {
            text: '算法与数据结构',
            link: '/Algorithm/'
          },
          {
            text: '杂谈',
            link: '/Life/'
          },

          {
            text: '关于作者',
            link: '/About/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/winteroo',
            target: '_blank'
          }
        ],
        sidebar: {
          '/Front/': [{
            title: '概述',
            collapsable: true,
            children: ['/Front/']
          }, {
            title: 'JavaScript',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.JSChildren)
          }, {
            title: 'Vue',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.vueChildren)
          }, {
            title: 'React',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.reactChildren)
          }, {
            title: '设计模式',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.designPatternsMenu)
          }, {
            title: 'Css',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.cssMenu)
          }, {
            title: '计算机网络',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.netMenu)
          }],
          '/Algorithm/': [{
              title: '概述',
              collapsable: true,
              children: ['/Algorithm/']
            },
            {
              title: '数据结构',
              collapsable: true,
              children: getChildren('/Algorithm', menuConf.AlgorithmMenu.dataStructureMenu)
            },
            {
              title: '算法',
              collapsable: true,
              children: getChildren('/Algorithm', menuConf.AlgorithmMenu.algorithmChildren)
            },
          ],
          '/Backend/Nodejs': [{
              title: '概述',
              collapsable: true,
              children: ['/Backend/Nodejs/']
            },
            {
              title: 'NodeJs',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.nodejs.nodeChildren)
            },
            {
              title: 'Express',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.nodejs.expressChildren)
            },
            {
              title: 'Koa2',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.nodejs.koa2Children)
            }
          ],
          '/Backend/Java': [{
              title: '概述',
              collapsable: true,
              children: ['/Backend/Java/']
            },
            {
              title: 'Java',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.java.javaChildren)
            }
          ],
          '/About/': [{
            title: '关于作者',
            collapsable: true,
            children: ['/About/']
          }],
          '/Life/': [{
              title: '概述',
              collapsable: true,
              children: ['/Life/']
            },
            {
              title: '杂谈',
              collapsable: true,
              children: getChildren('', menuConf.LifeMenu.lifeChildren)
            }
          ]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@Front': path.join(__dirname, '..', 'Front'),
        '@About': path.join(__dirname, '..', 'About'),
        '@Algorithm': path.join(__dirname, '..', 'Algorithm'),
        '@Backend': path.join(__dirname, '..', 'Backend'),
        '@Life': path.join(__dirname, '..', 'Life')
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/active-header-links', true],
    ['@vuepress/last-updated', true],
    ['@vuepress/medium-zoom',
      {
        selector: '.theme-default-content :not(a) > img',
        options: {
          margin: 20,
          background: 'rgba(0, 0, 0, 0.7)',
          scrollOffset: 90
        }
      }
    ],
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine',
        options: {
          el: '#valine-vuepress-comment',
          appId: 'cpPdaCS4D4g9x7hYpeRiqzL8-gzGzoHsz',
          appKey: 'qA0YCWkV6C3oYgonyHxagfSL',
          placeholder: '发表你的感想...(添加网址可直接点击头像文字进入该地址哦)',
          visitor: true,
          path: '<%- frontmatter.to.path %>',
          avatar: 'robohash'
        }
      }
    ]
  ]
}

function getChildren(type = '', childrenList) {
  return childrenList.map(el => {
    return type + el;
  })
}