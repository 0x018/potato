import { onMount } from 'svelte';

export let style;
export let next;
let editElement;

onMount(async () => {
  editInit(style);
})


function editInit(cssCode) {
  setTimeout(() => {
    window.cssFormatMonaco();

    // window.monaco.languages.registerDocumentFormattingEditProvider('css', {
    //     provideDocumentFormattingEdits: function (model, options, token) {
    //         console.log("format",model)
    //         return [{ range: model.getFullModelRange(),text: "aaa"+model.getValue() }];
    //     }
    // });

    var editor = window.monaco.editor.create(editElement, {
      value: cssCode,// ({root:null}),
      language: 'css',
      wordWrap: 'wordWrapColumn',
      wordWrapColumn: 100,
      theme: 'vs-dark',
      insertSpaces: true,
      tabSize: 2,
      renderWhitespace: true,
      automaticLayout: true,
      hover: {
        "enabled": true,
        "delay": 2000,
        "sticky": true
      },
      quickSuggestionsDelay: 2000,
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function (e) {
      let txt = editor.getValue();
      // codeToCss(txt);
      if (next) {
        console.log("vscode save", txt);
        next(txt);
      }
    });
    editor.addCommand(monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_F), function (e) {
      editor.trigger('', 'editor.action.formatDocument', null)
    })
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KEY_F, function (e) {
      editor.trigger('', 'editor.action.formatDocument', null)
    })
  }, 100)

}
