import { onMount } from 'svelte';
export let width = "fit-content";
export let height = "fit-content";
export let gtr = "";
export let gtc = "";
export let count = null;
export let span = []; // 跨行 跨列
export let scale = 1;
// let rowNum = 0;
// let colNum = 0;
let grid = [];

$: _watchCount = setGrid() || count;
function setGrid() {
  let arr = Array(count || 0).fill(0);
  grid = arr.map((v, i) => {
    let spanItem = span.find(s => s.index == (i + 1)) || {};
    return grid[i] || {
      index: i + 1,
      t: null,
      l: null,
      r: spanItem.r || 1,
      c: spanItem.c || 1,
    }
  })
}

let classSuff = (Math.random() + "").replace("0.", "").slice(0, 5);
let styleTag = null;

onMount(async () => {
  let cssCode = cssCodeInit();
  cssCodeToStyle(cssCode);
});

function cssCodeInit() {
  let cssCode =
    "/*.container 为 grid 容器, 白色背景;*/\n" +
    "/*.item 为彩色背景 */\n" +
    "/*.item-数字编号 单个元素*/\n" +
    "/*修改后 ctrl+s 保存并刷新左侧样式 */\n" +
    ".container {\n" +
    "    display: grid;\n" +
    `    width: ${width ||"fit-content"};\n` +
    `    height: ${height ||"fit-content"};\n` +
    // "    height: auto;\n" +
    "    /*每行高度*/\n" +
    `    grid-template-rows: ${gtr || "auto"};\n` +
    "    /*每列宽度*/\n" +
    `    grid-template-columns: ${gtc || "auto"};\n` +
    " \n" +
    "    /*每行间距*/\n" +
    "    grid-row-gap: 0px;\n" +
    "    /*每列间距*/\n" +
    "    grid-column-gap: 0px;\n" +
    "}\n" +
    " \n" +
    ".container.empty {\n" +
    "    grid-template-columns: 100%;\n" +
    "    grid-template-rows: 100%;\n" +
    "}\n" +
    " \n" +
    ".item {\n" +
    "    overflow: hidden;\n" +
    "}\n" +
    " \n" +
    ".item-1 {\n" +
    "    /*background:red;*/\n" +
    "}\n";
  cssCode += span.map(v =>
    `\n.item-${v.index}{\n` +
    `    grid-area: span ${v.r} / span ${v.c};\n}`
  ).join("");
  return cssCode;
}
function cssCodeToStyle(cssCode) {
  // debugger
  cssCode = cssCode.replace(/\/\*.*?\*\//g, "");

  let root = "\n.grid-" + classSuff;
  let csstag = cssCode.replace(/[^}]+{/g, function (str) {
    //    return root+str.trim().replace(/,/g,','+root)
    return str.trim().split(',').map(v => {
      let c = v.indexOf(".container") > -1 ? "" : ">"
      return (root + c + v);
    }).join(',');
  });
  styleTag = csstag;
  // setTimeout(() => {
  //   let ele = document.querySelector(".grid-" + classSuff);
  //   let style = window.getComputedStyle(ele);

  //   let calcLen = (str) => {

  //     let m1 = str.match(/(\d+)/g) || [];
  //     let m2 = str.match(/(calc)/g) || [];
  //     return m1.length - m2.length;
  //   }

  //   rowNum = calcLen(style.gridTemplateRows + "");//
  //   colNum = calcLen(style.gridTemplateColumns + "");//
  // }, 100);
}

