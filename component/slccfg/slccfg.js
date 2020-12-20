// import slicebox from "../../component/slicebox";
export let next;
export let active;
let link = '/component/slicebox.js';
let cpt = null;
function initCpt(c) {
	console.log("cpt init")
	cpt = c || null;
	return "";
}
let data = {
	target: "_blank",
	data: [
		{ link: "http://www.flickr.com/photos/strupler/2969141180", img: "/assets/slicebox/images/1.jpg", alt: "image1", description: "Creative Lifesaver" },
		{ link: "http://www.flickr.com/photos/strupler/2968268187", img: "/assets/slicebox/images/2.jpg", alt: "image2", description: "Honest Entertainer" },
		{ link: "http://www.flickr.com/photos/strupler/2968114825", img: "/assets/slicebox/images/3.jpg", alt: "image1", description: "Brave Astronaut" },
		{ link: "http://www.flickr.com/photos/strupler/2968122059", img: "/assets/slicebox/images/4.jpg", alt: "image1", description: "Affectionate Decision Maker" },
		{ link: "http://www.flickr.com/photos/strupler/2969119944", img: "/assets/slicebox/images/5.jpg", alt: "image1", description: "Faithful Investor" },
		{ link: "http://www.flickr.com/photos/strupler/2968126177", img: "/assets/slicebox/images/6.jpg", alt: "image1", description: "Groundbreaking Artist" },
		{ link: "http://www.flickr.com/photos/strupler/2968945158", img: "/assets/slicebox/images/7.jpg", alt: "image1", description: "Selfless Philantropist" },
	]
};
let exampleCode =
	`let target = "_blank";\n` +
	`let data = [\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2969141180", img: "/assets/slicebox/images/1.jpg", alt: "image1", description: "Creative Lifesaver" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2968268187", img: "/assets/slicebox/images/2.jpg", alt: "image2", description: "Honest Entertainer" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2968114825", img: "/assets/slicebox/images/3.jpg", alt: "image1", description: "Brave Astronaut" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2968122059", img: "/assets/slicebox/images/4.jpg", alt: "image1", description: "Affectionate Decision Maker" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2969119944", img: "/assets/slicebox/images/5.jpg", alt: "image1", description: "Faithful Investor" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2968126177", img: "/assets/slicebox/images/6.jpg", alt: "image1", description: "Groundbreaking Artist" },\n` +
	`  { link: "http://www.flickr.com/photos/strupler/2968945158", img: "/assets/slicebox/images/7.jpg", alt: "image1", description: "Selfless Philantropist" },\n` +
	`];\n` +
	`\n` +
	`<slicebox data={data} target={target}></slicebox>`;

function submit() {
	if (next) {
		next({ component: link, data: data, cpt: cpt })
	}
}
function formChange() {

}
