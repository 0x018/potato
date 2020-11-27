

import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chat } from "@root/dev.serve/chat.ts";

export const name = "ws";
export const sort = 2;
//  headers: Headers { host: localhost:3000, connection: Upgrade, upgrade: websocket, ...}
export const iif = (req) => req.headers.get("upgrade") == "websocket";

export function send(req, key) {

    // response.subscribe((req) => {
    
    // if (req.headers.get("upgrade") === "websocket") { // websocket
      console.info('ws',req.url);
      if (acceptable(req)) {
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        }).then(chat);
      }
    // }
  // })
}