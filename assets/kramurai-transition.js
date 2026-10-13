/* Retired FormularFuchs helpers: preserve local cases until users export them. */
(function () {
  "use strict";
  const keys = {
    "/retoure-dokumentieren/": "formularfuchs-return-v1",
    "/router-zurueckgeben/": "formularfuchs-router-return-v1",
    "/handy-trade-in-dokumentieren/": "formularfuchs-tradein-v1"
  };
  const route = location.pathname.replace(/index\.html$/, "").replace(/\/?$/, "/");
  const prefix = keys[route];
  if (!prefix) return;
  const target = "https://kramurai.github.io" + route;
  let saved = false;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === prefix || key.startsWith(prefix + ":case:") || key === prefix + "-cases-v2") {
        saved = true;
        break;
      }
    }
  } catch (_) { saved = true; }
  if (!saved) { location.replace(target + location.hash); return; }
  document.addEventListener("DOMContentLoaded", () => {
    const note = document.createElement("section");
    note.className = "kramurai-transition-note screen-only";
    note.setAttribute("aria-labelledby", "kramurai-transition-title");
    note.innerHTML = `<h2 id="kramurai-transition-title">FormularFuchs heißt jetzt Kramurai.</h2>
      <p>Hier sind noch Vorgänge aus diesem Browser gespeichert. Sichere jeden benötigten Vorgang über die Vorgangsauswahl, bevor du zur aktuellen Kramurai-Seite wechselst.</p>
      <p>Bei Kramurai kannst du die heruntergeladene Datei über <strong>„Sicherung öffnen“</strong> übernehmen. Angaben, Fotos und Belege werden mitgesichert. Sie bleiben auf deinem Gerät und werden nicht an Kramurai gesendet.</p>
      <div class="kramurai-transition-actions"><button type="button" id="backupExportBtn" class="btn btn-primary">Ausgewählten Vorgang sichern</button><a class="btn btn-secondary" href="${target}">Zur aktuellen Kramurai-Seite</a></div>
      <button type="button" id="backupImportBtn" hidden>Sicherung öffnen</button><input id="backupImportInput" type="file" accept="application/json,.json" hidden>
      <p id="backupStatus" role="status"></p><p>Diese alte Seite bleibt für die Übernahme deiner bisherigen Vorgänge erreichbar. Neue Vorgänge bitte bei Kramurai anlegen.</p>`;
    const style = document.createElement("style");
    style.textContent = ".kramurai-transition-note{padding:20px;margin-bottom:22px;border:2px solid #245D55;border-radius:16px;background:#eef5ef;color:#163B34}.kramurai-transition-note h2{font-size:1.35rem;margin:0 0 12px}.kramurai-transition-note p{margin:12px 0}.kramurai-transition-actions{display:flex;gap:10px;flex-wrap:wrap}.kramurai-transition-actions a{text-decoration:none}.kramurai-transition-actions .btn{background:#245D55;color:white}.kramurai-transition-actions .btn-secondary{background:white;color:#163B34;border:1px solid #245D55}";
    document.head.append(style);
    document.querySelector("main").prepend(note);
  });
})();
