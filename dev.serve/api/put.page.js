export function create(data) {

	// data
	// {
	// 	count: 11,
	// 	grid: "[]",
	// 	css: "/*.container 为 grid 容器, 白色背景;*/\n/*.item 为彩色背景 */\n/*.item-数字编号 单个元素*/\n/*修改后 ctrl+s 保存并刷新左侧样式 */\n.cont...",
	// 	name: "aa",
	// 	route: "bb"
	// }
	console.log("create", data)
	let dir = "./products/" + data.name + "/";
	let f = false;
	try {
		// f = 
		Deno.statSync(dir);
	} catch (e) {
		f = true;
	}
	if (!f) {
		this.respond({
			status: 200,
			headers: new Headers({
				"content-type": "application/json",
			}),
			body: JSON.stringify({ code: 500, message: '文件已存在' }),
		});
		return;
	}

	let grid = (data.grid || []).map(v => {
		//  有component 和 没有component
		if (v.component) {

			let name = (v.component || "").split("/").pop().split(".").shift();
			console.log("name ", v.component, name)
			let ipt = `import ${name} from "../../component/${name}";\n`;
			let blind = "";
			if (data) blind = ` {...${name}Data}`;
			let tag = `<${name}${blind}></${name}>`;
			return { index: v.index, name: name, import: ipt, tag: tag, key: name + "Data", data: v.data }
		} else {
			let link = "" +
				`<svelte:head>\n` +
				`  <link rel="stylesheet" href="${v.link}">\n` +
				`</svelte:head>\n`;
			// let html = v.html ? ("  " + v.html + "  ") : "";
			return { index: v.index, link: link, tag: v.html }
		}
	})
	// console.log("link", grid.filter(v => v.link))
	// 
	let file = {
		css: data.css || "",
		html: (grid.filter(v => v.link) || []).map(v => v.link).join("") +
			'<div class="preview container">\n' +
			Array(data.count).fill(0).map((v, i) => {
				let index = i + 1;
				let cpt = grid.find(v => v.index == index) || null;
				let tag = cpt?.tag || "";
				if (tag) tag = "\n    " + tag + "\n  ";
				return `  <div class="item item-${index}">${tag}</div>`
			}).join("\n") + "\n" +
			'</div>\n',
		js: grid.map(v => v.import).join("") + grid.filter(v => v.key).map(v => {
			return `let ${v.key} = ${JSON.stringify(v.data, null, 4)};\n`
		}).join(""),
	}

	let route = `,\n  "${data.route}": "products/${data.name}.js"\n}`;
	console.log("add route", route);
	// console.log("add page ", file.html, "\n", file.js);
	console.log("mkdir", dir);
	Deno.mkdir(dir, { recursive: true }).then(() => {
		console.log("writeTextFile", dir + data.name, ".js,.html,.css");
		Deno.writeTextFileSync(dir + data.name + '.js', file.js);
		Deno.writeTextFileSync(dir + data.name + '.html', file.html);
		Deno.writeTextFileSync(dir + data.name + '.css', file.css);
		let routeFile = "./assets/route.json";
		let text = Deno.readTextFileSync(routeFile);
		text = text.replace(/(\n\}\s?$)/, route);
		Deno.writeTextFileSync(routeFile, text);
		this.respond({
			status: 200,
			headers: new Headers({
				"content-type": "application/json",
			}),
			body: JSON.stringify({ code: 200, message: '完成', src: `products/${data.name}` }),
		});
	})


}