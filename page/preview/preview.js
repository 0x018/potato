import Htag from './htag.svelte';
// import { onMount } from 'svelte';
export let url;
// $: _watchId = idChange() || url.id;
let girdStyle;
let imports;
let grid = [
  { index: 7, component: null, code: `<input class="button" type="button" value="button">`, data: null, import: "button.js" }
]

function idChange() {
  // let html=(window["cList"]||{get:()=>({})}).get(id)||{};
  // let html =
  let style = localStorage.getItem(`style-${url.id}`) || "";
  // let _grid = localStorage.getItem(`grid-${url.id}`) || [];
  girdStyle = "<style>" + style + "</style>";
  // grid = (html.grid || []).map(v => {
  //   // if(v.code) v.component=Htag;
  //   // else 
  //   if (v.import) {
  //     let c = window.srt.load(v.import);
  //     if (c) c.then(c => { v.component = c; });
  //   }
  //   return v;
  // })
}

// {
//   "style":"\n.grid-66132.container {\n    disn}\n",
//   "imports":[],"grid":[
//     {
//       "index":8,"component":null,"data":null,"import":"button.js",
//       "code":"<input class=\"button\" type=\"button\" value=\"button\">",},
//     {"index":9,"component":null,"code":null,"data":null},
//   ]
// }

// let rootclass=`grid-${id}`;

// let page={
//     "style":`
//     ${id}.container {
//         display: grid;
//           grid-template-columns: 100px 100px 100px;
//           grid-template-rows: 100px 100px 100px;
//           grid-row-gap: 20px;
//           grid-column-gap: 20px;
//     }
//     ${id}.container.empty{
//         grid-template-columns: 100%;
//         grid-template-rows: 100%;
//     }
//     `,
//     "grid":[
//         // 组件1  参数  事件
//         { component:"a1", data:{text:"aaaaa1"} },
//     ]
// };
function getGrid() {

}