export let active = false; // 折叠
let exampleCode = "";

// let form = null;   // 表单 dom
let data = {};     // 表单 操作 值

function submit(event) {
  let result = {};
  let getEleValue = (ele) => {
    switch (ele.type) {
      case "checkbox":
      case "radio": return (ele.checked ? ele.value : null);
      default: return ele.value;
    }
  }
  // let name=
  Array.from(event.currentTarget.querySelectorAll("[name]"))
    .map(ele => {
      let n = ele.name;
      let v = getEleValue(ele)
      if (!result[n]) result[n] = v;
      else if (v !== null) result[n] = [].concat(result[n], v)
      return n;
    });
  // name=Array.from(new Set(name));
  // console.log("name",result);
  data = result;
  return false;
}