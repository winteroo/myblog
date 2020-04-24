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
            text: '文章列表',
            link: '/guide/'
          },
        ],
        sidebar: {
          '/guide/': [{
              title: '技术文章',
              collapsable: true,
              children: ['/guide/', '/guide/test/a.md']
            },
            {
              title: '算法进阶',
              collapsable: true,
              children: ['/guide/test/b.md']
            }
          ]
        }
      }
    }
  }
}