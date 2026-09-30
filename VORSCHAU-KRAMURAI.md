# Separate Kramurai-Testvorschau

## Zweck und Veröffentlichung

Dieser Zweig ergänzt ausschließlich eine Vorschau unter `/vorschau/kramurai/` sowie dieses Dokument und das Erzeugungsskript. Die vorhandene Startseite und Helfer werden nicht ersetzt. Am 29.09.2026 ausdrücklich freigegeben und über PR #2 veröffentlicht: https://formularfuchs.github.io/vorschau/kramurai/ . PR #1 bleibt Entwurf; die Hauptseite wurde nicht umgestellt.

Die Vorschau ist öffentlich für Personen mit der Adresse erreichbar. Alle vier Seiten tragen `noindex,nofollow`; das ist keine Zugangssperre. Sie wird nicht in die bisherige Navigation oder Sitemap aufgenommen. Kein anderer Hostinganbieter, kein zusätzlicher Server, kein neues Abo.

## Schutz vorhandener Vorgänge

Die Vorschau verwendet eigene localStorage-Kennungen (`preview-formularfuchs-…`) und die getrennte IndexedDB `kramurai-preview-local`. Sie liest und verändert damit nicht die gespeicherten Vorgänge der bisherigen Helfer. Ein sichtbarer Hinweis fordert zur Nutzung erfundener Testangaben auf. Ein ausdrücklich ausgewählter Sicherungsimport bleibt möglich.

Die Vorschau teilt technisch die Website-Origin; sie ist kein Sicherheits-Sandbox gegenüber anderem JavaScript derselben Website. Die Trennung betrifft die tatsächlich verwendeten Speicherkennungen, nicht eine separate Domain oder Zugriffsberechtigung.

## Testplan (mit unten ausgewiesenem Teilabschluss)

1. Retoure mit erfundenen Angaben, Testfoto und PDF-Testbeleg anlegen.
2. Sicherung herunterladen und Dateiinhalte/Dateigröße kontrollieren.
3. Sicherung wieder öffnen: zusätzlicher Vorgang, vorhandener Testvorgang unverändert, Foto und Beleg lesbar.
4. Importierten Vorgang ändern, Seite neu laden, beide Vorgänge erneut öffnen.
5. Zusammenfassung und PDF-Ausgabe auf fehlende Angaben/Bilder, unnötige Leerseiten und mitgedruckte Bedienelemente prüfen.
6. Falschen Helfertyp und beschädigte Sicherung über den Dateidialog prüfen.
7. Router und Trade-in mit ihren zusätzlichen Feldern prüfen.
8. Schmale Ansicht auf Überläufe und erreichbare Schaltflächen prüfen. Eine Browseransicht ist kein physischer Android-Gerätetest; diesen Unterschied im Ergebnis festhalten.

## Tatsächlicher Browser-Praxistest am 29.09.2026

Die veröffentlichte Vorschau wurde in Chrome im Cloud-Browser bedient. Ausschließlich erfundene Testdaten; keine realen Kunden-/Gerätedaten.

| Prüfung | Ergebnis |
| --- | --- |
| Startseite und alle drei Helfer erreichbar | Bestanden |
| Retoure: Angaben, JPEG, PDF-Beleg erfassen | Bestanden; Foto-Vorschau und gespeicherter PDF-Beleg angezeigt |
| Retoure: Sicherung tatsächlich herunterladen | Bestanden; JSON mit 10.640 Bytes und 2 Dateien im Downloadordner vorhanden |
| Dateiintegrität der heruntergeladenen Sicherung | SHA-256 und Dateigrößen stimmen; JPEG (600 × 400) dekodierbar; PDF bytegleich mit Testbeleg |
| Retoure: diese heruntergeladene Datei wieder importieren | Zusätzlicher Vorgang; 2 Vorgänge auswählbar; nach Neuladen Angaben, Fotoelement und PDF-Link in Zusammenfassung vorhanden |
| Original-PDF aus importiertem Vorgang erneut herunterladen | Bestanden; SHA-256 identisch mit Testbeleg |
| Router: sichern, wieder importieren, neu laden | Bestanden mit Gerätebezeichnung und Kunden-/Vertragsnummer; 2 Vorgänge auswählbar; JSON 719 Bytes |
| Trade-in: sichern, wieder importieren, neu laden | Bestanden mit Gerätebezeichnung, IMEI-Testkennung und Angebot 123,45; 2 Vorgänge auswählbar; JSON 850 Bytes |
| Retouren-Sicherung im Router-Helfer öffnen | Korrekt abgewiesen; bestehender Router-Testvorgang erhalten |
| Beschädigte JSON-Sicherung im Retouren-Helfer öffnen | Am 30.09.2026 in der veröffentlichten Vorschau tatsächlich über den Dateidialog geprüft: „Die Datei ist keine lesbare Vorgangssicherung.“ Der vorher gespeicherte, erfundene Testvorgang blieb auswählbar. |
| PDF-Ausgabe über Schaltfläche | Auf einem Android-Smartphone als vierseitige PDF-Datei gespeichert; alle sieben Fotos enthalten, keine mitgedruckten Bedienelemente oder abgeschnittenen Texte. Im Cloud-Browser allein war der Druckdialog nicht bedienbar. |
| Mobilgerät / schmaler Bildschirm | Der Retouren-Helfer wurde auf einem Android-Smartphone bedient; ein vollständiger Layouttest aller drei Helfer auf mehreren schmalen Ansichten steht noch aus. |

Das Browserwerkzeug meldete für das Download-Ereignis einen Timeout, obwohl die Datei im gemeinsamen Downloadordner tatsächlich ankam. Der Erfolg wurde daher anhand der Datei und ihres tatsächlichen Wiederimports belegt, nicht allein anhand der Statusmeldung der Anwendung. Die Dateiauswahl für das erste JPEG verzögerte sich ungewöhnlich stark; Ursache in dieser Sitzung nicht abschließend geklärt.

Korrektur während der Prüfung: Die Druckköpfe aller drei Helfer enthielten noch den aufgeteilten alten Markennamen. Sie verwenden jetzt ebenfalls die konfigurierbare Marke; im geladenen Retouren-Dokumentkopf wurde Kramurai bestätigt. Der korrigierte Entwicklungsstand besteht weiterhin alle 10 automatisierten Tests.

Praxisprobe des Nutzers am 29.09.2026: Retouren-Sicherung mit sieben Bildern auf dem Smartphone wieder geöffnet, importierte Kopie bearbeitet und erneut als PDF gespeichert. Die neue PDF enthielt genau die geänderte Angabe und eine neue Änderungszeit; die ursprüngliche Erstellungszeit und alle sieben eingebetteten Bilder blieben erhalten. Der ursprüngliche Vorgang zeigte weiterhin den alten Wert. Beide PDFs wurden visuell und textlich verglichen, und die eingebetteten Bilder waren bytegleich. Die bereitgestellte JSON-Datei wurde vom Importvalidator der Anwendung akzeptiert. Persönliche Testbilder werden nicht ins Repository übernommen.

Feinschliff: Die drei PDF-Köpfe lassen das Logofeld bei noch nicht festgelegtem Logo nun ganz weg. Der Kramurai-Schriftzug bleibt links sichtbar; die Konfiguration kann später wieder ein echtes Logo einsetzen.

Erneute Android-PDF-Probe nach Veröffentlichung dieses Feinschliffs: Der Nutzer speicherte den ursprünglichen Retouren-Vorgang erneut als PDF. Die neue Datei hat drei A4-Seiten statt vier; der Schriftzug steht ohne leeres Logofeld im Kopf. Alle sieben eingebetteten Fotos sind bytegleich zur vorherigen PDF, und alle Angaben einschließlich der unveränderten ursprünglichen Vorgangsbezeichnung sind vorhanden. Die drei gerenderten Seiten wurden visuell auf Abschnittswechsel, Lesbarkeit und abgeschnittene Inhalte geprüft. Der kompaktere Umbruch enthält keine leere Seite.

Offen vor einer Umstellung der Hauptseite:
- Router- und Trade-in-PDFs auf einem echten Mobilgerät sowie deren Layout und Seitenumbrüche prüfen.
- Alle drei Helfer auf schmalen Ansichten hinsichtlich Überläufen und erreichbaren Schaltflächen prüfen.

Der Retouren-Praxistest einschließlich der neuen PDF-Kopfgestaltung ist erfolgreich. Die übrigen Helfer sind damit noch nicht vollständig mobil abgenommen.

## Reproduzierbarkeit

Erzeugung aus einem sauberen Checkout des Entwicklungsstands:

```sh
python3 scripts/build-kramurai-preview.py ../formularfuchs-web --github-source 15386af0390c4684bff1c41e225e4f0851191764
```

Das Skript kopiert neun ausdrücklich ausgewählte Dateien, passt nur Vorschaupfade, Suchmaschinenanweisungen, Hinweisleiste und Speicherkennungen an. Die Anwendung und Sicherungslogik stammen aus dem geprüften Quellbaum `4fdf39a9a4aa5e2c56cc48fc3812d4d5e326002b` (GitHub-Commit `15386af0390c4684bff1c41e225e4f0851191764`). Bei späteren Änderungen diese Quellenangaben ebenfalls aktualisieren.

Zusätzliche Prüfung am 29.09.2026: Alle drei erzeugten Vorschau-Helfer wurden in jsdom mit fake-indexeddb gestartet. Vorbelegte Live-Vorgänge blieben unverändert und erschienen nicht in der Vorschau; neue Eingaben wurden ausschließlich unter den Vorschaukennungen und in `kramurai-preview-local` abgelegt. Dies ist ein automatisierter Isolationstest, kein echter Browser-/PDF-Praxistest.
