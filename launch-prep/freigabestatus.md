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

## Neu entdeckter Namens-Check (vor Marken-Freigabe)
- Öffentliche Internetrecherche am 20.09.2026 ergab eine seit 2011 bestehende ehrenamtliche Initiative **„Die Formularfüchse“** in Cuxhaven, die Menschen beim Ausfüllen von Anträgen und Schreiben hilft. Sie ist **nicht** automatisch mit „FormularFuchs“ identisch oder zwingend eine geschützte Marke, aber thematisch nahe genug für vertiefte Kennzeichenrecherche.
- Quellen: https://www.cuxhaven.de/unser-service-fuer-sie/mitmachen-and-engagieren/projekte/formularfuechse.html und https://www.cnv-medien.de/news/cuxhaven-diese-pfiffigen-fuechse-kann-kein-formular-schrecken.html
- Das bisherige Web-Suchresultat ist **keine** vollständige DPMA/EUIPO/WIPO-Registerrecherche; über das Bestehen oder Nichtbestehen eines Registerrechts ist damit nichts Endgültiges gesagt.
- Vor öffentlicher Bewerbung, Monetarisierung oder Markenanmeldung: „FormularFuchs“, „Formular Fuchs“, „Formular-Fuchs“, „Formularfuchs“ und „Formularfüchse“ in amtlichen Registern und weiteren Kennzeichenquellen prüfen, insbesondere gleiche oder ähnliche digitale Formularhilfe-Dienstleistungen. Ggf. anwaltliche Kollisionsprüfung.
- Bis zur Klärung keine Namensfreigabe behaupten, keine kostenpflichtige Markenanmeldung auslösen. Bestehende Live-Seite ist bereits online; nicht behaupten, sie sei noch unveröffentlicht.


## Update 20.09.2026 abends: Impressumsanschrift bestätigt, Entwürfe ausgefüllt

Anschrift.net hat die Bestellung Nr. 155225 abgeschlossen und die Legitimation per Mail ausdrücklich als abgeschlossen bezeichnet. Die gebuchte Anschrift ist:
Felix Ducksch, c/o Block Services, Stuttgarter Str. 106, 70736 Fellbach. Der Nutzer hat ausdrücklich bestätigt, dass diese Kombination im **öffentlichen GitHub-Entwurfszweig** als Impressums-/Datenschutz-Verantwortlicher verwendet werden darf. Weder die persönliche Rechnungsanschrift noch Ausweisbilder/Rechnung gehören ins Repository.

Dateien aktualisiert:
- `impressum/index.html`
- `datenschutz/index.html`
- `launch-prep/impressum-entwurf.md`
- `launch-prep/datenschutz-entwurf.md`

**Noch keine Live-Freigabe:** Beide Rechtsseiten zeigen weiterhin den Arbeitsentwurf-Hinweis und `noindex,nofollow`. Der Zweig `main` bleibt unberührt. Vor Übernahme: schnelle unmittelbare Kontaktmöglichkeit zusätzlich zur E-Mail klären, mögliche USt-IdNr./W-IdNr. und andere Zusatzpflichten abfragen, tatsächliche E-Mail-/Brief-Löschpraxis bestätigen, Anbieter-Datenschutzlinks und Rechtsseiten im Browser testen. Markenentscheidung (FormularFuchs vs. Erdilotse/Otterlotse/Rabenlotse) bleibt getrennt. Keine Werbeskripte aktivieren. Die E-Mail-Anmerkung zum Pseudonym zeigt einen leeren Wert zwischen Anführungszeichen; für Post ausschließlich an das Pseudonym zur Sicherheit Anschrift.net fragen.

## Offene Freigabesperren
1. Legitimation bei Anschrift.net ist hochgeladen, Freigabe/Bestätigungs-E-Mail mit konkreter Anschrift steht aus.
2. Nur ausdrücklich freigegebene Anschrift im korrekten Adressformat übernehmen; Privat-/Rechnungsanschrift nicht in GitHub.
3. Betreiberpflichtangaben und Datenschutzerklärung vollständig prüfen, dann rechtliche HTML-Seiten freigeben.
4. Statische Vorschau und echten Browser-/Smartphone-Test der Rechtsseiten durchführen.
5. HTML-Seiten von Entwicklungszweig nach Freigabe in Live-Zweig übernehmen. Nie Platzhalter veröffentlichen.
6. Entscheidung über tatsächliche Werbung, Zahlungs-/Steuerfrage und ggf. Einwilligungslösung separat treffen; aktuell **keine Werbung freischalten**.
7. Wenn Projekt später eingestellt oder Anschrift geändert wird, Impressum vor Ende des Adressnutzungsrechts aktualisieren.

Die Freigabe eines Impressums ist kein automatisches „Testversion entfernen“ bei den Helfern; das sind zwei getrennte Entscheidungen.
