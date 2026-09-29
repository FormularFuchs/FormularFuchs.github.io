# Kramurai – vorbereiteter Arbeitsstand

Stand 29.09.2026. Kramurai ist der bevorzugte Arbeitsname, keine abgeschlossene Markenfreigabe. Dieser Zweig ist eine technische Vorbereitung, noch keine Live-Umbenennung.

## Name und Gestaltung ändern

1. `branding/brand.json` bearbeiten: `name`, optional `logo` und `mascot`.
2. Bilder unter `assets/` ablegen und als `/assets/dateiname.ext` angeben. `null` verwendet eine reine Wortmarke und einen neutralen Anfangsbuchstaben anstelle einer Tierfigur.
3. `python3 scripts/build-brand.py` ausführen.
4. Änderungen an Konfiguration, Vorlagen und erzeugten HTML-Seiten gemeinsam committen.

Die vier HTML-Vorlagen liegen unter `branding/templates/`. Inhaltsänderungen dort vornehmen, anschließend neu erzeugen. Die ausgelieferten Dateien liegen weiterhin an ihren bisherigen Pfaden. `python3 scripts/build-brand.py --check` meldet nicht erzeugte Änderungen. Es gibt weder zusätzliche Laufzeitbibliotheken noch einen Server oder eine kostenpflichtige Build-Plattform. GitHub Pages liefert die fertig erzeugten statischen Dateien aus.

Kontaktdaten, GitHub-Adresse, Canonical-URLs und das separat verwaltete Batterieformular gehören nicht zur Namenskonfiguration. Die Kontaktadresse bleibt die bestehende funktionsfähige Adresse. Eine spätere Domainänderung ist ein eigener Schritt: lokal gespeicherte Vorgänge werden nicht automatisch auf eine andere Origin übertragen.

## Entwicklungsschritte

- Erledigt: austauschbare Marke für Startseite und drei bestehende Helfer, einschließlich PDF-Wasserzeichen und Hinweisen.
- Erhalten: Speicherkennungen, IndexedDB, Vorgangs-IDs, Abläufe, Helfer-URLs und Testkennzeichnung.
- Offen: visuelle Abnahme auf Smartphone/Desktop und PDF-Praxistest; Name/Logo endgültig festlegen.
- Nächster funktionaler Schwerpunkt: wieder importierbare Sicherung der Vorgänge einschließlich Fotos/Belegen. Dafür zuerst das Format und ein zerstörungsfreier Import festlegen; ein PDF allein ist keine editierbare Sicherung.
- Rechtsseiten: der bestehende Zweig `vorbereitung-nur-rechtsseiten` bleibt gesondert erhalten. Vor Veröffentlichung mit den Markenvorlagen abgleichen; keine automatische Übernahme der älteren Werbevorbereitung.
- LFK: Anfrage laut Nutzer abgeschickt, Antwort bislang ausstehend. Kein erneuter Versand durch diese Änderung.
- Finanzierung: GitHub Pages bleibt Hosting-Grundlage. Keine Werbung, kostenpflichtigen Dienste oder neuen Konten hinzugefügt.

## Veröffentlichung

Dieser Zweig kann vor einer Live-Umbenennung geprüft werden. Er enthält keine Domain- oder Kontoumbenennung und keine Änderung der GitHub-Pages-Einstellungen. Das separate Starterbatterie-Repository bleibt unverändert. Vor einem späteren Merge sind die offenen Namens-/Rechtsseitenentscheidungen und die oben genannten Praxistests zu berücksichtigen.
