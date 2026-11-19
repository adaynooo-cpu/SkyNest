(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const m=$('.menu'),n=$('.nav-links');
if(m)m.onclick=()=>{const o=n.classList.toggle('open');m.setAttribute('aria-expanded',o);m.setAttribute('aria-label',o?'Close menu':'Open menu');m.textContent=o?'✕':'☰'};
$$('.faq-item').forEach(i=>{const b=$('button',i);b.onclick=()=>{const o=i.classList.toggle('open');b.setAttribute('aria-expanded',o)}});
const tabs=$$('.tabs button');
tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.setAttribute('aria-pressed',x===t));
$$('[data-type]').forEach(c=>c.hidden=!(t.dataset.f==='all'||c.dataset.type===t.dataset.f))});
const f=$('#enquiry');
if(f){
const p=new URLSearchParams(location.search).get('package');
if(p)f.elements.namedItem('package').value=p;
const rules={name:v=>v.trim().length>1||'Enter your full name.',
email:v=>/^\S+@\S+\.\S+$/.test(v)||'Enter a valid email address.',
message:v=>v.trim().length>9||'Tell us a little more (10+ characters).'};
const check=k=>{const el=f.elements.namedItem(k),r=rules[k](el.value);
el.setAttribute('aria-invalid',r!==true);$('#e-'+k).textContent=r===true?'':r;return r===true};
Object.keys(rules).forEach(k=>f.elements.namedItem(k).addEventListener('blur',()=>check(k)));
f.elements.namedItem('movein').min=new Date().toISOString().split('T')[0];
f.onsubmit=e=>{e.preventDefault();if(!Object.keys(rules).map(check).every(Boolean))return;
const d=Object.fromEntries(new FormData(f));
let saved=true;
try{const l=JSON.parse(localStorage.getItem('skynestEnquiries')||'[]');l.push({...d,at:new Date().toISOString()});localStorage.setItem('skynestEnquiries',JSON.stringify(l))}catch(x){saved=false;console.error('Unable to save enquiry in this browser.',x)}
const body=`Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone||'-'}\nPackage: ${d.package}\nMove-in: ${d.movein||'-'}\n\n${d.message}`;
$('#mailto').href='mailto:hello@skynestcoliving.sg?subject='+encodeURIComponent('Enquiry: '+d.package)+'&body='+encodeURIComponent(body);
$('#ok').querySelector('strong').textContent=saved?'Enquiry saved.':'Enquiry prepared, but not saved in this browser.';
$('#ok').classList.add('show');$('#ok').focus();f.reset()};
}})();
