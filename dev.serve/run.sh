#!/bin/bash
while [[ $# -ge 1 ]]; do
	case $1 in
		-config|--config )
			dir=$2
			shift 2
			;;
      * )
			echo "经过*：$1"
			shift	
			;;
	esac
done

if [ "$dir" == "" ];then
ostype=`uname -a`
result=(`deno run --allow-read --allow-write --allow-env begin.js "$ostype"`);
dir=${result[0]}
fi

# echo "temp $dir"

deno run --unstable \
--allow-read --allow-net --allow-run \
--allow-env --no-check --import-map "${dir}imports.json" \
./dev.serve/server.ts "${dir}" &

cpid=$!
# echo "cpid buils.js $cpid"
echo "$cpid " >> "${dir}cpid"

wait $cpid
# # # --no-check --unstable --watch
# read
# else
#     echo "Need to install deno !!"
#     read
# fi