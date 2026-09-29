const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {IDBFactory, IDBKeyRange} = require('fake-indexeddb');
const {JSDOM} = require('jsdom');
global.IDBKeyRange = IDBKeyRange;
const backup = require('../assets/case-backup.js');
const stamp = '2026-09-29T06:00:00.000Z';
const template = {version:1,caseId:'original',createdAt:stamp,updatedAt:stamp,currentStep:1,item:{name:'Kamera',note:'Zeile 1\nÄÖÜ <script>nicht ausführen</script>'},checked:false};
const types = ['overall','receipt'];
const pdf = new Blob(['%PDF-1.4\nTestbeleg\n%%EOF'],{type:'application/pdf'});
const jpeg = new Blob([Uint8Array.from([255,216,255,224,0,16,255,217])],{type:'image/jpeg'});
const records = [
  {caseId:'original',type:'overall',name:'foto.jpg',mime:'image/jpeg',addedAt:stamp,blob:jpeg},
  {caseId:'original',type:'receipt',name:'beleg.pdf',mime:'application/pdf',addedAt:stamp,blob:pdf}
];
function memoryStorage() {
  const map=new Map();
  return {getItem:key=>map.has(key)?map.get(key):null,setItem:(key,value)=>map.set(key,value),map};
}
async function db() {
  return new Promise((resolve,reject)=>{
    const request=new IDBFactory().open('test',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('files',{keyPath:'key'});
    request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);
  });
}
async function count(database) {
  return new Promise(resolve=>{const req=database.transaction('files').objectStore('files').count();req.onsuccess=()=>resolve(req.result);});
}
const make = () => backup.create('retoure',template,records,template,types);

test('Roundtrip erhält Angaben, Unicode, Foto-/PDF-Bytes und Dateimetadaten',async()=>{
  const result=await backup.parse(await make(),'retoure',template,types);
  assert.deepEqual(result.state,template);
  for(let i=0;i<records.length;i++){
    assert.equal(result.files[i].name,records[i].name);
    assert.equal(result.files[i].addedAt,stamp);
    assert.deepEqual(await result.files[i].blob.arrayBuffer(),await records[i].blob.arrayBuffer());
  }
});
test('Falscher Helfer, Formatversion, Feldtypen und gefährliche Zusatzfelder werden abgewiesen',async()=>{
  const original=JSON.parse(await make());
  for(const mutate of [x=>x.helper='router',x=>x.version=2,x=>x.state.checked='false',x=>x.state.item.extra='ignored',x=>x.state=JSON.parse('{"__proto__":{}}')]){
    const data=structuredClone(original);mutate(data);
    await assert.rejects(backup.parse(JSON.stringify(data),'retoure',template,types));
  }
  assert.equal({}.polluted,undefined);
});
test('Beschädigte JSON-, Base64-, Prüfsummen- und doppelte Dateieinträge werden abgewiesen',async()=>{
  const original=JSON.parse(await make());
  await assert.rejects(backup.parse('{','retoure',template,types));
  for(const mutate of [x=>x.files[0].data='!!!!',x=>x.files[0].sha256='0'.repeat(64),x=>x.files[0].size++,x=>x.files[1]=x.files[0]]){
    const data=structuredClone(original);mutate(data);
    await assert.rejects(backup.parse(JSON.stringify(data),'retoure',template,types));
  }
});
test('Leerer Vorgang lässt sich sichern, aktive Inhalte und zu große Dateien nicht',async()=>{
  assert.equal((await backup.parse(await backup.create('retoure',template,[],template,types),'retoure',template,types)).files.length,0);
  await assert.rejects(backup.create('retoure',template,[{...records[0],mime:'image/svg+xml',blob:new Blob(['<svg/>'])}],template,types));
  await assert.rejects(backup.create('retoure',template,[{...records[0],blob:new Blob([new Uint8Array(21*1024*1024)])}],template,types));
});
test('Mehrfachimport erzeugt neue IDs und lässt vorherige Vorgänge und Dateien unverändert',async()=>{
  const database=await db(), storage=memoryStorage();
  storage.setItem('case:original',JSON.stringify(template));
  const result=await backup.parse(await make(),'retoure',template,types);
  const a=await backup.persist(result,database,'files',storage,'case:');
  const b=await backup.persist(result,database,'files',storage,'case:');
  assert.notEqual(a.caseId,b.caseId);assert.notEqual(a.caseId,'original');
  assert.equal(storage.getItem('case:original'),JSON.stringify(template));
  const files=await backup.readFiles(database,'files',a.caseId);
  assert.equal(files.length,2);assert.equal(await count(database),4);
  assert.deepEqual(await files.find(x=>x.type==='receipt').blob.arrayBuffer(),await pdf.arrayBuffer());
  database.close();
});
test('localStorage-Quota-Fehler entfernt nur die neuen Dateikopien',async()=>{
  const database=await db(), storage=memoryStorage();
  const result=await backup.parse(await make(),'retoure',template,types);
  const existing=await backup.persist(result,database,'files',storage,'case:');
  const before=[...storage.map];
  const failing={getItem:storage.getItem,setItem:()=>{throw new Error('QuotaExceededError');}};
  await assert.rejects(backup.persist(result,database,'files',failing,'case:'),/speicher/i);
  assert.deepEqual([...storage.map],before);assert.equal(await count(database),2);
  assert.equal((await backup.readFiles(database,'files',existing.caseId)).length,2);
  database.close();
});
test('Abgebrochene IndexedDB-Transaktion hinterlässt keinen neuen Vorgang',async()=>{
  const database=await db(),storage=memoryStorage();
  const result=await backup.parse(await make(),'retoure',template,types);
  // Simulate a quota failure during the file transaction (the request itself was accepted).
  const transaction=database.transaction.bind(database);
  database.transaction=(...args)=>{const tx=transaction(...args);queueMicrotask(()=>tx.abort());return tx;};
  await assert.rejects(backup.persist(result,database,'files',storage,'case:'));
  assert.equal(storage.map.size,0);
  database.transaction=transaction;assert.equal(await count(database),0);database.close();
});

const helpers=[['retoure-dokumentieren','retoure','formularfuchs-return-v1'],['router-zurueckgeben','router','formularfuchs-router-return-v1'],['handy-trade-in-dokumentieren','tradein','formularfuchs-tradein-v1']];
async function waitUntil(predicate){for(let i=0;i<100;i++){if(predicate())return;await new Promise(r=>setTimeout(r,10));}throw new Error('UI timeout');}
for(const [folder,helper,prefix] of helpers){
  test(`${helper}: bestehende Helferoberfläche sichert, importiert als Kopie und findet beide nach Neustart`,async()=>{
    const databaseFactory=new IDBFactory();
    let exported;
    function windowSetup(saved){
      const dom=new JSDOM(fs.readFileSync(`${folder}/index.html`,'utf8'),{url:`https://example.test/${folder}/`,runScripts:'outside-only'});
      const w=dom.window;
      Object.defineProperty(w,'crypto',{value:global.crypto});
      w.Blob=global.Blob;w.indexedDB=databaseFactory;w.IDBKeyRange=IDBKeyRange;w.structuredClone=structuredClone;
      w.scrollTo=()=>{};w.alert=message=>{throw new Error(message);};
      w.URL.createObjectURL=blob=>{exported=blob;return 'blob:test';};w.URL.revokeObjectURL=()=>{};
      w.HTMLAnchorElement.prototype.click=function(){};
      if(saved) for(const [key,value] of saved)w.localStorage.setItem(key,value);
      w.eval(fs.readFileSync('assets/case-backup.js','utf8'));
      w.eval(fs.readFileSync(`${folder}/app.js`,'utf8'));
      return w;
    }
    const w=windowSetup();
    try{
      const name=w.document.getElementById('itemName');name.value='Kamera & Zubehör';name.dispatchEvent(new w.Event('input'));
      const before=w.localStorage.getItem(prefix);
      const originalId=JSON.parse(before).caseId;
      const attachmentDb=await new Promise((resolve,reject)=>{
        const request=databaseFactory.open('formularfuchs-local',1);
        request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
      });
      await new Promise((resolve,reject)=>{
        const tx=attachmentDb.transaction('files','readwrite');
        for(const record of records)tx.objectStore('files').put({...record,caseId:originalId,key:originalId+':'+record.type});
        tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);
      });
      w.document.getElementById('backupExportBtn').click();
      await waitUntil(()=>w.document.getElementById('backupStatus').textContent.startsWith('Download gestartet'));
      const archive=await exported.text();assert.equal(JSON.parse(archive).helper,helper);assert.equal(JSON.parse(archive).files.length,2);
      const file=w.document.getElementById('backupFile');
      Object.defineProperty(file,'files',{value:[{size:exported.size,text:()=>Promise.resolve(archive)}],configurable:true});
      file.dispatchEvent(new w.Event('change'));
      await waitUntil(()=>w.document.getElementById('backupStatus').textContent.startsWith('Sicherung als zusätzlicher'));
      assert.equal(w.document.getElementById('caseSelect').options.length,2);
      assert.equal(w.document.getElementById('itemName').value,'Kamera & Zubehör');
      const original=JSON.parse(before);assert.equal(w.localStorage.getItem(prefix+':case:'+original.caseId),before);
      assert.notEqual(w.document.getElementById('caseSelect').value,original.caseId);
      assert.equal(w.document.getElementById('backupExportBtn').disabled,false);
      const importedFiles=await backup.readFiles(attachmentDb,'files',w.document.getElementById('caseSelect').value);
      assert.equal(importedFiles.length,2);
      assert.deepEqual(await importedFiles.find(x=>x.type==='receipt').blob.arrayBuffer(),await pdf.arrayBuffer());
      assert.equal((await backup.readFiles(attachmentDb,'files',originalId)).length,2);
      attachmentDb.close();
      const saved=Object.keys(w.localStorage).map(key=>[key,w.localStorage.getItem(key)]);
      const reopened=windowSetup(saved);
      try{assert.equal(reopened.document.getElementById('caseSelect').options.length,2);assert.equal(reopened.document.getElementById('itemName').value,'Kamera & Zubehör');}
      finally{await new Promise(r=>setTimeout(r,30));reopened.close();}
    }finally{w.close();}
  });
}
