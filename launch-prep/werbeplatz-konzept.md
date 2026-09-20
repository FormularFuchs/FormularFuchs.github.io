# Dezenter Werbeplatz – Konzept, nicht live

**Ziel:** Einige Euro laufende Kosten decken, ohne die kostenlose Nutzung zu beeinträchtigen.

- Werbung nicht während der Formulareingabe und nicht in der erzeugten PDF.
- „PDF speichern“ öffnet ohne Wartezeit den normalen Browser-Druckdialog. Keine vorgeschaltete Pflichtanzeige und kein Countdown.
- Nach Rückkehr aus dem Druckdialog kann auf der finalen Formularseite unterhalb des PDF-Bereichs ein klar mit „Anzeige“ beschrifteter Werbeplatz angezeigt werden. Kein Overlay über Bedienelementen.
- Keine Aussage „PDF erfolgreich gespeichert“, weil `window.print()` und `afterprint` nicht zuverlässig zwischen Speichern und Abbrechen unterscheiden.
- Ein erneuter Klick auf „PDF speichern“ muss jederzeit möglich sein und sollte keine neue Anzeige erzwingen.
- Auf Mobilgeräten responsiv, ausreichend Kontrast und Platz, leicht zu überspringen. Inhalte und Druckdarstellung dürfen sich nicht verschieben.
- Bis ein tatsächlicher Anbieter ausgewählt ist, **keine leere Anzeige in der Live-Seite** und keine externen Skripte.
- Für Direktwerbung: eigenes statisches Werbemittel bevorzugen und prüfen, ob Link/Tracking Datenschutzänderungen benötigen.
- Für Google AdSense: Google-zertifizierte CMP-/TCF-Anforderungen für EWR-Verkehr sowie Publisher-Richtlinien, Platzierungsregeln und die kommerziellen Hosting-Einschränkungen von GitHub Pages prüfen.

Quellen:
https://support.google.com/adsense/answer/13554116?hl=en
https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features
