import { onMount } from 'svelte';
export let target = "_blank";
export let data = [
  { link: "http://www.flickr.com/photos/strupler/2969141180", img: "/assets/slicebox/images/1.jpg", alt: "image1", description: "Creative Lifesaver" },
  { link: "http://www.flickr.com/photos/strupler/2968268187", img: "/assets/slicebox/images/2.jpg", alt: "image2", description: "Honest Entertainer" },
  { link: "http://www.flickr.com/photos/strupler/2968114825", img: "/assets/slicebox/images/3.jpg", alt: "image1", description: "Brave Astronaut" },
  { link: "http://www.flickr.com/photos/strupler/2968122059", img: "/assets/slicebox/images/4.jpg", alt: "image1", description: "Affectionate Decision Maker" },
  { link: "http://www.flickr.com/photos/strupler/2969119944", img: "/assets/slicebox/images/5.jpg", alt: "image1", description: "Faithful Investor" },
  { link: "http://www.flickr.com/photos/strupler/2968126177", img: "/assets/slicebox/images/6.jpg", alt: "image1", description: "Groundbreaking Artist" },
  { link: "http://www.flickr.com/photos/strupler/2968945158", img: "/assets/slicebox/images/7.jpg", alt: "image1", description: "Selfless Philantropist" },
]

let id = (Math.random() + "").replace("0.", "").slice(0, 5);

onMount(async () => {
  setTimeout(function () { slicebox() }, 400)
})

function slicebox() {
  let jQuery = window.jQuery;

  let wrapper = `.wrapper#${id}`;
  let slicebox = jQuery(`${wrapper} #sb-slider`).slicebox({

    autoplay: true,
    orientation: 'v',
    cuboidsCount: 6,
    // cuboidsRandom : true,
    disperseFactor: 30
  });

}


