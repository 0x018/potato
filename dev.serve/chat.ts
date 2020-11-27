import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";


const camelize = (str: any) => str;
var users = new Map<number, WebSocket>();
 // 广播; 散布，传播
function broadcast(message: any, id?: any[]): void {
  if (!message) return;

  (id || [...users.keys()]).forEach(v => {
    // console.log('need to send to ', v);
    let ws = users.get(Number(v));
    ws && ws.send(JSON.stringify(message))
  });
  
}


export async function chat(ws: WebSocket): Promise<void> {
  const userId = Math.floor(10 * Math.random());// v4.generate();

  // Register user connection
  users.set(userId, ws);
  // users.push({ id: userId, ws: ws });
  broadcast({ id: userId, msg: `${userId} is connected`, type: 'login' });
  // console.log('all user', [...users.keys()]);
  broadcast({ id: userId, all: [...users.keys()], msg: `connected success`, type: 'self' }, [userId]); // 只有自己能收到

  // Wait for new messages
  for await (const event of ws) {
    // 接收信息
    let message = camelize(typeof event === "string" ? event : "");
    // console.log('message, userId', message, userId)

    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      // users = users.filter(u => u.id !== userId);
      users.delete(userId);
      broadcast({ msg: `${userId} is disconnected`, type: 'logout' });
      break;
    }

    // 发送指定用户
    message = JSON.parse(message);
    // console.log('msg send1', message);
    // console.log('msg send2', { type: 'msg', id: userId, msg: message.msg });
    broadcast({ type: 'msg', id: userId, msg: message.msg }, message.id);
  }
}
