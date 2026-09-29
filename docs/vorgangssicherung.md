# Vorgangssicherung – Entwicklungsstand 29.09.2026

Die Funktion ist im GitHub-Entwurf vorbereitet, noch nicht auf der Live-Seite veröffentlicht.

## Bedienung

Über der Eingabe stehen in allen drei Helfern zwei Schaltflächen:

- **Vorgang sichern:** Lädt den aktuell geöffneten Vorgang als JSON-Datei herunter. Enthalten sind Angaben, die gespeicherten (gegebenenfalls bereits verkleinerten) Fotos und der gespeicherte Einlieferungsbeleg. Anschließend im Downloadordner prüfen, ob die Datei vorhanden ist.
- **Sicherung öffnen:** Sicherungsdatei im passenden Helfer auswählen. Nach erfolgreicher Prüfung erscheint sie als zusätzlicher Vorgang in der Liste. Der vorherige Vorgang bleibt bestehen. Wiederholter Import erzeugt jeweils eine weitere Kopie.

Die Sicherungsdatei ist für die spätere Weiterbearbeitung gedacht. Das PDF bleibt die lesbare Dokumentation für das Weitergeben oder Ausdrucken. Die Sicherung enthält persönliche Angaben und Dateien **unverschlüsselt**; außerhalb des Browsers sicher aufbewahren und nur bewusst weitergeben. Kein Upload, Konto, Server oder kostenpflichtiger Dienst ist erforderlich.

Für einen späteren Geräte- oder Domainwechsel: jeden benötigten Vorgang einzeln sichern, die Dateien außerhalb des Browsers aufbewahren und im entsprechenden Helfer auf dem Zielgerät bzw. unter der neuen Adresse öffnen. Die alte Browserablage erst nach erfolgreicher Kontrolle des Imports aufgeben. Die separate Starterbatterie-Seite ist nicht Teil dieser Funktion.

## Format und Fehlerbehandlung

- Festes, vom Markennamen unabhängiges Format `alltagshilfe-vorgang`, Version 1; Helfertyp `retoure`, `router` oder `tradein`.
- Angaben nach dem konkreten Helferschema, ursprüngliche Zeitangaben und Dateien mit Typ, Name, MIME-Typ, Zeitpunkt, Größe, Base64-Inhalt und SHA-256-Prüfsumme.
- Import vergibt eine neue zufällige Vorgangs-ID und öffnet den ersten Schritt. Bestehende Speicherkennungen bleiben erhalten.
- Die SHA-256-Prüfsummen erkennen Änderungen an den Dateiinhalten. Sie sind kein Echtheits-/Herkunftsnachweis und sichern nicht rechtlich die Angaben im Vorgang.
- Prüfung vor dem Schreiben: Formatversion, Helfertyp, Feldtypen, Dateiliste, Prüfsummen, unterstützte Bild-/PDF-Signaturen und Größen.
- Grenzen: 20 MiB pro Datei, 50 MiB für alle enthaltenen Dateien, 72 MiB für die gesamte Sicherung. Unterstützt werden JPEG, PNG, WebP, GIF sowie PDF beim Einlieferungsbeleg. Nicht unterstützte Dateien werden nicht stillschweigend weggelassen.
- Während Export/Import sind Eingaben und Vorgangswechsel auf dieser Seite gesperrt. Denselben Vorgang währenddessen nicht parallel in einem zweiten Tab ändern.
- Dateikopien werden in einer IndexedDB-Transaktion mit neuen Schlüsseln angelegt. Erst nach Abschluss wird der neue Vorgang gespeichert. Scheitert der localStorage-Schritt, werden nur die neu importierten Dateikopien entfernt. Ein gescheiterter Bereinigungsversuch wird ausdrücklich angezeigt.
- Zwischen IndexedDB und localStorage gibt es keine gemeinsame atomare Transaktion. Ein abrupter Tab-/Browserabbruch genau zwischen beiden Schritten kann verwaiste neue Dateikopien zurücklassen; vorhandene Vorgänge werden dabei nicht überschrieben. Eine vollständige automatische Bereinigung solcher Abbrüche ist nicht enthalten.
- Der Browser kann nicht zuverlässig bestätigen, ob ein ausgelöster Download tatsächlich auf dem Gerät gespeichert wurde; deshalb lautet die Rückmeldung „Download gestartet“.

## Validierung

`npm ci --ignore-scripts` und `npm test` führen die automatisierten Prüfungen aus. Die npm-Pakete sind ausschließlich Entwicklungs-/Testabhängigkeiten und werden nicht von Besuchern geladen.

Am 29.09.2026 bestanden **10 Tests**:

1. Angaben, Unicode, Foto-/PDF-Bytes und Dateimetadaten beim Export/Import erhalten.
2. Falscher Helfer, andere Formatversion, falsche Feldtypen und zusätzliche/prototypbezogene Felder abgewiesen.
3. Beschädigtes JSON/Base64, falsche Größe/Prüfsumme und doppelte Dateitypen abgewiesen.
4. Leere Vorgänge unterstützt; SVG/aktive Inhalte und zu große Dateien abgewiesen.
5. Mehrfachimport mit getrennten IDs, ursprüngliche Daten erhalten.
6. Simulierter localStorage-Speicherfehler: neue Dateien entfernt, bestehende erhalten.
7. Abgebrochene IndexedDB-Transaktion: kein neuer sichtbarer Vorgang angelegt.
8.–10. Echte HTML-/Anwendungsskripte der drei Helfer in einer simulierten Browserumgebung: sichern, Foto-/PDF-Dateien als Kopie importieren, ursprünglichen Vorgang erhalten und nach neuem Seitenstart wiederfinden.

Zusätzlich: Markenvorlagen-Abgleich, JavaScript-Syntaxprüfung und Diff-Prüfung bestanden.

**Noch offen vor Veröffentlichung:** Praxisprüfung im echten Android-/Desktop-Browser (Dateidialog, Download, erneutes Öffnen, sichtbare Fotos) sowie PDF-Probe mit importiertem Vorgang. Die simulierte Browserprüfung ersetzt keine Layout-, Druck- oder gerätespezifische Speicherprüfung. Kein Test mit echten persönlichen Nutzerdaten durchgeführt.
