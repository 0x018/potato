// loadCode.js
export function loadCode(path) {
  let text=Deno.readTextFile(path)
  return { 
    async text(){ 
      return await text;
    },
    async json(){ 
      return JSON.parse(await text);
    },
    async js(context) { 
      text=await text;
      context = context || {};
      
      let key = Symbol('call');
      (function () {
          let window=context;
          window=window||{};
          context[key] = function () {
              eval(text);
          };
          context[key]();
          context[key] = null;
          delete context[key]
      })();
      return context;
    },
  }
}
