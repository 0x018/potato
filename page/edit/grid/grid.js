import { onMount } from 'svelte';
// import { createEventDispatcher } from 'svelte';
// const dispatch = (...s)=>console.log(...s)
// createEventDispatcher();
export let next;
export let mode = "list-item"; // "span-edit" "component-choose"
export let width = "fit-content";
export let height = "fit-content";
export let gtr = "";
export let gtc = "";
export let count = null;
let _calc_count = null;
export let span = []; // 跨行 跨列
export let scale = 3.3;
let rowNum = 0;
let colNum = 0;
let grid = [];

$: _watchCount = setGrid() || count + gtr + gtc;
function setGrid() {

  let arr = Array(count || 0).fill(0);
  grid = arr.map((v, i) => {
    let spanItem = span.find(s => s.index == (i + 1)) || {};
    // grid[i] || 
    return {
      index: i + 1,
      t: null,// top 
      l: null,// left
      r: spanItem.r || 1,
      c: spanItem.c || 1,
      mc: null, // max-c
      mr: null, // max-r
    }
  })
}



$: __watchStyle = resetStyle() || (width + height + gtr + gtc + span.length);
let classSuff = (Math.random() + "").replace("0.", "").slice(0, 5);
let styleTag = null;

onMount(async () => {
  resetStyle();
});

function resetStyle() {
  let cssCode = cssCodeInit();
  cssCodeToStyle(cssCode);
}

function cssCodeInit() {
  let cssCode =
    "/*.container 为 grid 容器, 白色背景;*/\n" +
    "/*.item 为彩色背景 */\n" +
    "/*.item-数字编号 单个元素*/\n" +
    "/*修改后 ctrl+s 保存并刷新左侧样式 */\n" +
    ".container {\n" +
    "    display: grid;\n" +
    `    width: ${width || "fit-content"};\n` +
    `    height: ${height || "fit-content"};\n` +
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
  // let spanCss = 
  // outputCss = 
  if (next) next(cssCode + getSpanCss());
  // dispatch('cssput', { css: cssCode + spanCss, count: _calc_count || count });
  // if (mode == "list-item") {
  //   cssCode += spanCss;
  // }
  return cssCode;
}
// let outputCss = "";
function getSpanCss() {
  let span = grid.map(v => ({ index: v.index, r: v.r, c: v.c })).filter(v => (v.r !== 1 || v.c !== 1));
  return span.map(v =>
    `\n.item-${v.index}{\n` +
    `    grid-area: span ${v.r} / span ${v.c};\n}`
  ).join("");
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
  setTimeout(() => {
    let ele = document.querySelector(".grid-" + classSuff);
    let style = window.getComputedStyle(ele);

    let calcLen = (str) => {

      let m1 = str.match(/(\d+)/g) || [];
      let m2 = str.match(/(calc)/g) || [];
      return m1.length - m2.length;
    }

    rowNum = calcLen(style.gridTemplateRows + "");//
    colNum = calcLen(style.gridTemplateColumns + "");//
  }, 100);
}
// 内部放大
$: scaleCalc = `transform:scale3d(${1 / scale}, ${1 / scale}, ${1 / scale});width:${scale * 100}%;height:${scale * 100}%;`;

function spanChange() {
  setTimeout(() => {
    outPutCount(rowNum, colNum, grid);
    cssCodeInit();
  }, 200);
}

function outPutCount(gr, gc, span) {
  console.log("calc count", gr, gc);
  let cycleCount = 0; // for 计数器,防止死循环
  let arr = Array(gr * gc).fill(0);
  let item = Array(gr * gc).fill(0).map((_, i) => {
    let index = i + 1;
    let v = span.find(s => s.index == index) || { index: index, r: 1, c: 1 }
    return {
      index: v.index,
      r: v.r,
      c: v.c,
    };
  });
  let r = 0,
    c = 0; // 开始 位置
  function findSpace(r, c, h, w) {
    let notNull = () => arr[r * gc + c] != 0;
    let small = () => {
      if (c + w > gc) return true; // 横排放不下
      let c2 = c + w;
      let r2 = Math.min(r + h, gr);
      for (let j = r; j < r2; j++) {
        let row = j * gc;
        for (let i = c; i < c2; i++) {
          if (arr[row + i] != 0) return true;
          if (cycleCount++ == 1000) return true;
        }
      }
    };
    while (notNull() || small()) {
      c++; // 该位置有值,往右移一格
      if (c >= gc) {
        c = 0; // 该行已满,往下移一行
        r++;
      }
      if (r > gr) return [-1, -1];
      if (cycleCount++ == 1000) return [-1, -1];
    }
    // if(c+v[1]<c)
    return [r, c];
  }
  function fill(r, c, h, w, v) {
    let c2 = c + w;
    let r2 = Math.min(r + h, gr);
    for (let j = r; j < r2; j++) {
      let row = j * gc;
      for (let i = c; i < c2; i++) {
        arr[row + i] = v;
        if (cycleCount++ == 1000) return true;
      }
    }
  }

  let result = [];
  item.every((v) => {
    let index = v.index;
    [r, c] = findSpace(r, c, v.r, v.c);
    if (r > -1) {
      fill(r, c, v.r, v.c, index);
      // console.log("item-" + index, r, c, v);
      // result.push("span " + v.r + " / " + "span " + v.c);
      result.push({
        index: index,
        t: r, l: c, r: v.r, c: v.c,
        mc: gc,
        mr: gr - r,
      });
      return true;
    }
    if (cycleCount++ == 1000) return;
    return false;
  });

  grid = result;
  _calc_count = result.length;
  console.log("edit span ", result.length, result)
}


