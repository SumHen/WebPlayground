// ---------- Setup CodeMirror ----------
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
  mode: "xml",
  theme: "material-darker",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" }
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
  mode: "css",
  theme: "material-darker",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" }
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
  mode: "javascript",
  theme: "material-darker",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" }
});

// ---------- Autocomplete Trigger ----------
function enableAutoComplete(editor, triggerRegex) {
  editor.on("inputRead", function(cm, change) {
    if (change.text[0].match(triggerRegex)) {
      cm.showHint({ completeSingle: false }); 
    }
  });
}
enableAutoComplete(htmlEditor, /[\w<]/);
enableAutoComplete(cssEditor, /[\w-]/);
enableAutoComplete(jsEditor, /[\w.]/);

// ---------- Run Code ----------
function runCode() {
  const htmlCode = htmlEditor.getValue();
  const cssCode = `<style>${cssEditor.getValue()}</style>`;
  const jsCode = `<script>${jsEditor.getValue()}<\/script>`;

  const previewFrame = document.getElementById("preview");
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

  previewDoc.open();
  previewDoc.write(htmlCode + cssCode + jsCode);
  previewDoc.close();
}

document.getElementById("runBtn").addEventListener("click", runCode);


document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runCode();
  }
});

// ---------- Mobile Tabs ----------
const mobileTabs = document.querySelectorAll("#mobileTabs button[data-tab]");
mobileTabs.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab + "Pane";


    document.querySelectorAll(".editor-pane").forEach(pane => 
      pane.classList.remove("active")
    );


    document.getElementById(target).classList.add("active");
  });
});


document.getElementById("runBtnMobile").addEventListener("click", () => {
  runCode();

  document.getElementById("preview").classList.add("fullscreen");
  document.getElementById("exitPreview").classList.remove("hidden");
});


document.getElementById("exitPreview").addEventListener("click", () => {
  document.getElementById("preview").classList.remove("fullscreen");
  document.getElementById("exitPreview").classList.add("hidden");
});
