export let next;

let active = null;
// let component = Array(100).fill(0);
let query = "";
function output(d) {
  if (next) next(d);
  active = null;
  query = "";
  search();
}
let list = [];

function search() {
  let q = query.trim();
  let data = [
    {
      title: "按钮", sub: "全局按钮样式1", abstract: "全局按钮样式,引入后全局生效.描述描述描述描述描述",
      src: "component/btncfg.js",
    },
    {
      title: "按钮", sub: "全局按钮样式2", abstract: "全局按钮样式,引入后全局生效.描述描述描述描述描述",
      src: "component/btncfg.js",
    },
    {
      title: "面包屑导航", sub: "组件", abstract: "面包屑导航,组件.描述描述描述描述描述",
      src: "component/bccfg.js",
    },
  ];
  let world = q
    .replace(/[\,\.\; \!\@\#\$\%\^\*]+/g, ' ')
    .split(' ')
    .sort((a, b) => a.length - b.length);

  let filter = v => (q == "") || world.some(w => (v.title + v.sub + v.abstract).indexOf(w) > -1);
  let replace = v => {
    let d = { ...v };
    if (q) {

      console.log("world", world)
      world.forEach(w => {
        d.title = d.title.replace(w, `<em class="high-light">${w}</em>`);
        d.sub = d.sub.replace(w, `<em class="high-light">${w}</em>`);
        d.abstract = d.abstract.replace(w, `<em class="high-light">${w}</em>`);
      });
    }
    return d;
  }
  list = data.filter(filter).map(replace);
}

search();

let _t = null;
function debounceSearch() {
  if (_t) clearTimeout(_t);
  _t = setTimeout(() => {
    search();
  }, 800);
}