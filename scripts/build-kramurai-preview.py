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
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path, help='Checked-out Kramurai development repository')
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
    elif name.endswith('/app.js'):
        text, n = re.subn(r'const STORAGE_KEY = "([^"]+)";', r'const STORAGE_KEY = "preview-\1";', text)
        if n != 1:
            raise SystemExit('Speicherkennung nicht eindeutig: ' + name)
        text, n = re.subn(r'const DB_NAME = "formularfuchs-local";', 'const DB_NAME = "kramurai-preview-local";', text)
        if n != 1:
            raise SystemExit('Datenbankkennung nicht eindeutig: ' + name)
    elif name == 'styles.css':
        text += '''\n.preview-notice{display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;padding:12px 20px;background:#fff2cd;color:#312600;border-bottom:1px solid #c6a652;font-size:.9rem}\n.preview-notice span{flex:1 1 260px}\n.preview-notice a{color:#193e66;font-weight:700}\n@media print{.preview-notice{display:none!important}}\n'''
    target = output / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text)
(output / 'QUELLSTAND.txt').write_text('Kramurai-Testvorschau\nQuell-Commit (lokal): ' + sha + '\nQuellbaum: ' + tree + '\nGitHub-Entwicklungsstand mit identischem Baum: 29de9a6fba0865bfb01be1dbe81f34eccae180f3\n')
print('Vorschau erzeugt: ' + str(output))
