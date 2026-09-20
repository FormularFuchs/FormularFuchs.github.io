# FormularFuchs – Freigabestatus

Stand: 20. September 2026

## Bereits vorliegende Nutzertests
- „Retoure dokumentieren“: PDF mit vier Seiten; Fotos und Beleg in der PDF. Nutzer hat außerdem bestätigt, dass der Wiederöffnungstest funktioniert.
- „Router / Mietgerät zurückgeben“: PDF mit drei Seiten und Testdaten/Fotos übergeben.
- „Handy / Elektronik an Ankaufportal schicken“: PDF mit vier Seiten und Testdaten/Fotos übergeben.
- Diese PDF-Tests sind keine Aussage über alle Geräte oder beliebig umfangreiche Eingaben.

## Automatische Quelltext-Sichtprüfung im Entwicklungszweig
- Alle drei Helfer haben die vorgesehenen Impressum-/Datenschutzlinks.
- Alle drei Helfer behalten „Testversion“ und noindex,nofollow.
- Statisch referenzierte DOM-IDs sind vorhanden; die dynamische ID summaryPhotos wird im JavaScript erzeugt.
- Neues `afterPdfSponsor`-Element in allen drei Helfern vorhanden, **absichtlich mit HTML-`hidden`**.
- CSS erzwingt `[hidden]` und schließt den Bereich im Druck/PDF aus.
- Kein Werbeanbieter, Tracking-Skript oder aktiver Ad-Code eingebunden.
- Originale `app.js`-Dateien der drei Helfer sind im Entwicklungszweig unverändert gegenüber main.
- Die Live-Seiten auf main haben keinen neuen Werbebereich.
- Die beiden Rechtsseiten sind nur unvollständige, noindex-markierte Entwürfe im Entwicklungszweig.

## Offene Freigabesperren
1. Legitimation bei Anschrift.net ist hochgeladen, Freigabe/Bestätigungs-E-Mail mit konkreter Anschrift steht aus.
2. Nur ausdrücklich freigegebene Anschrift im korrekten Adressformat übernehmen; Privat-/Rechnungsanschrift nicht in GitHub.
3. Betreiberpflichtangaben und Datenschutzerklärung vollständig prüfen, dann rechtliche HTML-Seiten freigeben.
4. Statische Vorschau und echten Browser-/Smartphone-Test der Rechtsseiten durchführen.
5. HTML-Seiten von Entwicklungszweig nach Freigabe in Live-Zweig übernehmen. Nie Platzhalter veröffentlichen.
6. Entscheidung über tatsächliche Werbung, Zahlungs-/Steuerfrage und ggf. Einwilligungslösung separat treffen; aktuell **keine Werbung freischalten**.
7. Wenn Projekt später eingestellt oder Anschrift geändert wird, Impressum vor Ende des Adressnutzungsrechts aktualisieren.

Die Freigabe eines Impressums ist kein automatisches „Testversion entfernen“ bei den Helfern; das sind zwei getrennte Entscheidungen.
