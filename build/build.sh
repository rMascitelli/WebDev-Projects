#!/usr/bin/env zsh

if [[ -z $1 ]]
then
	echo "Usage: "
	echo "    ./build.sh ../{folder_name}"
	echo ""
	echo "    Choose project from root folder by changing folder_name"
	echo "    ex) ./build.sh ../front-end"
	echo ""
fi

if [[ -d "my-app" ]] 
then
#	npx create-react-app my-app
fi

rm -rf my-app/src/*
cp -r ../$1/src/* my-app/src/ 
