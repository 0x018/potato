let ostype=Deno.args[0];
// console.log("ostype",ostype)
let os=/linux/ig.test(ostype)?"linux":(/windows/ig.test(ostype)?"windows":"mac");
// console.log("os",os)
let cwd = Deno.cwd();

let configFactory = eval(await Deno.readTextFile("./config.js"));
let config = configFactory({cwd:cwd,os:os});
let map = { imports: config.imports };
config.imports=null;
delete config.imports
let dir=Deno.makeTempDirSync({ prefix: "potato." })+"/";
console.log(dir+" "+config.port+" "+config.cli);
// console.log(dir);
// console.log(config.port);
// console.log(os);
await Deno.writeTextFile(dir+"imports.json",JSON.stringify( map ),{create:true});
await Deno.writeTextFile(dir+"config.json",JSON.stringify( config ),{create:true});

// let cmdArg=["deno","run",
//     "--unstable","--allow-read","--allow-net", 
//     "--allow-run", "--allow-env","--no-check", 
//     "--import-map", dir+"imports.json", "./dev.serve/server.ts",
//     config.port,config.cli
// ];

// console.log("cmd",cmdArg.join(" "));
// Deno.run({ cmd: cmdArg });

// setTimeout(async ()=>{
//     Deno.removeSync(dir,{ recursive: true });
//     Deno.exit();
    // console.log('aaaaa')
// },3000)
//  return dir;
let outputFile = config.dist + "/";
async function emptyDir(src){
    await Deno.mkdir(src, { recursive: true });
    // await Deno.remove(src, { recursive: true });
    // await Deno.mkdir(src, { recursive: true });
}
await emptyDir(outputFile);