#!/usr/bin/env node
// FormularFuchs: offline static preflight. Run: node scripts/preflight.mjs [--release]
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
const root = resolve(import.meta.dirname, "..");
const release = process.argv.includes("--release");
const helpers = ["retoure-dokumentieren","router-zurueckgeben","handy-trade-in-dokumentieren"];
const pages = ["index.html",...helpers.map(h => h + "/index.html"),"impressum/index.html","datenschutz/index.html"];
let failures = 0, checks = 0;
const check = (ok, label) => {
  checks++;
  if (!ok) { console.error("FAIL",label); failures++; }
  else console.log("OK  ",label);
};
const get = file => readFileSync(join(root,file),"utf8");
const docs = Object.fromEntries(pages.map(p => [p,get(p)]));
for (const p of pages) {
  check(docs[p].includes('href="/impressum/"'),p + ": Impressum verlinkt");
  check(docs[p].includes('href="/datenschutz/"'),p + ": Datenschutz verlinkt");
  for (const m of docs[p].matchAll(/(?:href|src)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    if (m[1] === "/entsorgungsnachweis-starterbatterie/") continue;
    const target = join(root,m[1].slice(1));
    check(existsSync(target) || existsSync(join(target,"index.html")),p + ": lokales Linkziel " + m[1]);
  }
}
for (const h of helpers) {
  const html = docs[h + "/index.html"], js = get(h + "/app.js");
  check(html.includes('meta name="robots" content="noindex,nofollow"'),h + ": Suchmaschinen-Testversion");
  check(/id="afterPdfSponsor"[^>]* hidden>/.test(html),h + ": Werbeplatz verborgen");
  check(!/googlesyndication|doubleclick|adsbygoogle|google-analytics/i.test(html + js),h + ": kein Werbenetzwerk / Analytics");
  for (const id of new Set([...js.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]))) {
    if (id === "summaryPhotos") continue; // Dynamic ID created by renderSummary.
    check(html.includes('id="' + id + '"'),h + ": DOM-ID " + id);
  }
}
const css = get("styles.css");
check(css.includes(".after-pdf-sponsor[hidden]{display:none!important}"),"Werbeplatz per CSS verborgen");
check(css.includes("@media print{.after-pdf-sponsor{display:none!important}}"),"Keine Anzeige in der PDF");
for (const p of ["impressum/index.html","datenschutz/index.html"]) {
  if (!release) {
    check(docs[p].includes("Arbeitsentwurf – noch unvollständig"),p + ": Entwurf deutlich markiert");
    check(docs[p].includes('content="noindex,nofollow"'),p + ": Entwurf nicht indexierbar");
  } else {
    check(!docs[p].includes("Arbeitsentwurf – noch unvollständig"),p + ": Freigabevermerk entfernt");
    check(!/\[[^\]]*(?:anschrift|name des betreibers|ergänzen|rechtsgrundlag|adresse)/i.test(docs[p]),
      p + ": keine Rechtstext-Platzhalter");
  }
}
console.log("\n" + (checks - failures) + "/" + checks + " Prüfungen bestanden (" + (release ? "Release" : "Entwurf") + ").");
process.exitCode = failures ? 1 : 0;
