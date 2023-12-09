#!/bin/bash

###git push origin `git subtree split --prefix build_folder master`:gh-pages --force
git subtree push --prefix dist/spa origin gh-pages
