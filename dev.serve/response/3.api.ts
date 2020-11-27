export const name = "api";
export const sort = 3;
export const iif = (req) => (req.headers.get("upgrade") != "websocket");
export function send(req, key, task) {

  // response.subscribe((req) => {

    // req[key].processed.push({ who: name, result: 404 }); // 表明已处理,建议404
    // req[key].assign = "api"; 
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: "{code:404}",
    });
    req[key].complate = true;
  // });
     

} 