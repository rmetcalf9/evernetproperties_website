#!/bin/bash

##git subtree pull --prefix=dist/spa origin gh-pages (If change made upstream)

quasar build -m pwa
echo "evernetproperties.com" > dist/pwa/CNAME
cp -r ./redirects/* ./dist/pwa
git add --all
git commit -m"New website version"
git push
git push origin `git subtree split --prefix dist/pwa main`:gh-pages --force
git subtree push --prefix dist/pwa origin gh-pages
