export function bw() {
    return {

        document: {},
        name: "",
        history: { length: 1, scrollRestoration: "auto", state: null },
        status: "",
        frameElement: null,
        navigator: { vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 8, },
        origin: "chrome-search://local-ntp",
        external: {},
        screen: { availWidth: 1920, availHeight: 1053, width: 1920, height: 1080, colorDepth: 24, },
        innerWidth: 1642,
        innerHeight: 866,
        scrollX: 0,
        pageXOffset: 0,
        scrollY: 0,
        pageYOffset: 0,
        visualViewport: { offsetLeft: 0, offsetTop: 0, pageLeft: 0, pageTop: 0, width: 1642, },
        screenX: 45,
        screenY: 124,
        outerWidth: 1650,
        outerHeight: 983,
        devicePixelRatio: 1,
        //////

        isSecureContext: true,
        onabort: null,
        onblur: null,
        oncancel: null,
        oncanplay: null,
        oncanplaythrough: null,
        onchange: null,
        onclick: null,
        onclose: null,
        oncontextmenu: null,
        oncuechange: null,
        ondblclick: null,
        ondrag: null,
        ondragend: null,
        ondragenter: null,
        ondragleave: null,
        ondragover: null,
        ondragstart: null,
        ondrop: null,
        ondurationchange: null,
        onemptied: null,
        onended: null,
        onerror: null,
        onfocus: null,
        onformdata: null,
        oninput: null,
        oninvalid: null,
        onkeydown: null,
        onkeypress: null,
        onkeyup: null,
        onload: null,
        onloadeddata: null,
        onloadedmetadata: null,
        onloadstart: null,
        onmousedown: null,
        onmouseenter: null,
        onmouseleave: null,
        onmousemove: null,
        onmouseout: null,
        onmouseover: null,
        onmouseup: null,
        onmousewheel: null,
        onpause: null,
        onplay: null,
        onplaying: null,
        onprogress: null,
        onratechange: null,
        onreset: null,
        onresize: null,
        onscroll: null,
        onseeked: null,
        onseeking: null,
        onselect: null,
        onstalled: null,
        onsubmit: null,
        onsuspend: null,
        ontimeupdate: null,
        ontoggle: null,
        onvolumechange: null,
        onwaiting: null,
        onwheel: null,
        onauxclick: null,
        ongotpointercapture: null,
        onlostpointercapture: null,
        onpointerdown: null,
        onpointermove: null,
        onpointerup: null,
        onpointercancel: null,
        onpointerover: null,
        onpointerout: null,
        onpointerenter: null,
        onpointerleave: null,
        onselectstart: null,
        onselectionchange: null,
        onanimationend: null,
        onanimationiteration: null,
        onanimationstart: null,
        ontransitionend: null,
        onafterprint: null,
        onbeforeprint: null,
        onbeforeunload: null,
        onhashchange: null,
        onlanguagechange: null,
        onmessage: null,
        onmessageerror: null,
        onoffline: null,
        ononline: null,
        onpagehide: null,
        onpageshow: null,
        onpopstate: null,
        onrejectionhandled: null,
        onstorage: null,
        onunhandledrejection: null,
        onunload: null,
        onappinstalled: null,
        onbeforeinstallprompt: null,
        ondevicemotion: null,
        ondeviceorientation: null,
        ondeviceorientationabsolute: null,
        event: undefined,
        offscreenBuffering: true,
        //////
        localStorage: {},
        sessionStorage: {},
        indexedDB: {},
        caches: {},
        parent: {},

        window: { parent: Window, opener: null, top: Window, length: 2, frames: Window, },
        stop: () => { },
        open: () => { },
        alert: console.log,
        confirm: console.log,
        prompt: console.log,
        print: console.log,
        fetch: fetch,
        // btoa: ƒ btoa()
        // atob: ƒ atob()
        // setTimeout: ƒ setTimeout()
        // clearTimeout: ƒ clearTimeout()
        // setInterval: ƒ setInterval()
        // clearInterval: ƒ clearInterval()
        // createImageBitmap: ƒ createImageBitmap()
        // close: ƒ close()
        // focus: ƒ focus()
        // blur: ƒ blur()
        // postMessage: ƒ postMessage()

        // Object: ƒ Object()
        // Function: ƒ Function()
        // Array: ƒ Array()
        // Number: ƒ Number()
        // parseFloat: ƒ parseFloat()
        // parseInt: ƒ parseInt()
        // Infinity: Infinity
        // NaN: NaN
        // undefined: undefined
        // Boolean: ƒ Boolean()
        // String: ƒ String()
        // Symbol: ƒ Symbol()
        // Date: ƒ Date()
        // Promise: ƒ Promise()
        // RegExp: ƒ RegExp()
        XMLHttpRequest: XMLHttpRequest1
    };
}

class XMLHttpRequest1{
    constructor(){}
    open(){console.error('XMLHttpRequest open')}
    send (){console.error('XMLHttpRequest send')}
    onload (){console.error('XMLHttpRequest onload')}
    onloadend (){console.error('XMLHttpRequest onloadend')}
    onerror (){console.error('XMLHttpRequest onerror')}
    ontimeout (){console.error('XMLHttpRequest ontimeout')}
}