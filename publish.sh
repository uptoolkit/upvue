#!/usr/bin/env sh

# abort on errors
set -e

# Push to repo
vite build

# Remove public assets

rm -R dist/api
rm -R dist/img
rm -R dist/favicon.ico

# Publish to npm
npm version patch
npm publish

# Push to repository
git add .
git status
git commit -m 'feat: publish new release'
git push

# Publish the docs
bash docs.sh