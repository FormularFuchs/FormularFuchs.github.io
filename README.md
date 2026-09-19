# FormularFuchs

Zentrale, kostenlose GitHub-Pages-Seite für **FormularFuchs**:
https://formularfuchs.github.io/

FormularFuchs entwickelt problemorientierte, geführte Dokumentationen und Formulare für Alltagssituationen, in denen Menschen sonst improvisieren müssen.

## Grundsätze

- kostenlos nutzbar, ohne Registrierung oder Abo
- verständliche Schritte und möglichst wenige Pflichtfelder
- Angaben und Fotos der interaktiven Helfer werden lokal im Browser verarbeitet und gespeichert; kein FormularFuchs-Server erhält sie
- PDF-Ausgabe über die Druckfunktion des Browsers („Als PDF speichern“)
- keine garantierte rechtliche Beweiskraft; Dokumente geben die eigenen Angaben und hinzugefügten Unterlagen wieder
- keine kostenpflichtige Cloud für Kernfunktionen

**Wichtig:** Lokale Vorgänge und Fotos sind kein dauerhaftes Backup. Sie können beim Löschen von Browser- oder Websitedaten verloren gehen. Fertige PDFs sollten deshalb außerhalb des Browsers gesichert werden. Hochgeladene PDF-Einlieferungsbelege werden als getrennte Originaldatei angeboten und nicht automatisch mit der FormularFuchs-PDF zusammengeführt.

## Öffentliche Startseite und bestehendes Formular

- [Startseite](https://formularfuchs.github.io/)
- [Entsorgungsnachweis für Fahrzeug-Starterbatterien](https://formularfuchs.github.io/entsorgungsnachweis-starterbatterie/) (separates Repository)

## Interaktive Helfer in der Testphase

- [Retoure dokumentieren](https://formularfuchs.github.io/retoure-dokumentieren/)
- [Router / Mietgerät zurückgeben](https://formularfuchs.github.io/router-zurueckgeben/)
- [Handy / Elektronik an Ankaufportal schicken](https://formularfuchs.github.io/handy-trade-in-dokumentieren/)

Diese drei Helfer bleiben bis zur abschließenden Freigabe als **Testversionen** gekennzeichnet und für Suchmaschinen auf `noindex,nofollow`. Sie unterstützen lokale mehrere Vorgänge, Fotos, optionale Belege, nicht blockierende Vollständigkeitshinweise und PDF-Ausgabe.

## Entwicklung und Veröffentlichung

- Das Design und die mobile Bedienung wurden auf einem Android-Smartphone getestet.
- Die veröffentlichten PDF-Beispiele sind Testdokumente, keine Zusage, dass alle Browser, Papierformate und beliebig lange Texte fehlerfrei dargestellt werden.
- Änderungen an gespeicherten Vorgängen müssen rückwärtskompatibel bleiben. Bestehende `caseId`-Schlüssel in IndexedDB dürfen nicht leichtfertig geändert oder gelöscht werden.
- Weitere Helfer werden schrittweise nach Abschluss der Basistests ergänzt.
