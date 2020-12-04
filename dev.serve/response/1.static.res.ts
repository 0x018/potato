// declare const rxjs: any;
export const name = "static";
export const sort = 1;
export const iif = (req) => (req.method === "GET" && req.headers.get("upgrade") != "websocket");
export function send(req, key, task) {

  let runPath= './'+config.dist+"/run/";
  // response.subscribe((req) => {
    // req[key].complate = false;
    // if () {
    let staticFile = req.url.replace("/", "").split('?')[0] || "index.html";
    console.log('get file', staticFile)
    // if(/\d{3}\.js/.test(staticFile)) {
    //   req.respond({
    //     status: 304,
    //     header:new Headers({
    //       // "cache-control": "max-age=604800",
    //       // "last-modified":
    //       "etag": 'W/"215f2c03150740ce0765337fd7e070f1"'
    //     }),
    //     // body:"var a='a';" 
    //   });
    // } else
    rxjs.from(Deno.open(runPath + staticFile)).pipe(rxjs.operators.catchError(val => of(`404 `+val)))
    .subscribe(text => {
      req.respond({
        status: 200,
        // headers: new Headers({
        //   "content-type": "text/html",
        // }),
        body: text,
      });
      req[key].complate = true;
    }, (error) => {
      req[key].processed.push({ who: name, result: 404 }); // 表明已处理,建议404
      req[key].assign = "aaaa"; // 认为海需要 api 判断
      req[key].complate = null;
      task.next(req); // 打回任务池
      // 超时
      // rxjs.of(1).pipe(rxjs.operators.delay(800)).subscribe(() => {
      //   if (req[key].complate !== true) {
      //     req.respond({
      //       status: 404,
      //       headers: new Headers({
      //         "content-type": "text/html",
      //       }),
      //       body: "404",
      //     });
      //     req[key].complate = true;
      //   }
      // })



    })


   
}

