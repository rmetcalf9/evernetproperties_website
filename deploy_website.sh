#!/bin/bash

##git subtree pull --prefix=dist/spa origin gh-pages (If change made upstream)
export START_DIR=$(pwd)
export GITROOT=${START_DIR}
VERSIONFILE=${GITROOT}/VERSION


quasar build -m pwa
echo "evernetproperties.com" > dist/pwa/CNAME

echo "Bump version (Versionfile=${VERSIONFILE})"
#Find minor version - text AFTER last dot in version string
OLDVERSION=$(cat ${VERSIONFILE})
OLDMINORVERSION=$(echo ${OLDVERSION} | sed 's/.*\.//')
CHARSINFIRSTPART=$(expr ${#OLDVERSION} - ${#OLDMINORVERSION})
RES=$?
if [ ${RES} -ne 0 ]; then
  echo "Invalid version number"
  exit 1
fi
OLDVERSIONWITHOUTMINOR=${OLDVERSION:0:${CHARSINFIRSTPART}}
RES=$?
if [ ${RES} -ne 0 ]; then
  echo "Invalid version number (Can't get first part)"
  exit 1
fi
NEWVERSION=${OLDVERSIONWITHOUTMINOR}$(expr ${OLDMINORVERSION} + 1)
echo "Bumped to version ${NEWVERSION}"

echo ${NEWVERSION} > ${VERSIONFILE}
printf "/* eslint-disable */\nexport default { codebasever: '${NEWVERSION}' }\n" > ./src/rjmversion.js

cp -r ./redirects/* ./dist/pwa

git add --all
git commit -m"New website version"
git push
git push origin `git subtree split --prefix dist/pwa main`:gh-pages --force
git subtree push --prefix dist/pwa origin gh-pages
