#!/bin/sh
npm install
npm update
npm run build
npm run lint
npm run test
npm run check
git status
git add --all
echo "Please enter a commit message"
read message
git commit -m "'$message'"
git push origin main
npm run release
npm run docs
npm run pages
