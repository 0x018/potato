export async function loadJson(path: string) {
  return JSON.parse(await Deno.readTextFile(path));
}
