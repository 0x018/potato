import gform from "./gform"
import modal from "./modal"
import grid from "./grid"
import gfill from "./gfill"
import {
  onMount
} from "svelte";

let step = 1; // 1,2
let scale = 0.3;
let layoutArr = [
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
  {
    // width: "100%", height: "100%",
    rows: "100px 100px 100px", columns: "100px 100px 100px 100px",
    count: 11, desc: "3*4-3-4-4", scale: 1,
    span: [
      { index: 1, r: 1, c: 2 }
    ],
  },
];


let gridEdit = JSON.parse(JSON.stringify(layoutArr[0]));
let spanEdit = JSON.parse(JSON.stringify(layoutArr[0]));
let gridFill = {}; // span edit 后的结果


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


