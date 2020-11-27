#!/bin/bash
while [[ $# -ge 1 ]]; do
	case $1 in
		-open|--open )
			open="true"
			shift
			;;
	esac
done

deno -V
if [ $? -ne 1 ];then

ostype=`uname -a`
result=(`deno run --allow-read --allow-write --allow-env begin.js "$ostype"`);

# 返回结果存入3变量 part-2
dir=${result[0]};
port=${result[1]};
cli="${result[2]} http://localhost:$port/";

# 关闭已经占用的端口号
pid=`lsof -i:"$port" |awk 'NR>1{print $2}'`
if [ "$pid" != "" ];then
  echo "kill pid $pid"
  echo "$pid"|xargs kill -9 
fi

# echo "|$open|"
if [ "$open" == "" ];then
    # echo "Not open: http://localhost:$port/"
    cli=""
fi
# xdg-open可能会有一些匪夷所思的报错,导致服务停止
# 比如: Fontconfig error: Cannot load default config file: No such file: (null) 等


# 编译前端
# echo "编译前端"
./build.sh -config "$dir" &

# 运行服务器
# echo "运行服务器"
./dev.serve/./run.sh -config "$dir" &

# 打开浏览器
# echo "打开浏览器"

$($cli) & 

else
    echo "Need to install deno !!"
    read
fi