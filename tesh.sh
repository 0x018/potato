#!/bin/bash
 
# while [[ $# -ge 1 ]]; do
# 	case $1 in
# 		-a|--aa )
# 			A=$2
# 			echo "经过a"
# 			shift 2
# 			;;
# 		-b|--bb )
# 			B=$2
# 			echo "经过b"
# 			shift 2
# 			;;
# 		-c|--cc )
# 			C="true"
# 			echo "经过c"
# 			shift
# 			;;
# 		* )
# 			echo "经过*：$1"
# 			shift	
# 			;;
# 	esac
# done

# echo "A = $A"
# echo "B = $B"
# echo "C = $C"

# ostype=`uname -a`
# result=(`deno run --allow-read --allow-write --allow-env begin.js "$ostype"`)


# echo "dir :${result[0]}"
# echo "port:${result[1]}"
# echo "cli :${result[2]}"
# trap 'echo "1111"' 11 12 13 14 15 16 17 18 19 20
# # 1 2 4 5 6 7 8 9 10
# echo $$
# sleep 10s

function killAll { 
  echo "_kill $cpid $cpid2 build.sh serve.sh"
  cat "${dir}cpid"
  # kill -9 "$cpid"
  # "$cpid2"
}
cpid=$$
trap killAll  1 2 3 4 5 6 7 8 9 10

sleep 20s
