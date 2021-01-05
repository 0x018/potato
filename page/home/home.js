// let id = (Math.random() + "").replace("0.", "").slice(0, 5);
let name = 'home';
let pageTag = [];
let cptTag = [];
let dpdc = [];
function pathCut(str) {
	if (!str) return str;
	str = str.replaceAll("/./", "/");
	str = str.replace(/(\w+)\/\.\.\//, "");
	str = str.replace(/(\w+)\/\.\.\//, ""); // todo: 最多两次 "../", 后期重构
	return str;
}
function low(str, src) {
	if (!str) return str;
	// if (str === "page") return (src || "").split("/").pop();
	return str.toLowerCase();

}
function getNode(key) {
	return dpdc.find(v => v.src == key);
}
let content;
function getPosition(key, f) {
	let target = content && content.querySelector("[tag='" + key + "']");

	if (target) {
		// offsetTop: 266
		// offsetWidth: 100
		// offsetHeight: 20
		// offsetLeft: 60
		let x = null, y = null;
		let cr = target.getBoundingClientRect();
		console.dir(target);
		console.dir(cr);
		/**
		 * width: 100 height: 70 
		 * left: 12 right: 112 
		 * top: 340 bottom: 410 
		 */
		if (f) { // right middle
			x = cr.left + cr.width;
			y = cr.top + cr.height / 2;
		} else { // left middle
			x = cr.left
			y = cr.top + cr.height / 2;
		}
		return {
			x: x,
			y: y,
		}
	}
	else { console.error("dom 渲染未完成"); }
}
let line = [];
let _draw = null;
function drawLine() {
	if (_draw) clearTimeout(_draw);
	_draw = setTimeout(function () {

		line = dpdc
			.filter(v => (!!v.psrc))
			// .map(v => ({ start: getPosition(v.psrc), end: getPosition(v.src) }));
			.map(v => ({
				d: calcPath(
					...Object.values(getPosition(v.psrc, true)),
					...Object.values(getPosition(v.src))
				),
				id: v.id
			}));
	}, 200);
}
function calcPath(x1, y1, x2, y2) {
	let a = (x2 - x1) / 3;
	let b = (y2 - y1) / 3;
	let c = [x1 + 1.9 * a, y1 + b, x1 + 1.1 * a, y1 + 2 * b];
	if (a < 0) {
		x2 = x1 + 0.1;
		c = [x1 + 1.9 * Math.abs(b), y1 + b, x1 + 1.1 * Math.abs(b), y1 + 2 * b];
	}
	let intercept = 2;
	let absAdd = (num, a) => num < 0 ? num - a : num + a;
	return `M${x1} ${y1} ` + `C ` + c.join(" ") +
		` ${absAdd(x2, - intercept)} ${absAdd(y2, - intercept)}`;
}
fetch("assets/dpdc.json").then(r => r.json()).then(d => {
	let k = new Map();
	let p = new Set(); // pageTag
	let c = new Set(); // cptTag
	d = d.map((v, i) => {
		let psrc = pathCut(v.parent);
		let src = pathCut(v.src);
		if (v.type == "page") p.add(src); else c.add(src);
		return {
			id: (psrc) + "##" + (src),
			type: v.type,
			name: low(v.name, v.src),
			pname: low(v.pname, v.psrc),
			src: src,
			psrc: psrc
		};
		// if(v.type=="page") pageTag.push({name:low(v.name),src:})
	});//.filter(v => !k.has(v.id) && k.set(v.id, 1));
	pageTag = Array.from(p)
	cptTag = Array.from(c)
	dpdc = d;
	drawLine();
});