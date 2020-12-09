import gform from "./gform"
import modal from "./modal"
import grid from "./grid"
import gfill from "./gfill"
import {
  onMount
} from "svelte";

export let url;
let step = null; // null, 1,2

let layoutArr = [
  {
    // width: "100%", height: "100%",
    rows: "100px 100px 100px", columns: "100px 100px 100px 100px",
    count: 11, desc: "3*4-3-4-4", scale: 1,
    span: [
      { index: 1, r: 1, c: 2 }
    ],
  },
  {
    width: "100%", height: "100%",
    rows: "80px 1fr", columns: "190px 1fr",
    count: 3, desc: "厂字形-1-2", scale: 0.3,
    span: [
      { index: 1, r: 1, c: 2 }
    ],
  },
  {
    width: "100%", height: "100%",
    rows: "80px 1fr", columns: "1fr 190px",
    count: 3, desc: "厂字形-1-2", scale: 0.3,
    span: [
      { index: 1, r: 1, c: 2 }
    ],
  },
];

let scale = layoutArr[0].scale;
let gridEdit = JSON.parse(JSON.stringify(layoutArr[0]));
let spanEdit = JSON.parse(JSON.stringify(layoutArr[0]));
let gfStyle = ""; // span edit 后的结果
// {()=>changeStep(i)}
function changeStep(i) {
  switch (i) {
    case 1: {
      step = i;
      let id = url?.id;
      if (id) {
        localStorage.removeItem(`style-${id}`);
        localStorage.removeItem(`scale-${id}`);
      }
      pushState(i, null, `/#/edit?step=${i}`);
      break;
    }
    case 2: {
      step = i;
      let id = url?.id || (Math.random() + "").replace("0.", "").slice(0, 5);
      pushState(i, null, `/#/edit?step=${i}&id=${id}`);
      localStorage.setItem(`style-${id}`, gfStyle);
      localStorage.removeItem(`scale-${id}`, scale);
      break;
    }
    case 3:
      window.open(`/#/preview?id=${url?.id}`);
      break;
    default:
      console.error("changeStep 未定义", i);
      break;
  }
}
function selectLayout(item) {
  gridEdit = JSON.parse(JSON.stringify(item || {}));
  spanEdit = JSON.parse(JSON.stringify(item || {}));
  scale = item.scale || 1;
  close();
}
function gformChange(e) {
  spanEdit.width = e.width;
  spanEdit.height = e.height;
  spanEdit.rows = e.rows;
  spanEdit.columns = e.columns;
}

function scaleCalc(s) {
  return `transform:scale3d(${s}, ${s}, ${s});`
}

// modal
let show = new rxjs.Subject();
function open() {
  show.next(true);
}
function close() {
  show.next(false);
}


onMount(() => {
  if (url.id) {
    step = 2;
    scale = localStorage.getItem(`scale-${url.id}`);
    gfStyle = localStorage.getItem(`style-${url.id}`);
  } else {
    step = 1;
  }
});