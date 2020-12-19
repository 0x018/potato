export let data = []
export let separator = "/";

function linkClick(e) {
  let link = e.target.attributes?.link?.value;
  if (link) {
    pushState("" + link, "" + e.target.innerText, "/#/" + link);
  }
}