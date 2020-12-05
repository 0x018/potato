import gform from "./gform"
import modal from "./modal"
import grid from "./grid"
import {
  onMount
} from "svelte";

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


let gridEdit = layoutArr[0];

function selectLayout(item) {
  gridEdit = item || {};
  scale=item.scale||1;
  close();
}


function scaleCalc(s) {
  // s= 0.3 * (s||1);
  // s = scale * (s || 0.3);
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

function changeSpan(i, rc) {
  let span = JSON.parse(JSON.stringify(
    gridEdit.span
  ));
  let item = span.find(item => (item.index == i));
  if(item){

    if (rc.r) item.r = rc.r;
    if (rc.c) item.c = rc.c;
    gridEdit.span = span.filter(item => ((item.c != 1) && (item.r != 1)))
  }else{
    gridEdit.span.push({index:i,r:rc.r||1,c:rc.c||1});
  }
  gridEdit=gridEdit;
}
