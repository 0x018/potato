import { onMount } from 'svelte';
// import { createEventDispatcher } from 'svelte';
// const dispatch = (...s)=>console.log(...s)
// createEventDispatcher();
export let next;
export let style;

// export let count = null;
let _calc_count = null;
export let span = []; // 跨行 跨列
export let scale = 3.3;
let rowNum = 0;
let colNum = 0;
let grid = [];

function setGrid(count) {

  let arr = Array(count || 0).fill(0);
  grid = arr.map((v, i) => {
    let spanItem = span.find(s => s.index == (i + 1)) || {};
    return grid[i] || {
      index: i + 1,
    }
  })
}


let classSuff = (Math.random() + "").replace("0.", "").slice(0, 5);
let styleTag = null;

$: __watchStyle = resetStyle() || style;

onMount(async () => {
  // resetStyle();
});

function resetStyle() {

  cssCodeToStyle(style);
  setTimeout(() => {
    setGrid(_calc_count);
  }, 300)
    ;
  // let span = getSpan();
  // outPutCount(rowNum, colNum, span);
}
let gridGtr = "";
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
    let ele = document.querySelector(".preview.grid-" + classSuff);
    let style = window.getComputedStyle(ele);

    let calcLen = (str) => {

      let m1 = str.match(/(\d+)/g) || [];
      let m2 = str.match(/(calc)/g) || [];
      return m1.length - m2.length;
    }



    rowNum = calcLen(style.gridTemplateRows + "");//
    colNum = calcLen(style.gridTemplateColumns + "");//
    let repeatStr = " repeat(10, 0px);";
    gridGtr ="grid-template-rows:"+ Array(rowNum).fill("10px").join(" ") + repeatStr;
    setTimeout(() => {
      let hidden = Array.from(document.querySelectorAll(".hidden>.grid-" + classSuff + ">.item"));
      hidden.forEach((item, i) => {
        item.innerText = "" + window.getComputedStyle(item).height;
        if (window.getComputedStyle(item).height == "0px") {
          _calc_count = i;
        }
      });
    })

  }, 100);
}
// 内部放大
$: scaleCalc = `transform:scale3d(${1 / scale}, ${1 / scale}, ${1 / scale});width:${scale * 100}%;height:${scale * 100}%;`;
