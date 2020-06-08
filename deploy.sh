#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 提交更改
git add -A

git commit -m 'update'

git push -f "https://github.com/winteroo/myblog.git" master


# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f "https://github.com/winteroo/myblog.git" master:gh-pages

cd -
