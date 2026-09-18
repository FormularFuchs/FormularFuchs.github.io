(() => {
  "use strict";

  const STORAGE_KEY = "formularfuchs-return-v1";
  const DB_NAME = "formularfuchs-local";
  const STORE_NAME = "files";
  const TOTAL_STEPS = 6;
  const photoLabels = {
    overall: "Gesamtansicht des Artikels",
    serial: "Seriennummer / Typenschild",
    accessories: "Artikel mit komplettem Zubehör",
    openPackage: "Inhalt im offenen Paket",
    protected: "Verpackung / Polsterung",
    closedPackage: "Geschlossenes Paket",
    receipt: "Einlieferungsbeleg"
  };

  const defaultState = () => ({
    version: 1,
    caseId: (crypto.randomUUID ? crypto.randomUUID() : "case-" + Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentStep: 1,
    item: { name: "", manufacturer: "", model: "", serial: "", reason: "" },
    party: { sender: "", recipient: "" },
    condition: { rating: "", note: "" },
    accessories: { powerSupply: false, cable: false, manual: false, originalBox: false, other: "" },
    shipment: { carrier: "", tracking: "", date: "", weight: "" }
  });

  let state = loadState();
  let dbPromise;
  const objectUrls = new Map();

  const form = document.getElementById("returnForm");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const saveStatus = document.getElementById("saveStatus");
  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");
  const finalPrintBtn = document.getElementById("finalPrintBtn");
  const finalBackBtn = document.getElementById("finalBackBtn");
  const startBtn = document.getElementById("startBtn");
  const wizardNav = document.getElementById("wizardNav");

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultState(), ...JSON.parse(raw) };
    } catch (e) {}
    return defaultState();
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveStatus.textContent = "lokal gespeichert";
  }

  function setPath(obj, path, value) {
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }

  function hydrateForm() {
    document.querySelectorAll("[data-field]").forEach(el => {
      const value = getPath(state, el.dataset.field);
      if (value !== undefined && value !== null) el.value = value;
    });
    document.querySelectorAll("[data-radio]").forEach(el => {
      el.checked = getPath(state, el.dataset.radio) === el.value;
    });
    document.querySelectorAll("[data-check]").forEach(el => {
      el.checked = !!getPath(state, el.dataset.check);
    });
  }

  function bindAutosave() {
    document.querySelectorAll("[data-field]").forEach(el => {
      el.addEventListener("input", () => {
        setPath(state, el.dataset.field, el.value);
        saveStatus.textContent = "speichert …";
        saveState();
      });
    });
    document.querySelectorAll("[data-radio]").forEach(el => {
      el.addEventListener("change", () => {
        if (el.checked) {
          setPath(state, el.dataset.radio, el.value);
          saveState();
        }
      });
    });
    document.querySelectorAll("[data-check]").forEach(el => {
      el.addEventListener("change", () => {
        setPath(state, el.dataset.check, el.checked);
        saveState();
      });
    });
  }

  function showStep(step) {
    state.currentStep = Math.max(1, Math.min(TOTAL_STEPS, step));
    document.querySelectorAll(".step").forEach(el => el.classList.toggle("active", Number(el.dataset.step) === state.currentStep));
    progressBar.style.width = ((state.currentStep / TOTAL_STEPS) * 100) + "%";
    progressText.textContent = "Schritt " + state.currentStep + " von " + TOTAL_STEPS;
    backBtn.style.visibility = state.currentStep === 1 ? "hidden" : "visible";
    const isFinal = state.currentStep === TOTAL_STEPS;
    wizardNav.style.display = isFinal ? "none" : "";
    saveState();
    if (state.currentStep === TOTAL_STEPS) renderSummary();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateCurrentStep() {
    if (state.currentStep === 1 && !state.item.name.trim()) {
      const input = document.getElementById("itemName");
      input.focus();
      input.reportValidity();
      return false;
    }
    return true;
  }

  backBtn.addEventListener("click", () => showStep(state.currentStep - 1));
  nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    showStep(state.currentStep + 1);
  });
  finalBackBtn.addEventListener("click", () => showStep(TOTAL_STEPS - 1));
  startBtn.addEventListener("click", () => showStep(1));

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "key" });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  async function putFile(type, blob, meta = {}) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put({
        key: state.caseId + ":" + type,
        caseId: state.caseId,
        type,
        blob,
        mime: blob.type || meta.mime || "",
        name: meta.name || "",
        addedAt: new Date().toISOString()
      });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getFile(type) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(state.caseId + ":" + type);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function deleteCaseFiles(caseId) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) return;
        if (cursor.value.caseId === caseId) cursor.delete();
        cursor.continue();
      };
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  function fileToImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function compressImage(file) {
    const img = await fileToImage(file);
    const max = 1600;
    let w = img.naturalWidth || img.width;
    let h = img.naturalHeight || img.height;
    const scale = Math.min(1, max / Math.max(w, h));
    w = Math.max(1, Math.round(w * scale));
    h = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.drawImage(img, 0, 0, w, h);
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Bild konnte nicht verarbeitet werden")), "image/jpeg", 0.82);
    });
  }

  function setPreview(type, record) {
    const task = document.querySelector('[data-task="' + type + '"]');
    if (!task || !record) return;
    task.classList.add("done");
    const status = task.querySelector(".photo-status");
    status.textContent = record.mime === "application/pdf" ? "PDF gespeichert ✓" : "Foto gespeichert ✓";
    const img = document.querySelector('[data-preview="' + type + '"]');
    if (img && record.mime.startsWith("image/")) {
      if (objectUrls.has(type)) URL.revokeObjectURL(objectUrls.get(type));
      const url = URL.createObjectURL(record.blob);
      objectUrls.set(type, url);
      img.src = url;
      img.classList.add("show");
    } else if (img) {
      img.classList.remove("show");
    }
  }

  async function restorePreviews() {
    for (const type of Object.keys(photoLabels)) {
      try {
        const record = await getFile(type);
        if (record) setPreview(type, record);
      } catch (e) {}
    }
  }

  document.querySelectorAll("[data-photo]").forEach(input => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const type = input.dataset.photo;
      const task = document.querySelector('[data-task="' + type + '"]');
      const status = task.querySelector(".photo-status");
      status.textContent = "wird verarbeitet …";
      try {
        const blob = await compressImage(file);
        await putFile(type, blob, { name: file.name });
        const record = await getFile(type);
        setPreview(type, record);
        saveState();
      } catch (e) {
        status.textContent = "Fehler – bitte erneut versuchen";
      }
    });
  });

  document.querySelectorAll("[data-attachment]").forEach(input => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const type = input.dataset.attachment;
      const task = document.querySelector('[data-task="' + type + '"]');
      const status = task.querySelector(".photo-status");
      status.textContent = "wird gespeichert …";
      try {
        const blob = file.type.startsWith("image/") ? await compressImage(file) : file;
        await putFile(type, blob, { name: file.name, mime: file.type });
        const record = await getFile(type);
        setPreview(type, record);
        saveState();
      } catch (e) {
        status.textContent = "Fehler – bitte erneut versuchen";
      }
    });
  });

  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[ch]));
  const display = value => value && String(value).trim() ? esc(value) : "–";

  function accessoryList() {
    const items = [];
    if (state.accessories.powerSupply) items.push("Netzteil / Ladegerät");
    if (state.accessories.cable) items.push("Kabel / Anschlussleitung");
    if (state.accessories.manual) items.push("Anleitung / Unterlagen");
    if (state.accessories.originalBox) items.push("Originalverpackung");
    if (state.accessories.other) items.push(...state.accessories.other.split("\n").map(x => x.trim()).filter(Boolean));
    return items;
  }

  function row(key, value) {
    return '<div class="summary-row"><div class="summary-key">' + esc(key) + '</div><div>' + display(value) + '</div></div>';
  }

  function formatDate(value) {
    if (!value) return "";
    const parts = String(value).split("-");
    if (parts.length !== 3) return value;
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  function formatWeight(value) {
    const v = String(value || "").trim();
    if (!v) return "";
    if (/[a-zA-Z]/.test(v)) return v;
    return v + " kg";
  }

  async function renderSummary() {
    const summary = document.getElementById("summary");
    const created = document.getElementById("docCreatedDate");
    const updated = document.getElementById("docUpdatedDate");
    if (created) created.textContent = new Date(state.createdAt).toLocaleString("de-DE");
    if (updated) updated.textContent = new Date(state.updatedAt).toLocaleString("de-DE");
    const accessories = accessoryList();
    let html = '<div class="summary-card"><h3>Gegenstand</h3>' +
      row("Bezeichnung", state.item.name) +
      row("Hersteller", state.item.manufacturer) +
      row("Modell", state.item.model) +
      row("Seriennummer / Kennung", state.item.serial) +
      row("Absender", state.party.sender) +
      row("Empfänger", state.party.recipient) +
      row("Rücksendegrund", state.item.reason) +
      '</div>';

    html += '<div class="summary-card"><h3>Zustand und Zubehör</h3>' +
      row("Zustand", state.condition.rating) +
      row("Beschreibung", state.condition.note) +
      row("Mitgesendet", accessories.length ? accessories.join(", ") : "") +
      '</div>';

    html += '<div class="summary-card"><h3>Versand</h3>' +
      row("Paketdienst", state.shipment.carrier) +
      row("Sendungsnummer", state.shipment.tracking) +
      row("Versanddatum", formatDate(state.shipment.date)) +
      row("Paketgewicht", formatWeight(state.shipment.weight)) +
      row("Dokumentation erstellt", new Date(state.createdAt).toLocaleString("de-DE")) +
      row("Zuletzt geändert", new Date(state.updatedAt).toLocaleString("de-DE")) +
      '</div>';

    html += '<div class="summary-card"><h3>Fotodokumentation und Belege</h3><div class="summary-photos" id="summaryPhotos"></div></div>';
    summary.innerHTML = html;

    const photos = document.getElementById("summaryPhotos");
    for (const [type, label] of Object.entries(photoLabels)) {
      const record = await getFile(type);
      if (!record) continue;
      const box = document.createElement("div");
      box.className = "summary-photo";
      if (record.mime.startsWith("image/")) {
        const url = URL.createObjectURL(record.blob);
        const img = document.createElement("img");
        img.src = url;
        img.alt = label;
        box.appendChild(img);
      } else {
        const p = document.createElement("p");
        p.textContent = "Datei: " + (record.name || "PDF-Beleg");
        box.appendChild(p);
      }
      const strong = document.createElement("strong");
      strong.textContent = label;
      box.appendChild(strong);
      const small = document.createElement("div");
      small.className = "hint";
      small.textContent = "dem Vorgang hinzugefügt: " + new Date(record.addedAt).toLocaleString("de-DE");
      box.appendChild(small);
      photos.appendChild(box);
    }
    if (!photos.children.length) photos.innerHTML = '<p class="small">Noch keine Fotos oder Belege hinzugefügt.</p>';
  }

  finalPrintBtn.addEventListener("click", () => {
    window.print();
  });

  document.getElementById("deleteBtn").addEventListener("click", async () => {
    if (!confirm("Diesen lokalen Vorgang einschließlich gespeicherter Fotos und Belege wirklich löschen?")) return;
    const oldCase = state.caseId;
    localStorage.removeItem(STORAGE_KEY);
    try { await deleteCaseFiles(oldCase); } catch (e) {}
    objectUrls.forEach(url => URL.revokeObjectURL(url));
    objectUrls.clear();
    state = defaultState();
    hydrateForm();
    form.reset();
    saveState();
    await restorePreviews();
    showStep(1);
    alert("Der lokale Vorgang wurde gelöscht.");
  });

  hydrateForm();
  bindAutosave();
  restorePreviews();
  showStep(state.currentStep || 1);
})();