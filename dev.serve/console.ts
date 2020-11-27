



export function reSetConsole(){
    // console 显示调整
    let __log = console.log;
    let log = (title, style, ...arg) => __log("%c[" + title+"] ", style, ...arg);
    console.info = (title, ...arg) => log(title, "color:#08f;font-weight: bold;", ...arg);
    console.success = (title, ...arg) => log(title, "color:#0f8;font-weight: bold;", ...arg);
    console.error = (title, ...arg) => log(title, "color:#f55;font-weight: bold;", ...arg);
    console.log = (title, ...arg) => log(title, "color:#fff;font-weight: bold;", ...arg);
    console.warn = (title, ...arg) => log(title, "color:#ff0;font-weight: bold;", ...arg);

}