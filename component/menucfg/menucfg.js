export let next;
export let active;
let link = '/component/menu.js';
let cpt = null;
function initCpt(c) {
	console.log("cpt init")
	cpt = c || null;
	return "";
}
let data = dataMode();
function dataMode(mode) {
	mode = mode || "";
	let data = {
		pid: "0",
		click: (item) => { alert(item.label + " click"); },
		data: [
			{ id: "1", pid: "0", label: "aa1" },
			{ id: "2", pid: "0", label: "aa2" },
			{ id: "3", pid: "0", label: "aa3" },
			{ id: "4", pid: "0", label: "aa4" },
			{ id: "5", pid: "0", label: "aa5" },
			/// pid 1
			{ id: "11", pid: "1", label: "a11" },
			{ id: "12", pid: "1", label: "a12" },
			{ id: "13", pid: "1", label: "a13" },
			{ id: "14", pid: "1", label: "a14" },
			/// pid 2
			{ id: "21", pid: "2", label: "a21" },
			{ id: "22", pid: "2", label: "a22" },
			{ id: "23", pid: "2", label: "a23" },
			{ id: "24", pid: "2", label: "a24" },

			/// pid 3
			{ id: "31", pid: "3", label: "a31" },
			{ id: "32", pid: "3", label: "a32" },
			{ id: "33", pid: "3", label: "a33" },
			{ id: "34", pid: "3", label: "a34" },

			/// pid 11
			{ id: "111", pid: "11", label: "111" },
			{ id: "112", pid: "11", label: "112" },
			{ id: "113", pid: "11", label: "113" },
			{ id: "114", pid: "11", label: "114" },
		]
	};
	switch (mode) {
		case "":
			return data;
		case "file":
			return { ...data, icon: "fa-folder", leafIcon: "fa-file", };
	}
}

let exampleCode =
	`let click = (item) => { alert(item.label + " click"); };\n` +
	`let data = [\n` +
	`	{ id: "1", pid: "0", label: "aa1" },\n` +
	`	{ id: "2", pid: "0", label: "aa2" },\n` +
	`	{ id: "3", pid: "0", label: "aa3" },\n` +
	`	{ id: "4", pid: "0", label: "aa4" },\n` +
	`	{ id: "5", pid: "0", label: "aa5" },\n` +
	`	/// pid 1 \n` +
	`	{ id: "11", pid: "1", label: "a11" },\n` +
	`	{ id: "12", pid: "1", label: "a12" },\n` +
	`	{ id: "13", pid: "1", label: "a13" },\n` +
	`];\n` +
	`\n` +
	`<menu data={data} click={click} pid="0"></menu>`;

function submit() {
	if (next) {
		next({ component: link, data: data, cpt: cpt })
	}
}
function formChange() {

}

