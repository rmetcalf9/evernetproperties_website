#!/bin/bash

###git push origin `git subtree split --prefix build_folder master`:gh-pages --force
##git subtree pull --prefix=dist/spa origin gh-pages (If change made upstream)

quasar build
git subtree push --prefix dist/spa origin gh-pages
