let menuConf = require('./menuConf');
const path = require('path')

module.exports = {
  title: '进击的小超人',
  description: 'Javascript、Nodejs、Vue、React、Algorithm',
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
    editLinkText: '帮助我改善此页面',
    lastUpdated: '最后更新',
    locales: {
      '/': {
        editLinks: true,
        editLinkText: '帮助我改善此页面',
        lastUpdated: '最后更新',
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
            link: '/Backend/'
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
            link: 'https://github.com/winteroo/myblog',
            target: '_blank'
          }
        ],
        sidebar: {
          '/Front/': [{
            title: '概述',
            collapsable: true,
            children: ['/Front/']
          }, {
            title: 'Javascript',
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
            title: 'css',
            collapsable: true,
            children: getChildren('/Front', menuConf.FrontMenu.cssMenu)
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
          '/Backend/': [{
              title: '概述',
              collapsable: true,
              children: ['/Backend/']
            },
            {
              title: 'Nodejs',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.nodeChildren)
            },
            {
              title: 'Express',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.expressChildren)
            },
            {
              title: 'Koa2',
              collapsable: true,
              children: getChildren('/Backend', menuConf.BackendMenu.koa2Children)
            },
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
  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links']
}

function getChildren(type = '', childrenList) {
  return childrenList.map(el => {
    return type + el;
  })
}