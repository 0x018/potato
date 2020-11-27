declare const rxjs: any;
export const name = "default";
export const sort = 10;
export const iif = (req) => true;
export function send(req, key, task) {

  // response.pipe( // 100毫秒无人处理
  //   rxjs.operators.delay(100),
  //   rxjs.operators.filter((req) => req[key].complate === null)
  // )
  // .subscribe((req) => {

  // req[key].complate = false;
  let text = "default 404";
  let fileType = req.url.split('?')[0].split('/').pop().split('/').pop() || "html";
  console.log("file type",fileType,req.url.split('?')[0])
  let ct={
    // "":"text/html",
    html:"text/html",
    txt:"text/plain",
    js:"application/javascript",
    json:"application/json",
    css:"text/css",
    jpg:"image/jpeg"
  };
  req.respond({
    status: fileType == "html" ? 200 : 404,
    headers: new Headers({
      "content-type": ct[fileType]+";charset=UTF-8",
    }),
    body: text,
  });
  req[key].complate = true;


  // })
}