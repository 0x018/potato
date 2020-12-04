// let file = "Abc.svelte";


// import { loadJson } from "./loadJson.ts";
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
  let code = [{ src: src, name: name, code: null }];
  let fileName = src.split('/').pop().split('.').shift()
  for (let i = 0; i < code.length; i++) {
    let item = code[i];
    // console.log("read file ", item.src)
    let source = await getSvelte(item.src); // getSvelte 
    // item.name = item.name || item.;
    // console.log("compile ",name, source)
    const result = svelte.compile(source, {
      format: "esm",
      generate: "dom",
      dev: false,
      name: item.name,
    });
    item.code = `// ${item.src} \n` + result.js.code;
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
  }

  let text = code.map(v => `let ${v.name} = (function () {\n  ${removeImportExport(v.code).replace(/\n/g, "\n  ")};\n  return ${v.name};\n})();`).reverse().join("\n\n")
  // console.log("compilePage writeTextFile", buildFile + "page/" + fileName + ".js")
  if (!flag) {
    let page = config.page + "/";
    Deno.writeTextFile(outputFile + page + fileName + ".js", text);
  } else {
    console.log("compilePage text", text.length)
  }
  return new Promise(res => res(text));
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
  console.log("getSvelte", src)
  let f;
  try {

    f = (await Deno.stat(src));
  } catch (e) {

  }
  if (f && f.isFile) {
    if (/\.svelte$/.test(src))
      return await Deno.readTextFile(src);
    else return "";
  } else {
    let name = src.split("/");
    // name.pop();
    name = name.pop();
    console.log("getSvelte name", name, src + "/" + name + ".html");
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
  let staticFile = config.copy;
  staticFile.forEach(s => Deno.copyFile(s, outputFile + s));

}

async function createAppFile() {
  // index js 编译
  let appFile = config.app;
  let sveltejs = "svelte.internal.mjs"; //svelte/internal/index.mjs
  let svelteLoad = "svelte.load2.js"; //svelte/internal/index.mjs

  let exportCode, indexjs = "\n" + (await Deno.readTextFile(buildPath + sveltejs)).trimEnd();
  [indexjs, exportCode] = indexjs.split("\nexport");

  exportCode = exportCode.replace(" };", ", load }");
  // exportCode 
  indexjs += `let srt =` + exportCode + ";\n\n";
  indexjs += "// svelte.load.js \n" +
    (await Deno.readTextFile(buildPath + svelteLoad))
      .replace(/\/\* context\,.+\*\//, "let" + exportCode + " = srt;const { document: document_1 } = globals;\n") + "\n";
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
  // page js 编译
  let page = config.page + "/";

  await Deno.mkdir(outputFile + page, { recursive: true });

  for await (const dir of Deno.readDir(page)) {
    // console.log(dir.name);
    // if (dir.isFile) 
    compilePage(page + dir.name, "page");

  }
}

async function emptyDir() {
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
  const watcher = Deno.watchFs([...(config.copy), config.page + "/", config.app]);
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
  console.log("do ", val)
  if (val == config.app) {
    createAppFile();
  } else if (val.indexOf("/" + config.page + "/") > -1) {
    createPageFile();
  } else copyIndexFile();
  setTimeout(() => {
    fetch(`http://localhost:${config.port}/refresh/`, { method: "POST" }).then(v => {
      // console.log("refresh",v)
    });
  }, 500);

  fileWatch.next(null);
})

