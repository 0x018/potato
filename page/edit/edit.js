import gform from "./gform"
import modal from "./modal"
import grid from "./grid"
import {
  onMount
} from "svelte";

let layoutArr = [
  {
    width:"100%",height:"100%",
    rows: "80px 1fr", columns: "190px 1fr",
    count: 3, desc: "厂字形-1-2", scalc: 1,
    span: [
      { index: 1, r: 1, c: 2 }
    ],
  }
];


let gridEdit={};

function selectLayout(item){
  gridEdit=item||{};


  close();
}

// modal
let show = new rxjs.Subject();
function open() {
  show.next(true);
}
function close() {
  show.next(false);
}

