export let active = false; // 折叠
export let next;
let classSuff = (Math.random() + "").replace("0.", "").slice(0, 5);
let link = '/component/btn.css';
let exampleCode = `<button class="button">button</button>`;

function cssUse(str) {
  let remark = str.substring(str.indexOf("*/\n") + 3);
  str = str.replace(remark, "");
  str = str.split("}").map(s => {
    let css = s.split("{");
    css[0] = css[0].trim().split(",").map(v => `.demo-${classSuff} ${v}`).join(',');
    return css.join("{");
  }).join("}\n");
  return remark + str;
}
// let form = null;   // 表单 dom
let data = {};     // 表单 操作 值

function formChange(event) {
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
  setCode();
  return false;
}
function submit(e) {
  formChange(e);
  if (next) next({ html: exampleCode, link: link });
}
function setCode() {
  let d = JSON.parse(JSON.stringify(data));
  d.class = [d.class].flat().join(" ").trim();
  d.class = d.class && (" " + d.class);
  // let color = "";
  // if (d.color) {
  //   color = `style="color:${d.color};"`
  // }
  let code = "";
  switch (d.tag) {
    case "input":
      code = `<input class="button${d.class}" type="button" value="${d.text}">`;
      break;
    case "a":
      code = `<a class="button${d.class}" href="javascript:;">${d.text}</a>`;
      break;
    default:
      code = `<${d.tag} class="button${d.class}">${d.text}</${d.tag}>`;
  }
  exampleCode = code;
}