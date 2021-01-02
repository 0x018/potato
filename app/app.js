import { load } from "svelte";

let route = null;
fetch("/assets/route.json").then(r => r.json()).then(v => {
	route = v;
})
// import * as route from './route.json'
// import breadcrumbs from "../component/breadcrumbs"
let page = null;
let search = {};

function getUrl() {
	if (!route) {
		setTimeout(function () {
			getUrl();
		}, 200)
		return;
	}
	let [u, s] = (window.location.hash).replace(/#(\/)?/, "").split("?");
	u = (u || "").split("/")[0].toLowerCase();
	// url=u;
	console.log("get url ", u)
	if (!s) search = {};
	else
		search = Object.fromEntries(decodeURIComponent(s).split("&").map(v => v.split("=")));
	page = route[u];
}

window.pushState = (data, title, url) => {
	history.pushState(data, title, url);
	console.log("pushState", "get url")
	getUrl();
}

window.addEventListener("hashchange", getUrl, false);
getUrl();