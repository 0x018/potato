export let next;
export let active;
let link = '/component/breadcrumbs.js';
let cpt = null;
function initCpt(c) {
  console.log("cpt init")
  cpt = c || null;
  return "";
}
let data = {
  data: [ // 演示 href null
    { href: null, text: "Home", icon: "" },
    { href: null, text: "Edit", icon: "" },
    { href: null, text: "Home", icon: "" },
    { href: null, text: "Home", icon: "" },
  ],
  separator: "/"
};
let exampleCode =
  `let data: [` +
  `  //  href为路由,text 显示文字 icon 图标    \n` +
  `  { href: null, text: "Home", icon: "" },\n` +
  `  { href: null, text: "Edit", icon: "" },\n` +
  `  { href: null, text: "Home", icon: "" },\n` +
  `  { href: null, text: "Home", icon: "" },\n` +
  `];\n` +
  `let separator= "/";\n` +
  `\n` +
  `<breadcrumbs data={data} separator={separator}></breadcrumbs>`;

function submit() {
  if (next) {
    next({ component: link, data: data, cpt: cpt })
  }
}
function formChange() {

}
