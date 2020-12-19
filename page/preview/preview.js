import htag from '../edit/htag.svelte';
// import { onMount } from 'svelte';
export let url;
// $: _watchId = idChange() || url.id;
let style;
// let imports;
let grid = [];
// = [
//   { index: 7, component: null, code: `<input class="button" type="button" value="button">`, data: null, import: "button.js" }
// ]

function idChange() {
  // let html=(window["cList"]||{get:()=>({})}).get(id)||{};
  // let html =
  style = localStorage.getItem(`style-${url.id}`) || "";
  // let _grid = localStorage.getItem(`grid-${url.id}`) || [];
  // girdStyle = "<style>" + style + "</style>";
  let count = Number(localStorage.getItem(`grid-count-${url.id}`));
  let g = JSON.parse(localStorage.getItem(`grid-${url.id}`) || "[]");
  console.log("count", count);
  grid = Array(count).fill(0).map((_, i) => {
    let index = i + 1;
    console.log("map ", _, i)
    return (g.find(v => (v.index == index))) || ({ index: index })
  });
  console.log("grid", grid);

}
idChange();

function getGrid() {

}