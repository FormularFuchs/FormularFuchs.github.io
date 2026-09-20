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
- Die beiden Rechtsseiten sind mit bestätigten Betreiberangaben ausgefüllte, noindex-markierte **noch nicht freigegebene** Entwürfe im Entwicklungszweig.

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

**Noch keine Live-Freigabe:** Beide Rechtsseiten zeigen weiterhin den Arbeitsentwurf-Hinweis und `noindex,nofollow`. Der Zweig `main` bleibt unberührt. Vor Übernahme: schnelle unmittelbare Kontaktmöglichkeit zusätzlich zur E-Mail klären, sonstige tatsächlich anwendbare Zusatzpflichten und tatsächliche E-Mail-/Brief-Löschpraxis bestätigen sowie Rechtsseiten im Browser testen. Keine USt-IdNr./W-IdNr./Registereintragung laut Nutzer vorhanden; Anbieter-Datenschutzlinks sind abgeglichen. Markenentscheidung (FormularFuchs vs. Erdilotse/Otterlotse/Rabenlotse) bleibt getrennt. Keine Werbeskripte aktivieren. Die E-Mail-Anmerkung zum Pseudonym zeigt einen leeren Wert zwischen Anführungszeichen; für Post ausschließlich an das Pseudonym zur Sicherheit Anschrift.net fragen.

## Entscheidung zu E-Mail-only und Rechtsrecherche (20.09.2026)

Nutzer möchte zunächst **nur FormularFuchs@genial.ms** anbieten und den rechtlichen Status prüfen. Recherche anhand § 18 Abs. 1 MStV, § 5 Abs. 1 DDG, LFK Baden-Württemberg, IHK Karlsruhe und EuGH C-298/07 ergibt: Bei allein § 18 MStV ist kein zweiter elektronischer Kontaktkanal vorgesehen. Bei einschlägigem § 5 DDG ist E-Mail allein nicht verlässlich ausreichend; keine Telefonnummer zwingend, ein tatsächlich schnell betreutes Online-Formular kann als zusätzliche Alternative genügen. Ein kostenloses öffentliches Angebot ist **nicht automatisch** von § 5 DDG ausgenommen – dauerhaft angebotene Leistungen und künftige Werbung berücksichtigen. Zurzeit ist kein Werbeskript aktiv. Die Einstufung ist noch offen, die alleinige E-Mail wird daher **nicht als generell rechtskonform bestätigt**. Wegen Nutzerwunsch kein Kontaktformular und keine Telefonnummer ohne erneute Zustimmung hinzufügen.

Die staged HTML-Seite nennt nun § 18 MStV und § 5 DDG bedingt; Betreibername, Serviceanschrift, E-Mail unverändert. Eine unbestätigte Rechtsaussage über den genügenden Kontaktweg nicht in die Live-Seite schreiben.

**Postservice-Anbieterangaben jetzt konkret geprüft:** Anschrift.net bestätigt in der FAQ explizit die Annahme von förmlicher Gerichtspost nach ZPO, Behördenpost und Einschreiben, den physischen Workspace-Bezug und die Möglichkeit, die Anschrift für mehrere Projekte zu nutzen. FAQ und Leistungsbeschreibung grenzen das Modell von reiner Postweiterleitung ab; laut Anbieter keine Betriebsstätte, Niederlassung oder Wohnadresse. Die allgemeine frühere Aussage „gerichtliche Zustellung noch unbestätigt, erst Anbieter fragen“ war zu pauschal. Nun nicht wegen eines vermeintlich unbeantworteten Standardpunkts blockieren; tatsächliche Buchungsunterlagen / aktuelle Servicefreigabe prüfen, rechtliche Beurteilung der konkreten Gestaltung bleibt davon getrennt. Für Pseudonym „FormularFuchs“ enthält die Anbieter-Anmerkungsmail leere Anführungszeichen; hier besteht bei reiner Pseudonym-Zustellung tatsächlich Klärungsbedarf.

Belege: https://anschrift.net/faq/ · https://anschrift.net/dein-impressum/ · https://anschrift.net/kontakt/ · https://www.lfk.de/service/dokumente-rechtsgrundlagen/leitfaden-zur-impressumspflicht-im-internet

Quellen: https://www.gesetze-bayern.de/Content/Document/MStV-18 ; https://www.gesetze-im-internet.de/ddg/__5.html ; https://www.lfk.de/service/dokumente-rechtsgrundlagen/leitfaden-zur-impressumspflicht-im-internet ; https://www.ihk.de/karlsruhe/fachthemen/recht/internetrecht/impressumspflichten-6266634 ; https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A62007CJ0298_SUM

## Ergänzung nach Anbieter-FAQ (20.09.2026)

Anschrift.net beantwortet die zuvor als offen dargestellte allgemeine Gerichtspostfrage bereits ausdrücklich: förmliche gerichtliche und behördliche Sendungen werden an die gebuchte c/o-Anschrift angenommen, ein real nutzbarer Workspace ist laut Anbieter Vertragsbestandteil und es gibt ein physisches Standortangebot. FAQ erklärt, dass die Adresse nicht als Wohnort/Firmensitz/Niederlassung genutzt werden darf. Dies sind Anbieterangaben, **keine** unabhängige abschließende rechtliche Garantie für die konkrete Konstellation. Keine weitere Support-Anfrage zu bereits ausdrücklich beantworteten Standardfragen nötig. Was der Betreiber ggf. im Kundenkonto prüfen sollte: Name/Pseudonym richtig hinterlegt, gebuchte Standortnutzung und aktuelle Servicefreigabe.

## Aktualisierte Freigabesperren (20.09.2026, 22:40 Uhr Ortszeit)

1. **Erledigt:** Anschrift.net-Bestellung abgeschlossen, Legitimation bestätigt; Serviceanschrift und Betreibername mit Zustimmung des Nutzers nur in öffentlichen *Entwurfszweig* eingetragen. Keine Privatadresse / Ausweisdatei / Rechnung öffentlich committen.
2. **Erledigt:** Nutzer besitzt für FormularFuchs derzeit keine USt-IdNr., Wirtschafts-ID und keinen Registereintrag. Keine solchen Angaben oder privaten Steuerkennzeichen ergänzen.
3. **Noch zu prüfen:** Nutzer möchte E-Mail-only, was unter § 18 MStV hinsichtlich des Kontaktkanals möglich ist, sofern § 5 DDG nicht zusätzlich greift. Ob § 5 DDG für diese nachhaltig öffentliche kostenlose Formularhilfe schon jetzt gilt, ist offen; bei späterer Werbung ist erneute Prüfung zwingend. Falls § 5 DDG greift, zweiten schnellen Kommunikationsweg mit Nutzer entscheiden. Nicht einfach Telefon- oder Formulardaten erfinden.
4. **Offen:** Wirkliche Lösch-/Aufbewahrungspraxis bei Nutzer-E-Mails und vom Postservice bereitgestellten Briefscans sowie weitere mögliche gesetzliche Zusatzpflichten final mit Betreiber abgleichen.
5. **Erledigt:** Fehlerhafter Link `anschrift.net/datenschutz/` durch den überprüften Link `https://anschrift.net/datenschutzerklaerung/` ersetzt; Postservice-Datenschutzerklärung benennt COCENTER GmbH als Verantwortlichen. WEB.DE-Datenschutzlink überprüft.
6. **Offen:** HTML-Rechtstexte im Browser/Mobilgerät gegen tatsächliche Website prüfen, rechtliche Endabnahme, Entwurfshinweis/`noindex` *erst bei expliziter Live-Freigabe* entfernen. Frühere GitHub Actions prüften die statische Struktur; kein vollständiger Browser-/Rechtstest.
7. **Wichtig:** Website auf `main` ist **schon öffentlich** und besitzt derzeit noch keine erreichbaren Rechtsseiten. Die Rechtsseiten nicht unnötig mit dem noch offenen zukünftigen Markennamen koppeln. Einen **getrennten Minimal-Release der Rechtstexte im bestehenden Namen FormularFuchs** dem Nutzer zur expliziten Zustimmung vorlegen, ohne Werbeplatz oder andere ungetestete Branchänderungen auszurollen.
8. GitHub-Pages-Bedingungen beachten: Die derzeit kostenlosen Projekt-/Vorlagen-Seiten sind anders als ein hauptsächlich kommerzielles SaaS; konkrete monetarisierte Geschäftsmodelle und Werbung vor Aktivierung anhand der Pages-Bedingungen prüfen. Spenden-/Crowdfundinglinks sind laut GitHub in bestimmten Fällen erlaubt, allgemeines Werbenetzwerk damit **nicht pauschal freigegeben**.
9. Markenentscheidung (FormularFuchs vs. Erdilotse, Rabenlotse, Otterlotse) und eventuelle Konto-/URL-Umbenennung getrennt; `localStorage` und `IndexedDB` sind origin-gebunden, daher wichtige Nutzer vor einer Domainmigration auf PDF-Export hinweisen.
10. Anschrift.net-Anmerkung zeigt hinterlegtes Pseudonym als leer („“); für ausschließlich pseudonym adressierte Post erst beim Provider bestätigen lassen. Klarnamensanschrift ist bestätigt. Dienst bei Vertragsende sofort im Impressum aktualisieren.

Quellen: https://www.gesetze-im-internet.de/ddg/__5.html · https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A62007CJ0298_SUM · https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features · https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits · https://anschrift.net/datenschutzerklaerung/ · https://www.gesetze-im-internet.de/ttdsg/__25.html

Die Freigabe eines Impressums ist kein automatisches „Testversion entfernen“ bei den Helfern; das sind zwei getrennte Entscheidungen.
