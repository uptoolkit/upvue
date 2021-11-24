#!/usr/bin/env sh

# bash publish.sh version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
# https://docs.npmjs.com/cli/v7/commands/npm-version
VERSION=${1:-patch}
MESSAGE=${2:-"publish new release"}

if [ $VERSION = "major" ]
then
  TYPE="BREAKING CHANGE"
elif [ $VERSION = "minor" ]
then
  TYPE="feat"
else
  TYPE="fix"
fi

# abort on errors
set -e

# Build types
yarn run types

# Push to repo
vite build

# Push to repository
git add -A && git commit -m "${TYPE}: ${MESSAGE}" && git push

# Publish the docs
bash docs.sh

# Publish to npm
npm version $VERSION && npm publish
