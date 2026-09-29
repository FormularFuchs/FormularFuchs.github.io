#!/usr/bin/env node
// Statische Kontrollen nur für den isolierten Rechtsseiten-Entwurf.
// Kein Browser-, Datenschutz- oder rechtlicher Freigabetest.
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const helpers = ["retoure-dokumentieren", "router-zurueckgeben", "handy-trade-in-dokumentieren"];
const pages = ["index.html", "impressum/index.html", "datenschutz/index.html",
  ...helpers.map(h => h + "/index.html")];
const read = p => readFileSync(join(root, p), "utf8");
const docs = Object.fromEntries(pages.map(p => [p, read(p)]));
let checked = 0, failed = 0;
function check(result, label) {
  checked++;
  if (result) console.log("OK  " + label);
  else { failed++; console.error("FAIL " + label); }
}

for (const p of pages) {
  const html = docs[p];
  check(html.includes('href="/impressum/"'), p + " links imprint");
  check(html.includes('href="/datenschutz/"'), p + " links privacy");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    const path = m[1].slice(1);
    if (path.startsWith("entsorgungsnachweis-starterbatterie/")) continue; // second repository
    const target = join(root, path);
    check(existsSync(target) || existsSync(join(target, "index.html")),
      p + " local resource " + m[1]);
  }
}
for (const p of ["impressum/index.html", "datenschutz/index.html"]) {
  const html = docs[p];
  check(html.includes("Felix Ducksch") && html.includes("c/o Block Services") &&
        html.includes("Stuttgarter Str. 106") && html.includes("70736 Fellbach"),
        p + " confirmed operator and service address");
  check(html.includes("Arbeitsentwurf – noch unvollständig") &&
        html.includes('content="noindex,nofollow"'),
        p + " not marked as published");
  check(!/\[(?:Vor- und Nachname|Vollständige|Rechtsgrundlage|Betreibername)/i.test(html),
        p + " no unfinished personal-detail placeholders");
}
check(docs["index.html"].includes('content="index,follow"'), "homepage unchanged indexing");
check(!docs["index.html"].includes("Erdilotse"), "no premature renaming");
check(docs["datenschutz/index.html"].includes("localStorage") &&
      docs["datenschutz/index.html"].includes("IndexedDB"),
      "privacy text mentions actual local storage technologies");

for (const h of helpers) {
  const p = h + "/index.html";
  const html = docs[p], js = read(h + "/app.js");
  check(html.includes('content="noindex,nofollow"'), h + " test phase retained");
  check(!/afterPdfSponsor|adsbygoogle|googlesyndication|doubleclick/i.test(html + js),
        h + " no advertising code");
  check(/<nav class="screen-only" aria-label="Rechtliche Informationen"/.test(html),
        h + " legal links hidden in print layout");
  check(js.includes("localStorage") && js.includes("indexedDB"),
        h + " original local storage supported");
  try {
    const baseline = execFileSync("git", ["show", "origin/main:" + h + "/app.js"],
      { cwd: root, encoding: "utf8" });
    check(js === baseline, h + " original JavaScript unchanged from main");
  } catch (err) {
    check(false, h + " original JavaScript retrievable from main");
  }
}
check(!/\b(?:Theresa|Personalausweis|Rechnungsanschrift)\b/i.test(
  docs["impressum/index.html"] + docs["datenschutz/index.html"]),
  "no private ID or billing data in legal pages");

console.log("\n" + (checked - failed) + "/" + checked +
            " statische Kontrollen bestanden. Keine rechtliche Freigabe.");
process.exitCode = failed ? 1 : 0;
