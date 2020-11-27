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

ostype=`uname -a`
result=(`deno run --allow-read --allow-write --allow-env begin.js "$ostype"`)


echo "dir :${result[0]}"
echo "port:${result[1]}"
echo "cli :${result[2]}"