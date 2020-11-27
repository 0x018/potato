#!/bin/bash

# dir=""
while [[ $# -ge 1 ]]; do
	case $1 in
		-config|--config )
			dir=$2
			shift 2
			;;
		-dev|--dev )
			dev="true"
			shift 2
			;;
	esac
done
if [ "$dir" == "" ];then
ostype=`uname -a`
result=(`deno run --allow-read --allow-write --allow-env begin.js "$ostype"`);
dir=${result[0]}
fi


deno run \
--unstable --allow-read --allow-write --allow-run --allow-net \
--allow-env --no-check --import-map "${dir}imports.json" \
./build/build.js "${dir}" &

cpid=$!
# echo "cpid buils.js $cpid"
echo "$cpid " >> "${dir}cpid"
# function killAll {
#   kill -9 "$cpid"
#   echo "_kill $cpid buildjs"
# }
wait $cpid
# exit 0
# echo "build end"