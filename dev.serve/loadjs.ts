import { bw } from "@root/dev.serve/deno.window.ts";

export async function loadJs(path, context) {
    context = context || bw();
    let text = await Deno.readTextFile(path);
    let key = Symbol('call');
    (function () {
        context[key] = function () {
            eval(text);
        };
        context[key]();
        context[key] = null;
        delete context[key]
    })();
    // console.log("context", Object.keys(context));
    return context;
}



