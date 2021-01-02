export function create(data) {

	// data
	// {
	// 	count: 11,
	// 	grid: "[]",
	// 	css: "/*.container 为 grid 容器, 白色背景;*/\n/*.item 为彩色背景 */\n/*.item-数字编号 单个元素*/\n/*修改后 ctrl+s 保存并刷新左侧样式 */\n.cont...",
	// 	name: "aa",
	// 	route: "bb"
	// }

	let dir = "/products/" + data.name;
	console.log("create page 1", data, dir);


	this.respond({
		status: 200,
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({ code: 201, message: '完成' }),
	});
}