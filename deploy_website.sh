#!/bin/bash

##git subtree pull --prefix=dist/spa origin gh-pages (If change made upstream)

quasar build
echo "evernetproperties.com" > dist/spa/CNAME
git add --all
git commit -m"New website version"
git push
git push origin `git subtree split --prefix dist/spa main`:gh-pages --force
git subtree push --prefix dist/spa origin gh-pages
