module.exports = {
  title: '进击的小超人',
  description: '用于记录前端技术、算法、数据结构',
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
  themeConfig: {
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
              children: ['/guide/JS/cc.md']
            }, {
              title: 'Vue',
              collapsable: true,
              children: ['/guide/Vue/01.md']
            }, {
              title: 'React',
              collapsable: true,
              children: ['/guide/React/01.md']
            },{
              title: 'Nodejs',
              collapsable: true,
              children: ['/guide/Nodejs/01.md']
            }, {
              title: '算法',
              collapsable: true,
              children: ['/guide/Algorithm/01.md']
            }, {
              title: '生活',
              collapsable: true,
              children: ['/guide/Life/01.md']
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
  }
}