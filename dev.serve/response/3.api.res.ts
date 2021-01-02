import { broadcast } from "../chat.ts";
import { create } from "../api/put.page.js";
export const name = "api";
export const sort = 3;
export const iif = (req) => (req.headers.get("upgrade") != "websocket");
export function send(req, key, task) {

  // response.subscribe((req) => {

  // req[key].processed.push({ who: name, result: 404 }); // 表明已处理,建议404
  // req[key].assign = "api"; 
  if (req.url == "/refresh/") {
    // console.log("url",req.url)
    broadcast("refresh", ["dev"]);
  } else if (req.url == "/page/" && req.method === "PUT") {
    Deno.readAll(req.body).then(data => {
      data = JSON.parse(new TextDecoder().decode(data));
      create.call(req, data);
    });
  }
  else {
    req.respond({
      status: 404,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ code: 404, message: '功能暂无' }),
    });
  }
  req[key].complate = true;
  // });



} 