# Separate Kramurai-Testvorschau

## Zweck und Veröffentlichung

Dieser Zweig ergänzt ausschließlich eine Vorschau unter `/vorschau/kramurai/` sowie dieses Dokument und das Erzeugungsskript. Die vorhandene Startseite und Helfer werden nicht ersetzt. Die Vorschau wird erst nach Freigabe und Merge dieses Zweigs auf GitHub Pages erreichbar.

Die Vorschau ist dann öffentlich für Personen mit der Adresse erreichbar. Alle vier Seiten tragen `noindex,nofollow`; das ist keine Zugangssperre. Sie wird nicht in die bisherige Navigation oder Sitemap aufgenommen. Kein anderer Hostinganbieter, kein zusätzlicher Server, kein neues Abo.

## Schutz vorhandener Vorgänge

Die Vorschau verwendet eigene localStorage-Kennungen (`preview-formularfuchs-…`) und die getrennte IndexedDB `kramurai-preview-local`. Sie liest und verändert damit nicht die gespeicherten Vorgänge der bisherigen Helfer. Ein sichtbarer Hinweis fordert zur Nutzung erfundener Testangaben auf. Ein ausdrücklich ausgewählter Sicherungsimport bleibt möglich.

Die Vorschau teilt technisch die Website-Origin; sie ist kein Sicherheits-Sandbox gegenüber anderem JavaScript derselben Website. Die Trennung betrifft die tatsächlich verwendeten Speicherkennungen, nicht eine separate Domain oder Zugriffsberechtigung.

## Geplanter Praxistest

1. Retoure mit erfundenen Angaben, Testfoto und PDF-Testbeleg anlegen.
2. Sicherung herunterladen und Dateiinhalte/Dateigröße kontrollieren.
3. Sicherung wieder öffnen: zusätzlicher Vorgang, vorhandener Testvorgang unverändert, Foto und Beleg lesbar.
4. Importierten Vorgang ändern, Seite neu laden, beide Vorgänge erneut öffnen.
5. Zusammenfassung und PDF-Ausgabe auf fehlende Angaben/Bilder, unnötige Leerseiten und mitgedruckte Bedienelemente prüfen.
6. Falschen Helfertyp und beschädigte Sicherung über den Dateidialog prüfen.
7. Router und Trade-in mit ihren zusätzlichen Feldern prüfen.
8. Schmale Ansicht auf Überläufe und erreichbare Schaltflächen prüfen. Eine Browseransicht ist kein physischer Android-Gerätetest; diesen Unterschied im Ergebnis festhalten.

Noch kein erfolgreicher echter Browser-/PDF-Test: Der verfügbare Testbrowser konnte die lokale Entwicklungsadresse mit `ERR_BLOCKED_BY_CLIENT` nicht öffnen. Automatisierte Tests des Entwicklungsstands (10 erfolgreich) bleiben davon getrennt dokumentiert.

## Reproduzierbarkeit

Erzeugung aus einem sauberen Checkout des Entwicklungsstands:

```sh
python3 scripts/build-kramurai-preview.py ../formularfuchs-web
```

Das Skript kopiert neun ausdrücklich ausgewählte Dateien, passt nur Vorschaupfade, Suchmaschinenanweisungen, Hinweisleiste und Speicherkennungen an. Die Anwendung und Sicherungslogik stammen aus dem geprüften Quellbaum `034820f4889287566bfbda2c8da31e9fb6b84c94` (GitHub-Commit `29de9a6fba0865bfb01be1dbe81f34eccae180f3`). Bei späteren Änderungen diese Quellenangaben ebenfalls aktualisieren.

Zusätzliche Prüfung am 29.09.2026: Alle drei erzeugten Vorschau-Helfer wurden in jsdom mit fake-indexeddb gestartet. Vorbelegte Live-Vorgänge blieben unverändert und erschienen nicht in der Vorschau; neue Eingaben wurden ausschließlich unter den Vorschaukennungen und in `kramurai-preview-local` abgelegt. Dies ist ein automatisierter Isolationstest, kein echter Browser-/PDF-Praxistest.
