// let file = "Abc.svelte";


// import { loadJson } from "./loadJson.ts";
import { copy } from "https://deno.land/std/fs/mod.ts";
import { loadCode } from "./loadCode.js";
const rx = (await loadCode("dev.serve/rxjs.umd.js").js({})).rxjs;

// init
const config = await loadCode(Deno.args[0] + "config.json").json();

let buildPath = "./build/"; // 项目下的build目录
let outputFile = config.dist + "/run/"; // 文件输出目录

// console.log("delete dir", outputFile, config.dist.build)

const svelte = (await loadCode(buildPath + 'compiler.js').js()).svelte
let autoFun = (code, arg) => `(function (${arg || ""}) {\n  'use strict';\n${code}\n}(${arg || ""}));`

await emptyDir();

copyIndexFile();

createAppFile();

createPageFile();
watchFile();



function removeImportExport(str) {
  let start = str.indexOf("\nfunction");
  let start2 = str.indexOf("\nclass");
  start = (start == -1 ? start2 : start);
  let end = str.indexOf("\nexport default");
  return str.substring(start, end).trim();
}


// async function compileApp(src, name) {

//   let source = await Deno.readTextFile(src);
//   const result = svelte.compile(source, {
//     format: "esm",
//     generate: "dom",
//     dev: false,
//     name: name,
//   });
//   return result.js.code;
// }

async function compilePage(src, name, flag) {
  flag = flag || false;
  // let i = 0;
  let code = [{ src: src, name: name, code: null, type: null }];
  let fileName = src.split('/').pop().split('.').shift()
  let compileSvelte = (source, item) => {
    let result = null;
    try {
      result = svelte.compile(source, {
        format: "esm",
        generate: "dom",
        dev: false,
        name: item.name,
      });
    } catch (error) {
      let message = error.toString().split("\n")[0];
      console.error("%cerror %csvelte.compile error at %c" + item.src,
        "color:#f55;font-weight: bold;",
        "",
        "color:#08f;font-weight: bold;");
      console.log("      " + message);
      let [line, start] = message.split(" (").pop()
        .replace(")", "").split(":").map(v => Number(v.trim()));
      message = source.split("\n")[line - 1];
      message = message.slice(0, start) + '%c' + message.slice(start);
      console.log("      " + message,
        "color:#f55;font-weight: bold;",
        "");
      return null;
    };
    return result;
  };
  let onlyCss = (src) => (/.+\.css$/.test(src));
  for (let i = 0; i < code.length; i++) {
    let item = code[i];
    // console.log("read file ", item.src)
    let source = await getSvelte(item.src); // getSvelte 
    // item.name = item.name || item.;
    // console.log("compile ",name, source)
    if (onlyCss(item.src)) {
      item.code = `/* ${item.src} */\n` + source;
      item.type = 'css';
    } else {
      let result = compileSvelte(source, item);
      if (result) {
        item.code = `/* ${item.src} */\n` + result.js.code;
        // if(item.name=="edit"||)
        // console.log("page ",item.name,item.code)
        let deps = getImport(item.code).flatMap(v => (code.find(c => (c.src === v)) ? [] : ({
          src: item.src + "/" + v,////.replace(".", ""), //+"/",  // todo
          code: null,
          name: v.split('/').pop().split('.').shift().replace(/^./, str => str.toUpperCase())

        })));
        // console.log("deps",deps)
        code = code.concat(deps);
        // console.log("compilePage", i, code.length);
      } else return null;
    }

  }
  code = code.reverse();
  let key = Array.from(new Set(code.map(v => v.name)));
  code = key.map(k => code.find(c => c.name == k));

  let js = code.filter(v => v.type !== 'css').map(v => {
    let name = "";
    if (v.name == "products") name = "page";
    return (
      `// depend["${v.name}","${v.src}"]\n` +
      `let ${name || v.name} = (function () {\n` +
      `  ${removeImportExport(v.code).replace(/\n/g, "\n  ")};\n` +
      `  return ${v.name};\n` +
      `})();\n\n`
    );
    // return { type: '.js', text: text };
  }).join("");
  let css = code.filter(v => v.type === 'css').map(v => v.code).join("");
  // console.log("compilePage writeTextFile", buildFile + "page/" + fileName + ".js")
  if (flag !== true) {
    let page = flag + "/";
    if (js) {
      Deno.writeTextFile(outputFile + page + fileName + ".js", js);
    }
    if (css) {
      Deno.writeTextFile(outputFile + page + fileName + ".css", css);
    }
  } else {
    console.log("compilePage text", js.length)
  }
  return new Promise(res => res(js));
}


function getImport(str) {
  let end = str.indexOf("\nfunction");
  let s = str.substring(0, end); // import code
  // console.log("getImport s",s)
  // .split("from")
  // import E2 from "./e2";
  // import { onMount } from "svelte";
  let r = s.split("\n").filter(v => (v.startsWith("import") && v.indexOf("{") < 0)).flatMap(v => {
    v = v.replace("import ", "").replace("from \"", "").replace("\";", "");
    return v.split(" ")[1];
    // /^".+"$/.test(v) ? v.replaceAll("'").replaceAll('"') : []
  });
  // console.log("getImport r",r)
  return Array.from(new Set(r));

}

async function getSvelte(src) {
  // console.log("getSvelte", src)
  let f;
  try {
    f = (await Deno.stat(src));
  } catch (e) {

  }
  if (f && f.isFile) {

    if (/\.svelte$/.test(src))
      return await Deno.readTextFile(src);
    if (/\.css$/.test(src))
      return await Deno.readTextFile(src);
    else {
      console.error("build.js getSvelte Untreated", src)
      return "/* build.js getSvelte Untreated */";
    }
  } else {
    let name = src.split("/");
    // name.pop();
    name = name.pop();
    // console.log("getSvelte name", name, src + "/" + name + ".html");
    let html = (await getTextNoError(src + "/" + name + ".html")) || "";
    let js = (await getTextNoError(src + "/" + name + ".js")) || "";
    let css = (await getTextNoError(src + "/" + name + ".css")) || "";
    let reg = /import\s+(\w+)\s+from/ig;
    // let cName = [];
    let r;
    while (r = reg.exec(js)) {
      // cName.push(r[1]);
      let n = r[1];
      // console.log("rename import", n);
      let n2 = n.replace(/^./, m => m.toUpperCase());
      html = html.replaceAll(`<${n}`, `<${n2}`);
      html = html.replaceAll(`<${n}/>`, `<${n2}/>`);
      html = html.replaceAll(`</${n}>`, `</${n2}>`);
    }
    // console.log("cName",cName);
    if (!html && !js && !css) {
      html = "--该组件不存在--<br>" + name + " : " + src;
      console.error("组件没找到!", name, src)
    }
    return `<script>${js || ""}</script><style>${css || ""}</style>${html || ""}`
  }
}

async function getTextNoError(src) {
  // console.log("getTextNoError", src)
  try {
    return await Deno.readTextFile(src);
  } catch (e) {
    return null;
  }
}


function copyIndexFile() {
  // console.log("buildjs run copyIndexFile");
  let staticFile = config.copy;
  staticFile.forEach(s => (copy(s, outputFile + s, { overwrite: true })));

}

async function createAppFile() {
  // console.log("buildjs run createAppFile");
  // index js 编译
  let appFile = config.app;
  let sveltejs = "svelte.internal.mjs"; //svelte/internal/index.mjs
  let svelteLoad = "svelte.load.js"; //svelte/internal/index.mjs

  let exportCode, indexjs = "\n" + (await Deno.readTextFile(buildPath + sveltejs)).trimEnd();
  [indexjs, exportCode] = indexjs.split("\nexport");

  exportCode = exportCode.replace(" };", ", load, QI }");
  // exportCode 

  indexjs += "// svelte.load.js \n" +
    (await Deno.readTextFile(buildPath + svelteLoad))
      .replace(/\/\* context\,.+\*\//, "let" + exportCode + " = srt;const { document: document_1 } = globals;\n") + "\n";
  indexjs += `let srt =` + exportCode + ";\n\n";
  // indexjs += "";
  let appCode = await compilePage(appFile, 'app', true)
  // removeImportExport(  );
  // console.log("appCode",appCode)
  indexjs += "// app.svelte \n" + appCode + "\n";
  indexjs += "// app run \n" +
    "const apprun = new app({\n" +
    "  target: document.body,\n" +
    "  props: {\n\n" +
    // "    name: 'world'\n" +
    "  }\n" +
    "});\n" +
    "return apprun;\n"

  await Deno.writeTextFile(outputFile + 'index.js', "var app = " + autoFun(indexjs.replace(/\n/g, "\n  ")));

}

async function createPageFile() {
  // console.log("buildjs run createPageFile");
  // page js 编译
  (config.page || []).forEach(async v => {
    let page = v + "/";
    // console.log("createPageFile", v, outputFile + page)
    await Deno.mkdir(outputFile + page, { recursive: true });
    // console.log("createPageFile readFile", page)
    for await (const dir of Deno.readDir(page)) {
      // console.log("await readDir", page, dir.name);
      // if (dir.isFile) 
      compilePage(page + dir.name, v, page);

    }
  });

}

async function emptyDir() {
  // console.log("buildjs run emptyDir");
  // 清空 
  // console.log("清空",outputFile)
  await Deno.mkdir(outputFile, { recursive: true });
  await Deno.remove(outputFile, { recursive: true });
  await Deno.mkdir(outputFile, { recursive: true });
  // await Deno.remove(config.dist.build, { recursive: true });
  // await Deno.mkdir(config.dist.build, { recursive: true });

}
let fileWatch = new rx.Subject();
async function watchFile() {
  const watcher = Deno.watchFs([...(config.copy), ...config.page.map(v => v + "/"), config.app]);
  for await (const event of watcher) {
    console.log(Date.now() + ">>>> event", event);
    // { kind: "create", paths: [ "/foo.txt" ] }
    if (["create", "modify", "remove"].find(v => (v == event.kind)))
      (event.paths).forEach(v => {
        fileWatch.next(v);
      });
  }
}

fileWatch.pipe(
  // rx.operators.bufferTime(800),
  rx.operators.distinctUntilChanged(),
  rx.operators.delay(800),
  rx.operators.filter(data => !!data)
  // rx.operators.map(v=>v.filter(a=>!!a)),
  // rx.operators.debounceTime(800),
  // rx.operators.switchMap(() => fileWatch.pipe(rx.operators.scan((acc, curr) => acc.add(curr), new Set())))
).subscribe(val => {
  console.log("do ", val);
  copyIndexFile();
  // if (val == config.app) {
  createAppFile();
  // } else // if (val.indexOf("/" + config.page + "/") > -1) {
  createPageFile();
  // } // else 
  setTimeout(() => {
    fetch(`http://localhost:${config.port}/refresh/`, { method: "POST" }).then(v => {
      // console.log("refresh",v)
    });
  }, 500);

  fileWatch.next(null);
})

