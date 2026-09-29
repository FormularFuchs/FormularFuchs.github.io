#!/usr/bin/env python3
"""Render static brand templates. No packages, server or browser JS needed."""
import argparse
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = ('index.html', 'retoure-dokumentieren/index.html',
         'router-zurueckgeben/index.html', 'handy-trade-in-dokumentieren/index.html')

def asset(value):
    if value is None:
        return None
    if not isinstance(value, str) or not re.fullmatch(r'/assets/[A-Za-z0-9_./-]+', value):
        raise ValueError('Bildpfade müssen lokale Dateien unter /assets/ bezeichnen.')
    target = (ROOT / value.lstrip('/')).resolve()
    if not target.is_relative_to(ROOT / 'assets') or not target.is_file():
        raise ValueError('Bilddatei fehlt oder liegt außerhalb von assets: ' + value)
    return html.escape(value, quote=True)

def render(config):
    name = config['name']
    if not isinstance(name, str) or not name.strip() or len(name) > 60:
        raise ValueError('Der Markenname muss 1 bis 60 Zeichen enthalten.')
    initial = html.escape(name.strip()[0], quote=True)
    name = html.escape(name.strip(), quote=True)
    logo, mascot = asset(config.get('logo')), asset(config.get('mascot'))
    values = {
        'BRAND_NAME': name,
        'BRAND_LOGO': (f'<img src="{logo}" class="brand-mark helper-brand-mark" alt="">' if logo else ''),
        'BRAND_FAVICON': (f'<link rel="icon" href="{logo}">' if logo else ''),
        'BRAND_HERO': (f'<img src="{mascot}" class="hero-fox fox-image" alt="">' if mascot else '<div class="brand-initial" aria-hidden="true">' + initial + '</div>'),
    }
    pages = {}
    for path in PAGES:
        text = (ROOT / 'branding/templates' / path).read_text()
        for key, value in values.items():
            text = text.replace('{{' + key + '}}', value)
        if re.search(r'\{\{BRAND_[A-Z_]+\}\}', text):
            raise ValueError('Unbekannte Markenvorlage: ' + path)
        pages[path] = "\n".join(line.rstrip() for line in text.splitlines()) + "\n"
    return pages

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Nur prüfen, keine Dateien schreiben')
    args = parser.parse_args()
    pages = render(json.loads((ROOT / 'branding/brand.json').read_text()))
    stale = [path for path, text in pages.items() if not (ROOT / path).exists() or (ROOT / path).read_text() != text]
    if args.check:
        if stale:
            raise SystemExit('Nicht aktuell: ' + ', '.join(stale))
        print('Alle vier statischen Seiten entsprechen der Markenkonfiguration.')
    else:
        for path, text in pages.items():
            (ROOT / path).write_text(text)
        print('Vier statische Seiten erstellt.')

if __name__ == '__main__':
    main()
