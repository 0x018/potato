<script>
	import load from "svelte";

	let page = null;
	let search={};
	
	function getUrl(){
		let [u,s] =  (window.location.hash).replace(/#(\/)?/,"").split("?");
		u=(u||"").split("/")[0].toLowerCase();
		// url=u;
		console.log("get url ",u)
		if(!s) search={};
		else
		search = Object.fromEntries(decodeURIComponent(s).split("&").map(v=>v.split("=")));
		page={
			"":"page/home.js",
			"home":"page/home.js",
			"edit":"page/edit.js",
			"preview":"page/preview.js",
			"304":"304.js"
		}[u];
	}
	

	window.addEventListener("hashchange", getUrl, false);
	getUrl();

</script>
<header>

</header>
{#await load(page)}
	<p>...load...</p>
{:then value}
	<svelte:component this={value} {...search}/>
{:catch error}
	<p>load failed: {error.message}</p>
{/await}
