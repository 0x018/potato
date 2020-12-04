// svelte.load.js 
function load(url) {
  
  return fetch(url,{
     headers:{
        // "Cache-Control: no-cache"
        // "If-None-Match": 'W/"215f2c03150740ce0765337fd7e070f1"'
     },
     // cache: 'reload', //'force-cache', //'default'
  })
     
     .then(d => {
        if (d.ok||d.status==304) return d.text();
        throw new Error('http status '+d.status);
     })
     .then(d => {
        let ccc;
        eval(
           `(function (srt) {\n` +
           `  'use strict';\n` +
           `  /* context, don't remove */\n` +
           `  ;${d};\n` +
           // `  var page = page||null;\n`+ // 防报错
           `  ccc=(page);\n` +
           `}(srt));\n`
        );
        ccc = ccc || null;
        if (!ccc) {
           console.error('load js null', url, d);
           throw new Error('page code error');
        };
        return ccc;
     })

}