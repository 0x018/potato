import {broadcast} from "../chat.ts";
export const name = "api";
export const sort = 3;
export const iif = (req) => (req.headers.get("upgrade") != "websocket");
export function send(req, key, task) {

  // response.subscribe((req) => {

    // req[key].processed.push({ who: name, result: 404 }); // 表明已处理,建议404
    // req[key].assign = "api"; 
    if(req.url=="/refresh/") { 
      // console.log("url",req.url)
      broadcast("refresh",["dev"]);
    }
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: "{code:200,message:'除了刷新,功能暂无'}",
    });
    req[key].complate = true;
  // });
    
     

} 