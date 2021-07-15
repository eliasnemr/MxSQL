#!/bin/sh

rm -rf ./minidapp

mkdir minidapp

mkdir minidapp/MxSql

cp -rf www/* minidapp/MxSql

cp ./src/assets/bg.svg minidapp/MxSql

cp ./src/assets/minidapp.orig.conf minidapp/MxSql/minidapp.conf

zip -r ./minidapp/MxSql.minidapp minidapp/MxSql


