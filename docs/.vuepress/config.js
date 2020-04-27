let menuConf = require('./menuConf');

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
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        nav: [{
            text: '首页',
            link: '/'
          },
          {
            text: '文章',
            link: '/guide/'
          },
        ],
        sidebar: {
          '/guide/': [{
              title: '初识',
              collapsable: true,
              children: ['/guide/']
            }, {
              title: 'Javascript',
              collapsable: true,
              children: getChildren(menuConf.JSChildren)
            }, {
              title: 'Vue',
              collapsable: true,
              children: getChildren(menuConf.vueChildren)
            }, {
              title: 'React',
              collapsable: true,
              children: getChildren(menuConf.reactChildren)
            },{
              title: 'Nodejs',
              collapsable: true,
              children: getChildren(menuConf.nodeChildren)
            }, {
              title: '算法',
              collapsable: true,
              children: getChildren(menuConf.algorithmChildren)
            }, {
              title: '生活',
              collapsable: true,
              children: getChildren(menuConf.lifeChildren)
            },
          ]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': './'
      }
    }
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links']
}

function getChildren (childrenList, type = '') {
  return childrenList.map(el => {
   return type + el; 
  })
}