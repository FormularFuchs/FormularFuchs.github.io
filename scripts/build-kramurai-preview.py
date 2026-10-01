#!/usr/bin/env python3
"""Create an isolated GitHub Pages preview from a checked-out development tree."""
import argparse
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PREFIX = '/vorschau/kramurai/'
HELPERS = ('retoure-dokumentieren', 'router-zurueckgeben', 'handy-trade-in-dokumentieren')
FILES = ['index.html', 'styles.css', 'assets/case-backup.js'] + [f'{h}/{f}' for h in HELPERS for f in ('index.html', 'app.js')]
THEME = ROOT / 'scripts/register-theme.css'
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path, help='Checked-out Kramurai development repository')
parser.add_argument('--github-source', help='GitHub commit with an identical source tree')
args = parser.parse_args()
source = args.source.resolve()
sha = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
tree = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD^{tree}'], text=True).strip()
if subprocess.check_output(['git', '-C', str(source), 'status', '--porcelain', '--untracked-files=no'], text=True).strip():
    raise SystemExit('Bitte nur einen unveränderten, gespeicherten Quellstand verwenden.')
output = ROOT / PREFIX.strip('/')
for name in FILES:
    text = (source / name).read_text()
    if name.endswith('.html'):
        text = re.sub(r'<meta name="robots" content="[^"]*">', '<meta name="robots" content="noindex,nofollow">', text)
        text = re.sub(r'\s*<link rel="canonical"[^>]*>', '', text)
        # Only route preview-owned resources. The separate battery form remains an explicit live link.
        for target in ('styles.css', 'assets/', *[h + '/' for h in HELPERS]):
            text = text.replace('="/' + target, '="' + PREFIX + target)
        text = text.replace('href="/"', 'href="' + PREFIX + '"')
        banner = '<aside class="preview-notice" aria-label="Testvorschau"><strong>Testvorschau · Kramurai</strong><span>Bitte nur erfundene Angaben verwenden. Testvorgänge werden getrennt von der bisherigen Website gespeichert.</span><a href="/">Zur bisherigen Website</a></aside>'
        text = re.sub(r'(<body[^>]*>)', lambda m: m[1] + '\n  ' + banner, text, count=1)
        legal_links = '<a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a>'
        if name == 'index.html':
            marker = '<div class="footer-links">'
            if text.count(marker) != 1:
                raise SystemExit('Vorschau-Fußzeile nicht eindeutig: ' + name)
            text = text.replace(marker, marker + '\n        ' + legal_links, 1)
        else:
            marker = '  </main>'
            if text.count(marker) != 1:
                raise SystemExit('Vorschau-Helferabschluss nicht eindeutig: ' + name)
            text = text.replace(marker, '    <nav class="preview-legal-links screen-only" aria-label="Rechtliche Informationen">' + legal_links + '</nav>\n' + marker, 1)
        theme_link = '<link rel="stylesheet" href="' + PREFIX + 'register-theme.css">'
        if text.count('</head>') != 1:
            raise SystemExit('Vorschau-Kopf nicht eindeutig: ' + name)
        text = text.replace('</head>', '  ' + theme_link + '\n</head>', 1)
    elif name.endswith('/app.js'):
        text, n = re.subn(r'const STORAGE_KEY = "([^"]+)";', r'const STORAGE_KEY = "preview-\1";', text)
        if n != 1:
            raise SystemExit('Speicherkennung nicht eindeutig: ' + name)
        text, n = re.subn(r'const DB_NAME = "formularfuchs-local";', 'const DB_NAME = "kramurai-preview-local";', text)
        if n != 1:
            raise SystemExit('Datenbankkennung nicht eindeutig: ' + name)
        nav_replacements = (
            ('  function showStep(step) {', '  function showStep(step, scroll = true) {'),
            ('    window.scrollTo({ top: 0, behavior: "smooth" });', '''    if (scroll) {
      const activeStep = document.getElementById("step-" + state.currentStep);
      activeStep.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    }'''),
            ('  showStep(state.currentStep || 1);\n})();', '  showStep(state.currentStep || 1, false);\n})();'),
        )
        for old, new in nav_replacements:
            if text.count(old) != 1:
                raise SystemExit('Schrittnavigation nicht eindeutig: ' + name)
            text = text.replace(old, new)
    elif name == 'styles.css':
        text += '''\n.preview-notice{display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;padding:12px 20px;background:#fff2cd;color:#312600;border-bottom:1px solid #c6a652;font-size:.9rem}\n.preview-notice span{flex:1 1 260px}\n.preview-notice a{color:#193e66;font-weight:700}\n.preview-legal-links{display:flex;flex-wrap:wrap;gap:10px 20px;margin:24px 0;color:#233d54;font-weight:700}\n.preview-legal-links a{color:#09558f}\n@media print{.preview-notice,.preview-legal-links{display:none!important}}\n/* Die Schrittnavigation liegt im Dokument hinter langen Formularabschnitten.
   Auf schmalen Bildschirmen bleibt sie auch vor dem ersten Scrollen erreichbar. */
@media screen and (max-width:720px){
  body.helper-page .wizard{padding-bottom:calc(116px + env(safe-area-inset-bottom))}
  body.helper-page .wizard-nav{
    position:fixed;
    inset:auto 0 0;
    z-index:30;
    margin:0;
    padding:10px max(16px, calc((100vw - 1080px)/2)) calc(10px + env(safe-area-inset-bottom));
    background:rgba(234,241,247,.97);
    border-top:1px solid #b6ccde;
    box-shadow:0 -5px 18px rgba(12,49,88,.12);
  }
}
'''
    target = output / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text)
(output / 'register-theme.css').write_text(THEME.read_text())
(output / 'QUELLSTAND.txt').write_text('Kramurai-Testvorschau\nQuell-Commit (lokal): ' + sha + '\nQuellbaum: ' + tree + ('\nGitHub-Entwicklungsstand mit identischem Baum: ' + args.github_source + '\n' if args.github_source else '\n'))
print('Vorschau erzeugt: ' + str(output))
