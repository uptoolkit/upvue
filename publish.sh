#!/usr/bin/env sh

# abort on errors
set -e

# Push to repo
npm run build

# Remove unecessary build
rm -R dist/api
rm -R dist/img
rm dist/favicon.ico

# Publish to npm
npm version patch
npm publish

# Push to repository
git add -A
git commit -m 'feat: publish new release'
git push

# Publish the docs
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