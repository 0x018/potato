
export let pid = "0";
export let deep = 1;
export let indent = "1em";
export let click = (item) => { alert(item.label + " click") };
export let icon = "fa-folder"; // "str" || ["str"...]
export let leafIcon;
export let data = []
//  [
// 	{ id: "1", pid: "0", label: "aa1" },
// 	{ id: "2", pid: "0", label: "aa2" },
// 	{ id: "3", pid: "0", label: "aa3" },
// 	{ id: "4", pid: "0", label: "aa4" },
// 	{ id: "5", pid: "0", label: "aa5" },
// 	/// pid 1
// 	{ id: "11", pid: "1", label: "a11" },
// 	{ id: "12", pid: "1", label: "a12" },
// 	{ id: "13", pid: "1", label: "a13" },
// 	{ id: "14", pid: "1", label: "a14" },
// 	/// pid 2
// 	{ id: "21", pid: "2", label: "a21" },
// 	{ id: "22", pid: "2", label: "a22" },
// 	{ id: "23", pid: "2", label: "a23" },
// 	{ id: "24", pid: "2", label: "a24" },

// 	/// pid 3
// 	{ id: "31", pid: "3", label: "a31" },
// 	{ id: "32", pid: "3", label: "a32" },
// 	{ id: "33", pid: "3", label: "a33" },
// 	{ id: "34", pid: "3", label: "a34" },

// 	/// pid 11
// 	{ id: "111", pid: "11", label: "111", icon: "fa-file" },
// 	{ id: "112", pid: "11", label: "112", icon: "fa-file" },
// 	{ id: "113", pid: "11", label: "113", icon: "fa-file" },
// 	{ id: "114", pid: "11", label: "114", },
// ];

let list = [];
let picon = (typeof icon == "string") ? icon : (icon[deep] || "");

function getList() {
	// let d = data || getContext("")
	list = data.filter(v => v.pid === pid);
}

getList();

function hasChild(id) {
	return !!data.find(v => v.pid === id)
}

function childClick(item) {
	console.log("click    ", item);
	if (hasChild(item.id)) {
		// show ? true show children : false hide children;
		item.show = !item.show;
	} else {
		if (click) click(item);
	}
	console.log("click end", item);
	list = list;
}