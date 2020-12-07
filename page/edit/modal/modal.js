import { onMount } from 'svelte';
import { onDestroy } from 'svelte';
export let max = null;
let data = null;
function sd(d){
  data=d;
  // console.log('sd click',data);
}
// function setData(d){
//   console.log("aa")
//   data=d;
// }
// setData.valueOf=function(){
//   return data;
// }
export let show;
let isShow = false;
// let key= "modal-"+Math.floor(Math.random()*1000)

function changeModal(f){
  // f 可能是event //
  isShow = (f===true?true:false);
  // isShow=f;
  // console.log("changeModal",isShow)
  if(isShow){
    document.body.classList.add("modal-hidden");
    let m=(document.body.modal||0)+1;
    // m.push(key);
    document.body.modal=m;
  }else{
    let m=(document.body.modal||0)-1;
    document.body.modal=m;
    if(!m)  document.body.classList.remove("modal-hidden");
  }
}

onMount(async () => {
  show&&show.subscribe(changeModal);
});
onDestroy(() => {
  show&&show.complete(false);
});