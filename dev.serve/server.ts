import { listenAndServe } from "https://deno.land/std/http/server.ts";

import { loadJson } from "@root/dev.serve/loadjson.ts";

import { reSetConsole } from "@root/dev.serve/console.ts";

import { loadJs } from "@root/dev.serve/loadjs.ts";

reSetConsole();
console.success("potato", "Good morning", Deno.args);

// load config
const config: any = await loadJson(Deno.args[0] + "config.json");
// console.info('config', config);
window.config=config;
// rxjs
window.rxjs = (await loadJs("dev.serve/rxjs.umd.js", {})).rxjs;
// console.log('rxjs length', Object.keys(rxjs));
let task = new rxjs.Subject();


let reqTag = Symbol("tag"); // 处理的信息标记
listenAndServe({ port: config.port }, async (req) => {
  req[reqTag] = {
    id: Date.now() + "-" + Math.random(),
    complate: null, // null 无人处理  false 处理中   true 处理完成
    get count() { return this.processed.length },    // 已被处理次数
    assign: null,
    processed: [],
  }; // 
  task.next(req);
});
Array.prototype.rxZip = function (...operators) {
  return rxjs.zip(...this).pipe(...operators).toPromise();
}
let processor = await Array.from(Deno.readDirSync("./dev.serve/response/"))
  .filter((v) => /res.(t|j)s$/.test(v.name))
  .map((dir) => rxjs.from(import(`./response/${dir.name}`)))
  .rxZip(rxjs.operators.map((arr) => {
    // console.log("zip",arr)
    let d = { iterator: null };
    arr = arr.map(v => ({ ...v }));
    arr.sort((a, b) => a.sort - b.sort);//.map((p)=>({name:p.name,}))
    d.iterator = arr;
    arr.forEach((v, i) => {
      d[v.name] = v;
      v.response = (r) => v.send(r, reqTag, task);
    });
    return d;
  }));

const pulldown = (task, iif, fun) => {
  iif = iif || (req => true);
  let [receive, leftover] = task.pipe(rxjs.operators.partition(iif));
  fun(receive)
  return leftover;
}
console.info('processor', processor.iterator.map(p => p.name));
// response.pipe(filter())
// 去掉已经完成的
task = task.pipe(rxjs.operators.filter((req) => req[reqTag].complate !== true));
// 去掉已经指定处理人的
task = pulldown(task, (req) => req[reqTag].assign !== null, (someone) => {

  someone.pipe(rxjs.operators.tap((req) => { }))
    .subscribe((req) => {
      let name = req[reqTag].assign || "default";
      let who = processor[name] || processor["default"];
      who.response(req);
    });

});
// 未指定的分发
processor.iterator.forEach((item, i) => {

  // let [iDo, otherDo] = task.pipe(
  //   rxjs.operators.filter((req) => req[reqTag].complate === null),
  //   rxjs.operators.partition((req) => {
  //     if (req[reqTag].assign === null) { // 没有指定处理对象,根据iif判断
  //       let iif = item.iif || (req => true);
  //       return iif(req);
  //     }
  //     // 指定处理对象,根据指定对象名判断
  //     return req[reqTag].assign === item.name;
  //   })
  // );

  // item.send(iDo);
  // task = otherDo;
  task = pulldown(task, item.iif, (someone) => {
    someone.subscribe((req) => { item.response(req); });
  });

});

// 浏览器打开页面

window.open = function (url) {
  Deno.run({
    cmd: [config.cli, url],
  });
}
// if(Deno.args[0]==="open"){

console.info('server', `http://localhost:${config.port}`);
// window.open(`http://localhost:${config.port}`);
// }



//*/