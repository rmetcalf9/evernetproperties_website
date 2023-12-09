#!/bin/bash

##git subtree pull --prefix=dist/spa origin gh-pages (If change made upstream)

quasar build
git push origin `git subtree split --prefix dist/spa main`:gh-pages --force
git subtree push --prefix dist/spa origin gh-pages
