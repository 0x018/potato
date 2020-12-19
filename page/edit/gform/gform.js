import { onMount } from 'svelte';

export let next;
export let width = "fit-content", height = "fit-content";
export let gtr, gtc;
function calcCount(s) {
    if (!s) return null;
    s = (s || "").trim().replace(/\s+/g, ' ');
    if (s.indexOf("(") < 0) {
        return s.split(" ");
    } else {
        // s=s.split(" ");
        // let r=[];
        // for(let i=0;i<s.length;i++){
        //     if(s[i].indexOf('(')<-1){

        //     }
        // }
        console.error("gtr,gtc calc error", s);
    }
}
let colNum = 4, maxCol = 20;
let rowNum = 3, maxRow = 10;
let rows = Array(maxRow).fill(null).map(() => ({ value: "100px", edit: null }));
let columns = Array(maxCol).fill(null).map(() => ({ value: "100px", edit: null }));
$: __watchGtr = setGtr() || gtr;
function setGtr() {
    let r = calcCount(gtr);
    if (r) {
        rowNum = r.length;
        rows = Array(maxRow).fill(null).map((v, i) => ({ value: r[i] || "100px", edit: null }));
    }
    width = width || "fit-content";
    height = height || "fit-content";
}
$: __watchGtc = setGtc() || gtc;
function setGtc() {
    let c = calcCount(gtc);
    if (c) {
        colNum = c.length;
        columns = Array(maxCol).fill(null).map((v, i) => ({ value: c[i] || "100px", edit: null }));
    }
}
$: rowResult = rows.slice(0, rowNum);
$: columnResult = columns.slice(0, colNum);

function done() {
    if (next) {
        next({
            width: width,
            height: height,
            rows: rowResult.map(v => (v.value || "").trim()).join(" "),
            columns: columnResult.map(v => (v.value || "").trim()).join(" "),
        });
    }
}

let checkFlag = true; // true 有错误,未通过验证

let errorTest = (str) => (!/^(\d{1,}\D{1,})$/gi.test((str || "").trim()));
function showError(tag) {
    return tag && (!!tag.edit) && errorTest(tag.value);
}
let checkTick = null;
function check() {
    checkTick && clearInterval(checkTick);
    checkTick = setTimeout(() => {
        colNum = Math.min(maxCol, Math.floor(colNum) || 1);
        rowNum = Math.min(maxRow, Math.floor(rowNum) || 1);
        // await tick();
        setTimeout(() => {
            let c = (v) => (errorTest(v.value));
            // console.log("some",rowResult.filter(c),columnResult.filter(c) );
            checkFlag = (rowResult.some(c) || columnResult.some(c));
            if (!checkFlag) { done(); }
        }, 100);
    }, 400);
}
onMount(() => {
    check();
})
