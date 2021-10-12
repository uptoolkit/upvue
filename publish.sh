#!/usr/bin/env sh

# abort on errors
set -e

cd docs

# build
npm run docs:build

# navigate into the build output directory
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:uptoolkit/upvue.git master:gh-pages

cd -