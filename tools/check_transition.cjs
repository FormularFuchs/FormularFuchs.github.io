const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
global.crypto=require('node:crypto').webcrypto;
const root=path.resolve(__dirname,'..');
const target=path.resolve(root,'../website-integration');
const backup=require(path.join(root,'assets/case-backup.js'));
const bridge=fs.readFileSync(path.join(root,'assets/kramurai-transition.js'),'utf8');
const cases=[['retoure-dokumentieren','formularfuchs-return-v1','retoure'],['router-zurueckgeben','formularfuchs-router-return-v1','router'],['handy-trade-in-dokumentieren','formularfuchs-tradein-v1','tradein']];
const results=[];
function navigate(route,keys,throwStorage=false) {
  let redirected=null,note=null;const events=[];
  const storage={get length(){if(throwStorage)throw Error('storage disabled');return keys.length},key:i=>keys[i]};
  const doc={addEventListener:(name,fn)=>events.push(fn),createElement:()=>({setAttribute(){}}),head:{append(){}},querySelector:()=>({prepend:n=>note=n})};
  vm.runInNewContext(bridge,{location:{pathname:'/'+route+'/index.html',hash:'#details',replace:u=>redirected=u},localStorage:storage,document:doc});
  events.forEach(fn=>fn());return {redirected,note};
}
function template(source) {
  const text=fs.readFileSync(source,'utf8');
  const code=text.match(/const defaultState = \(\) => \(\{[\s\S]*?\n  \}\);/)[0];
  const context={crypto:global.crypto,Date,result:null};vm.runInNewContext(code+' result=defaultState();',context);
  return JSON.parse(JSON.stringify(context.result));
}
(async()=>{
 for(const [route,key,helper] of cases) {
  assert.equal(navigate(route,[]).redirected,'https://kramurai.github.io/'+route+'/#details');
  for(const keys of [[key],[key+':case:old'],[key+'-cases-v2']]) {
   const r=navigate(route,keys);assert.equal(r.redirected,null);assert.match(r.note.innerHTML,/Ausgewählten Vorgang sichern/);
  }
  assert.equal(navigate(route,[],true).redirected,null);
  assert.equal(navigate(route,['unrelated']).redirected,'https://kramurai.github.io/'+route+'/#details');
  const old=template(path.join(root,route,'app.js')),current=template(path.join(target,route,'app.js'));
  old.item.name='Übernahme – Musterfahrzeug / Gerät';old.condition.note='Ältere Angaben bleiben erhalten.';
  old.caseId='migration-test-'+helper;
  const bytes=Uint8Array.from([137,80,78,71,13,10,26,10,0,42]);
  const record={type:'overall',caseId:old.caseId,name:'Musterfoto.png',mime:'image/png',addedAt:new Date().toISOString(),blob:new Blob([bytes],{type:'image/png'})};
  const types=fs.readFileSync(path.join(root,route,'app.js'),'utf8').match(/const photoLabels = \{([\s\S]*?)\n  \};/)[1].match(/^\s*(\w+):/gm).map(s=>s.trim().slice(0,-1));
  const archive=await backup.create(helper,old,[record],template(path.join(root,route,'app.js')),types);
  const parsed=await backup.parse(archive,helper,current,types);
  assert.equal(parsed.state.item.name,old.item.name);assert.equal(parsed.state.condition.note,old.condition.note);
  assert.deepEqual(new Uint8Array(await parsed.files[0].blob.arrayBuffer()),bytes);
  assert.match(fs.readFileSync(path.join(root,route,'app.js'),'utf8'),/DOMContentLoaded", mountTransitionBackup/);
  const html=fs.readFileSync(path.join(root,route,'index.html'),'utf8');
  assert(html.indexOf('/assets/kramurai-transition.js')<html.indexOf('<body'));
  assert(html.indexOf('/assets/case-backup.js')<html.indexOf('/'+route+'/app.js'));
  results.push(route+': redirect, saved-case preservation, storage-error fallback, backup import and exact photo bytes');
 }
 console.log(JSON.stringify({passed:results.length,results},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
