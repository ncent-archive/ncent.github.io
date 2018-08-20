#!/bin/bash
# Runs the install script, then links node moduls
npm run build
echo "Upgrade NPM and distribution completed"
cp -R dist/* /Users/jagadeesh.pala/Desktop/Temp
echo "Copied all resources from dist to http root"
