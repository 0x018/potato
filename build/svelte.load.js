// svelte.load.js 
function load(url, opt) {
   if (!url) return new Promise((resolve, reject) => { /**never */ });
   return fetch(url, {
      headers: {
         // "Cache-Control: no-cache"
         // "If-None-Match": 'W/"215f2c03150740ce0765337fd7e070f1"'
      },
      // cache: 'reload', //'force-cache', //'default'
   })

      .then(d => {
         if (d.ok || d.status == 304) return d.text();
         throw new Error('http status ' + d.status);
      })
      .then(d => {
         opt = opt || { name: 'page' };
         if (typeof opt == 'string') {
            opt = {
               type: "",
               name: opt
            };
         }
         // console.log("opt", url, opt);
         // let result = null;
         switch (opt.type || "") {
            case "css":
               return d;
               break;
            case "":
               let name = opt.name;
               // console.log("opt name", url, name);
               let ccc;
               eval(
                  `let pushState = window.pushState;` +
                  `(function (srt) {\n` +
                  `  'use strict';\n` +
                  `  /* context, don't remove */\n` +
                  `  ;${d};\n` +
                  // `  var page = page||null;\n`+ // 防报错
                  `  ccc=(${name || 'page'});\n` +
                  `}(srt));\n`
               );
               ccc = ccc || null;
               if (!ccc) {
                  console.error('load js null', url, d);
                  throw new Error('page code error');
               };
               return ccc;
               break;
         }

      })

}

/**
 * <script>
      export let query; // ctx[0]
   </script>
   <svelte:head> // document.head => document.querySelector( /*query** / ctx[0])
      <slot></slot>
   </svelte:head>
 */
let QI = (function () {

   function create_fragment(ctx) {
      let current;
      const default_slot_template = /*#slots*/ ctx[2].default;
      const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
      const default_slot_or_fallback = default_slot || fallback_block(ctx);

      return {
         c() {
            if (default_slot_or_fallback) default_slot_or_fallback.c();
         },
         m(target, anchor) {
            if (default_slot_or_fallback) {
               default_slot_or_fallback.m(document.querySelector(/*query*/ ctx[0]), null);
            }

            current = true;
         },
         p(ctx, [dirty]) {
            if (default_slot) {
               if (default_slot.p && dirty & /*$$scope*/ 2) {
                  update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
               }
            } else {
               if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*query*/ 1) {
                  default_slot_or_fallback.p(ctx, dirty);
               }
            }
         },
         i(local) {
            if (current) return;
            transition_in(default_slot_or_fallback, local);
            current = true;
         },
         o(local) {
            transition_out(default_slot_or_fallback, local);
            current = false;
         },
         d(detaching) {
            if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
         }
      };
   }

   function instance($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      let { query } = $$props;

      $$self.$$set = $$props => {
         if ("query" in $$props) $$invalidate(0, query = $$props.query);
         if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
      };

      return [query, $$scope, slots];
   }

   class QI extends SvelteComponent {
      constructor(options) {
         super();
         init(this, options, instance, create_fragment, safe_not_equal, { query: 0 });
      }
   }

   return QI;
})();