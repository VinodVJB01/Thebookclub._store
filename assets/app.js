/* The Book Club storefront */
const xe=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function wrapT(t,max,n){const w=t.replace(/\s+/g,' ').trim().split(' '),L=[];let c='';for(const x of w){if((c+' '+x).trim().length>max&&c){L.push(c);c=x}else c=(c+' '+x).trim()}if(c)L.push(c);if(L.length>n){L.length=n;L[n-1]=L[n-1].slice(0,max-1)+'…'}return L}
function motif(k,h,a,b){const r=i=>((h*(i+7)*2654435761)>>>0)%100/100;let o='';
 if(k==='Fiction'||k==='Poetry'){o+=`<circle cx="${60+r(1)*80}" cy="${40+r(2)*20}" r="${22+r(3)*14}" fill="${a}" opacity=".85"/>`;for(let i=0;i<4;i++)o+=`<path d="M0 ${95+i*16} Q 50 ${70+i*16+r(i)*30} 100 ${95+i*16} T 200 ${95+i*16} V 160 H0Z" fill="${b}" opacity="${.22+i*.12}"/>`}
 else if(k==='Self-Help & Personal Growth'){for(let i=0;i<14;i++){const an=-Math.PI+i*Math.PI/13;o+=`<line x1="100" y1="125" x2="${100+Math.cos(an)*110}" y2="${125+Math.sin(an)*110}" stroke="${a}" stroke-width="3" opacity=".45"/>`}o+=`<circle cx="100" cy="125" r="30" fill="${a}"/>`}
 else if(k==='Business & Leadership'||k==='Money & Investing'){for(let i=0;i<6;i++){const hh=30+i*16+r(i)*14;o+=`<rect x="${22+i*28}" y="${150-hh}" width="20" height="${hh}" rx="3" fill="${a}" opacity="${.5+i*.08}"/>`}o+=`<polyline points="22,120 56,100 84,108 120,70 150,76 182,38" fill="none" stroke="${b}" stroke-width="3"/>`}
 else if(k==='Biography & Memoir'){o+=`<circle cx="100" cy="70" r="30" fill="${a}" opacity=".9"/><path d="M40 160 Q40 105 100 105 Q160 105 160 160Z" fill="${a}" opacity=".9"/><circle cx="100" cy="90" r="78" fill="none" stroke="${b}" stroke-width="2" opacity=".6"/>`}
 else if(k==='History, Politics & Economics'){for(let i=0;i<5;i++)o+=`<rect x="${28+i*32}" y="62" width="14" height="80" fill="${a}" opacity=".8"/>`;o+=`<path d="M20 62 H180 L100 22Z" fill="${a}"/><rect x="20" y="144" width="160" height="10" fill="${a}"/>`}
 else if(k==='Spirituality & Philosophy'||k==='Astrology & Vastu'){for(let i=0;i<8;i++)o+=`<ellipse cx="100" cy="95" rx="12" ry="42" fill="${a}" opacity=".55" transform="rotate(${i*45} 100 95)"/>`;o+=`<circle cx="100" cy="95" r="14" fill="${b}"/><circle cx="100" cy="95" r="62" fill="none" stroke="${a}" stroke-width="1.5"/>`}
 else if(k==='Science, Tech & Nature'||k==='Psychology & Mind'){for(let i=0;i<3;i++)o+=`<ellipse cx="100" cy="95" rx="70" ry="26" fill="none" stroke="${a}" stroke-width="2.5" transform="rotate(${i*60} 100 95)"/>`;o+=`<circle cx="100" cy="95" r="10" fill="${b}"/>`}
 else if(k==='Health & Wellness'||k==='Food & Lifestyle'){for(let i=0;i<5;i++)o+=`<path d="M100 150 Q ${40+i*30} ${90-i*4} 100 ${30+(i%2)*14} Q ${160-i*30} ${90-i*4} 100 150Z" fill="${a}" opacity="${.3+i*.1}" transform="rotate(${(i-2)*22} 100 150)"/>`}
 else{for(let y=0;y<4;y++)for(let x=0;x<5;x++)o+=`<rect x="${24+x*32}" y="${22+y*32}" width="26" height="26" rx="4" fill="${r(x*4+y)>.5?a:b}" opacity="${.25+r(x+y*5)*.6}"/>`}
 return o}
const hx=(h,s,l)=>{s/=100;l/=100;const f=n=>{const k=(n+h/30)%12,a=s*Math.min(l,1-l);return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)};
function art(r){const h=hue(r.t),k=r.gn||(r.cat==='Fiction'?'Fiction':''),a=hx((h+160)%360,75,78),b=hx((h+30)%360,85,62);
 const dev=/[\u0900-\u097F]/.test(r.t),T=wrapT(r.t,dev?11:15,5),au=(r.a||r.a2||'').slice(0,26);
 const fs=dev?19:T.some(x=>x.length>12)?15:17,top=178-(T.length-1)*fs*.5;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hx(h,55,36)}"/><stop offset="1" stop-color="${hx((h+40)%360,60,18)}"/></linearGradient></defs><rect width="200" height="300" fill="url(#g)"/>${motif(k,h,a,b)}<rect x="0" y="${top-fs-8}" width="200" height="${T.length*(fs+4)+20}" fill="#000" opacity=".38"/>${T.map((x,i)=>`<text x="100" y="${top+i*(fs+4)}" text-anchor="middle" font-family="Georgia,'Noto Serif Devanagari','Nirmala UI',Mangal,serif" font-weight="700" font-size="${fs}" fill="#fff">${xe(x)}</text>`).join('')}${au?`<text x="100" y="284" text-anchor="middle" font-family="Arial,'Noto Sans Devanagari','Nirmala UI',sans-serif" font-size="10" letter-spacing="1.2" fill="${a}">${xe(dev&&!/[\u0900-\u097F]/.test(au)?au:au.toUpperCase())}</text>`:''}<rect x="0" y="0" width="9" height="300" fill="#000" opacity=".25"/><rect x="1.5" y="1.5" width="197" height="297" fill="none" stroke="#fff" stroke-opacity=".25"/></svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}

/* ================= The Book Club – storefront ================= */
const IG='thebookclub._store';
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fm=n=>"₹"+Number(n).toLocaleString("en-IN",{maximumFractionDigits:2});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const hue=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;return h};
const N=DATA.length;
DATA.forEach((b,i)=>{b.id=i;b.pr=b.pr==null?null:b.pr;b.lang=b.lg});
const ENR=window.ENRICH||{};

/* ---------- cover finder ----------
   Order: your own original file -> enriched.js (pre-fetched) -> Open Library by ISBN
   -> Google Books by ISBN -> Google Books by title+author -> Open Library title search -> generated art. */
const COVC=ls.get('bc_cov3',{}),METAC=ls.get('bc_meta3',{});
const saveCov=()=>ls.set('bc_cov3',COVC),saveMeta=()=>{try{ls.set('bc_meta3',METAC)}catch(e){}};
const DAY=864e5;
const norm=s=>String(s||'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const toks=s=>norm(s).split(' ').filter(x=>x.length>1);
function titleOK(q,got){const a=toks(q),g=new Set(toks(got));if(!a.length)return false;return a.filter(x=>g.has(x)).length/a.length>=.6}
function authOK(q,arr){if(!q)return true;const a=toks(q).filter(x=>x.length>2);if(!a.length)return true;const g=toks((arr||[]).join(' '));return a.some(x=>g.includes(x))}
function probe(url){return new Promise(res=>{const im=new Image();im.referrerPolicy='no-referrer';let done=false;const f=v=>{if(!done){done=true;res(v)}};
  im.onload=()=>f(im.naturalWidth>=70&&im.naturalHeight>=100?url:null);im.onerror=()=>f(null);setTimeout(()=>f(null),9000);im.src=url})}
async function jget(url){for(let t=0;t<3;t++){try{const r=await fetch(url);if(r.status===429||r.status===503){await sleep(1200*(t+1));continue}if(!r.ok)return null;return await r.json()}catch(e){await sleep(400)}}return null}
const gimg=vi=>{const l=vi&&vi.imageLinks;let u=l&&(l.thumbnail||l.smallThumbnail);return u?u.replace('http:','https:').replace('&edge=curl',''):null};
function pickVol(items,b,qt,strict){if(!items)return null;
  const ok=items.map(x=>x.volumeInfo).filter(vi=>vi&&(!strict||((titleOK(qt,vi.title)||titleOK(qt,(vi.title||'')+' '+(vi.subtitle||'')))&&authOK(b.a2||b.a,vi.authors)||(b.lg==='hi'&&titleOK(qt,vi.title)))));
  return ok.find(v=>gimg(v)&&v.description)||ok.find(v=>gimg(v))||ok[0]||null}
async function googleLookup(b){
  const tries=[];if(b.isbn)tries.push({q:'isbn:'+b.isbn,strict:false,t:b.t});
  const au=b.a2||b.a||'';
  [b.t,b.t2].filter(Boolean).forEach(t=>tries.push({q:`intitle:"${t}"`+(au?` inauthor:"${au}"`:''),strict:true,t,hi:b.lg==='hi'&&t===b.t}));
  for(const x of tries){const j=await jget('https://www.googleapis.com/books/v1/volumes?q='+encodeURIComponent(x.q)+'&maxResults=6&printType=books'+(x.hi?'&langRestrict=hi':''));
    const vi=pickVol(j&&j.items,b,x.t,x.strict);if(vi)return vi;await sleep(150)}
  return null}
function metaFrom(vi){return vi?{d:(vi.description||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,1100),pg:vi.pageCount||0,pub:vi.publishedDate||'',rt:vi.averageRating||0,rc:vi.ratingsCount||0,cat:(vi.categories||[]).join(', '),sub:vi.subtitle||''}:null}
async function olSearch(b){const t=b.lg==='hi'?(b.t2||b.t):b.t,a=b.a2||b.a||'';
  const j=await jget('https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&title='+encodeURIComponent(t)+(a?'&author='+encodeURIComponent(a):''));
  const d=j&&j.docs&&j.docs.find(x=>x.cover_i&&titleOK(t,x.title));return d?`https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg?default=false`:null}
function isbn10(i){i=String(i||'');if(!/^978\d{10}$/.test(i))return /^\d{9}[\dX]$/.test(i)?i:'';const b=i.slice(3,12);let s=0;for(let k=0;k<9;k++)s+=(10-k)*+b[k];const c=(11-s%11)%11;return b+(c===10?'X':c)}
const PEND={};
function findCover(b){return PEND[b.id]||(PEND[b.id]=(async()=>{
  if(b.cv)return b.cv;
  const en=ENR[b.id];if(en&&en.cover)return en.cover;
  const c=COVC[b.id];if(c&&(c.u||Date.now()-c.t<DAY*3))return c.u||null;
  let u=null;
  if(b.isbn)u=await probe(`https://covers.openlibrary.org/b/isbn/${b.isbn}-L.jpg?default=false`);
  const i10=isbn10(b.isbn);
  if(!u&&i10)u=await probe(`https://images-na.ssl-images-amazon.com/images/P/${i10}.01.LZZZZZZZ.jpg`);
  let vi=null;
  if(!u){vi=await googleLookup(b);if(vi){METAC[b.id]=metaFrom(vi);const g=gimg(vi);if(g)u=await probe(g)}}
  if(!u){const o=await olSearch(b);if(o)u=await probe(o)}
  COVC[b.id]={u:u||0,t:Date.now()};if(u)COVC[b.id]={u,t:Date.now()};
  if(vi)saveMeta();saveCov();return u})())}
/* gentle queue so we don't hammer the free APIs */
const QUEUE=[];let running=0;
function enqueue(fn){return new Promise(r=>{QUEUE.push(()=>fn().then(r,()=>r(null)));pump()})}
function pump(){while(running<4&&QUEUE.length){const f=QUEUE.shift();running++;f().finally(()=>{running--;setTimeout(pump,90)})}}
const COVER={};  // id -> resolved url
function paintCover(b,box){if(!box)return;const im=box.querySelector('img.real');
  const apply=u=>{if(!u)return;COVER[b.id]=u;if(im&&im.dataset.u!==u){im.dataset.u=u;im.referrerPolicy='no-referrer';im.onload=()=>im.naturalWidth>=70?im.classList.add('ok'):im.remove();im.onerror=()=>im.remove();im.src=u}};
  if(COVER[b.id])return apply(COVER[b.id]);
  if(b.cv||(ENR[b.id]&&ENR[b.id].cover))return findCover(b).then(apply);
  enqueue(()=>findCover(b)).then(apply)}
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);paintCover(DATA[+e.target.dataset.id],e.target)}}),{rootMargin:'500px'}):null;

/* ---------- state + filtering ---------- */
let lang='en',cat='',gn='',limit=40,list=[];
const PAGE=40;
const H=DATA.map(r=>[r.t,r.t2,r.a,r.a2,r.gn,r.g,r.p,r.isbn,r.b,r.l,r.pr].filter(x=>x!=null&&x!=='').join(' ').toLowerCase());
const inLang=()=>DATA.filter(r=>r.lg===lang);
function fillSelects(){const L=inLang();
  const f=(id,vals,label)=>{const s=$(id),cur=s.value;s.innerHTML=`<option value="">All</option>`+vals.map(v=>`<option>${esc(v)}</option>`).join('');s.value=vals.includes(cur)?cur:''};
  f('g',[...new Set(L.map(r=>r.g))].sort());f('b',[...new Set(L.map(r=>r.b).filter(Boolean))].sort())}
function moveThumb(seg){const on=seg.querySelector('button.on'),th=seg.querySelector('.th');if(!on||!th)return;th.style.width=on.offsetWidth+'px';th.style.transform=`translateX(${on.offsetLeft}px)`}
function segCounts(){setTimeout(()=>moveThumb($('seg')),0);const L=inLang(),f=L.filter(r=>r.cat==='Fiction').length;const b=$('seg').children;b[1].textContent='All ('+L.length+')';b[2].textContent='Fiction ('+f+')';b[3].textContent='Non-Fiction ('+(L.length-f)+')'}
function chips(){const box=$('gchips');if(cat!=='Non-Fiction'){box.hidden=true;box.innerHTML='';return}
  const m=new Map();inLang().filter(r=>r.cat==='Non-Fiction').forEach(r=>{const k=r.gn||'Other';m.set(k,(m.get(k)||0)+1)});
  const tot=[...m.values()].reduce((a,b)=>a+b,0);
  box.innerHTML=`<button data-g="" class="${gn?'':'on'}">All genres (${tot})</button>`+[...m].sort((a,b)=>b[1]-a[1]).map(([g,c])=>`<button data-g="${esc(g)}" class="${gn===g?'on':''}">${esc(g)} (${c})</button>`).join('');box.hidden=false}
const SORT={feat:(a,b)=>a.id-b.id,lo:(a,b)=>(a.pr??1e9)-(b.pr??1e9)||a.id-b.id,hi:(a,b)=>(b.pr??-1)-(a.pr??-1)||a.id-b.id,az:(a,b)=>a.t.localeCompare(b.t)};
function refilter(reset=true){
  const q=norm($('q').value).split(' ').filter(Boolean),g=$('g').value,b=$('b').value,mn=parseFloat($('min').value),mx=parseFloat($('max').value);
  list=DATA.filter(r=>r.lg===lang&&(!cat||r.cat===cat)&&(!gn||r.gn===gn)&&(!g||r.g===g)&&(!b||r.b===b)&&(isNaN(mn)||(r.pr!=null&&r.pr>=mn))&&(isNaN(mx)||(r.pr!=null&&r.pr<=mx))&&q.every(w=>H[r.id].includes(w))).sort(SORT[$('s').value]);
  if(reset)limit=PAGE;render()}
function cardHTML(b,i){const q=cart.get(b.id)||0,sub=b.lg==='hi'&&b.t2?b.t2:'';
  return `<article class="card${q?' in':''}" data-id="${b.id}" style="--d:${Math.min(i,14)}" tabindex="0" role="button" aria-label="${esc(b.t)} – view details">
  <div class="cv" data-id="${b.id}"><img class="art" alt="" src="${art(b)}" loading="lazy"><img class="real" alt="Cover of ${esc(b.t)}" decoding="async"><span class="tag">${esc(b.gn&&b.cat!=='Fiction'?b.gn.split(' & ')[0].split(',')[0]:b.cat)}</span></div>
  <div class="bd"><h3 title="${esc(b.t)}">${esc(b.t)}</h3><p class="au">${esc(b.a||b.a2||'')}</p>
  <div class="row"><b class="pr">${b.pr==null?'—':fm(b.pr)+(b.est?'*':'')}</b><div class="ctl">${ctl(b.id)}</div></div></div></article>`}
function ctl(id){const q=cart.get(id)||0;if(DATA[id].pr==null)return '';return q?`<div class="stp"><button data-a="dec" aria-label="Remove one">−</button><b>${q}</b><button data-a="inc" aria-label="Add one">+</button></div>`:`<button class="add" data-a="inc">Add</button>`}
const grid=$('grid');
function render(){
  const shown=list.slice(0,limit);
  grid.innerHTML=shown.map(cardHTML).join('');
  grid.querySelectorAll('.cv').forEach(el=>io?io.observe(el):paintCover(DATA[+el.dataset.id],el));
  $('cnt').textContent=`Showing ${shown.length} of ${list.length} books`+(lang==='hi'?'  ·  * estimated price':'');
  $('none').hidden=list.length>0;$('more').hidden=limit>=list.length;
}
function appendMore(){if(limit>=list.length)return;const from=limit;limit=Math.min(limit+PAGE,list.length);
  const frag=document.createElement('div');frag.innerHTML=list.slice(from,limit).map((b,i)=>cardHTML(b,i)).join('');
  [...frag.children].forEach(el=>{grid.appendChild(el);const c=el.querySelector('.cv');io?io.observe(c):paintCover(DATA[+c.dataset.id],c)});
  $('cnt').textContent=`Showing ${limit} of ${list.length} books`+(lang==='hi'?'  ·  * estimated price':'');$('more').hidden=limit>=list.length}
$('more').onclick=appendMore;
if('IntersectionObserver' in window)new IntersectionObserver(es=>{if(es[0].isIntersecting)appendMore()},{rootMargin:'700px'}).observe($('sentinel'));
let tm;$('q').addEventListener('input',()=>{$('qx').hidden=!$('q').value;clearTimeout(tm);tm=setTimeout(()=>{refilter();if($('q').value&&scrollY<300)$('shop').scrollIntoView({behavior:RM?'auto':'smooth'})},140)});
['g','b','min','max','s'].forEach(i=>$(i).addEventListener('input',()=>refilter()));
$('seg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cat=b.dataset.c;gn='';[...$('seg').querySelectorAll('button')].forEach(x=>x.classList.toggle('on',x===b));moveThumb($('seg'));chips();refilter()});
$('gchips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;gn=b.dataset.g;chips();refilter()});
$('lang').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.dataset.l===lang)return;lang=b.dataset.l;
  [...$('lang').querySelectorAll('button')].forEach(x=>x.classList.toggle('on',x===b));moveThumb($('lang'));
  cat='';gn='';[...$('seg').querySelectorAll('button')].forEach((x,i)=>x.classList.toggle('on',i===0));moveThumb($('seg'));
  $('g').value='';$('b').value='';fillSelects();segCounts();chips();refilter()});
function resetAll(){['q','min','max'].forEach(i=>$(i).value='');$('qx').hidden=true;$('g').value='';$('b').value='';$('s').value='feat';cat='';gn='';[...$('seg').querySelectorAll('button')].forEach((x,i)=>x.classList.toggle('on',i===0));moveThumb($('seg'));chips();refilter()}
$('qx').onclick=()=>{$('q').value='';$('qx').hidden=true;refilter();$('q').focus()};
$('reset').onclick=$('reset2').onclick=resetAll;
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('q').focus()}});

/* tilt (mouse only) */
let tiltEl=null;
grid.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||RM)return;const c=e.target.closest('button')?null:e.target.closest('.card');if(tiltEl&&tiltEl!==c){tiltEl.style.removeProperty('--rx');tiltEl.style.removeProperty('--ry')}tiltEl=c;if(!c)return;
  const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',(x*7).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});
grid.addEventListener('pointerleave',()=>{if(tiltEl){tiltEl.style.removeProperty('--rx');tiltEl.style.removeProperty('--ry')}});

/* ---------- cart ---------- */
const cart=new Map();
(ls.get('bc_cart',[])||[]).forEach(([id,q])=>{if(DATA[id]&&DATA[id].pr!=null&&q>0)cart.set(id,q)});
const saveCart=()=>ls.set('bc_cart',[...cart]);
function refreshCard(id){const el=grid.querySelector(`.card[data-id="${id}"]`);if(el){el.classList.toggle('in',(cart.get(id)||0)>0);el.querySelector('.ctl').innerHTML=ctl(id)}
  const sb=$('sbody').querySelector(`[data-buy="${id}"]`);if(sb)sb.innerHTML=buyHTML(DATA[id])}
function setQty(id,q,quiet){q=Math.max(0,Math.min(99,q));const was=cart.get(id)||0;q?cart.set(id,q):cart.delete(id);copied=false;refreshCard(id);renderCart();saveCart();if(q>was&&!quiet)toast('Added to cart');}
grid.addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(b){e.stopPropagation();const id=+b.closest('.card').dataset.id,q=cart.get(id)||0;return setQty(id,b.dataset.a==='inc'?q+1:q-1,true)}
  const c=e.target.closest('.card');if(c)openBook(+c.dataset.id)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('card')){e.preventDefault();openBook(+e.target.dataset.id)}});
$('items').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b){const id=+b.dataset.id,q=cart.get(id)||0;return setQty(id,b.dataset.a==='inc'?q+1:b.dataset.a==='dec'?q-1:0,true)}
  const n=e.target.closest('.nm');if(n)openBook(+n.dataset.id)});
$('clr').onclick=()=>{const ids=[...cart.keys()];cart.clear();ORD=null;ids.forEach(refreshCard);renderCart();saveCart();copied=false};
const MOODS=[[0,'📚','Pick your first book'],[1,'🙂','Nice start'],[2,'😊','Good choice'],[3,'😃','Great picks'],[4,'🤩','Wow, lovely haul'],[5,'🥳','Awesome haul'],[6,'🔥','You\'re on fire'],[8,'🚀','Super reader'],[10,'🤯','Legendary library']];
let lastN=-1;
function totals(){let c=0,t=0;for(const [id,q] of cart){c+=q;t+=(DATA[id].pr||0)*q}return{c,t}}
function thumb(b){return `<div class="cv" data-id="${b.id}"><img class="art" alt="" src="${art(b)}"><img class="real${COVER[b.id]?' ok':''}" alt="" ${COVER[b.id]?`src="${esc(COVER[b.id])}"`:''}></div>`}
function renderCart(){
  const {c,t}=totals();
  $('items').innerHTML=cart.size?[...cart].map(([id,q])=>{const r=DATA[id];return `<div class="it"><div>${thumb(r)}</div><div><div class="nm" data-id="${id}" title="${esc(r.t)}">${esc(r.t)}</div><div class="au">${esc(r.a||r.a2||'')}</div><div class="sb"><div class="stp"><button data-a="dec" data-id="${id}" aria-label="Remove one">−</button><b>${q}</b><button data-a="inc" data-id="${id}" aria-label="Add one">+</button></div><span class="tt">${fm(r.pr*q)}</span></div></div><button class="rm" data-a="rm" data-id="${id}" aria-label="Remove ${esc(r.t)}">✕</button></div>`}).join(''):`<div class="empty"><span>🛍️</span>Your cart is empty.<br>Add a book to get started.</div>`;
  $('items').querySelectorAll('.it .cv').forEach(el=>{const b=DATA[+el.dataset.id];if(!COVER[b.id])paintCover(b,el);else{const im=el.querySelector('.real');im.src=COVER[b.id];im.classList.add('ok')}});
  $('cc').textContent=c;$('cn').textContent=`${c} book${c===1?'':'s'}`;$('ct').textContent=fm(t);$('checkout').classList.toggle('off',!c);
  let m=MOODS[0];for(const x of MOODS)if(c>=x[0])m=x;$('mw').textContent=m[2];$('mb').style.transform=`scaleX(${Math.min(c/10,1)})`;
  if($('em').textContent!==m[1]){$('em').textContent=m[1];if(!RM)$('em').animate([{transform:'scale(.6) rotate(-14deg)'},{transform:'scale(1.3) rotate(8deg)',offset:.55},{transform:'scale(1)'}],{duration:480,easing:'cubic-bezier(.34,1.45,.5,1)'})}
  if(!RM&&lastN>=0&&c!==lastN){$('cartBtn').classList.remove('bump');void $('cartBtn').offsetWidth;$('cartBtn').classList.add('bump')}
  lastN=c;updateOrder();
}

/* ---------- layers ---------- */
const stack=[];
function openLayer(id){const el=$(id);if(el.classList.contains('open'))return;el.classList.add('open');el.setAttribute('aria-hidden','false');stack.push(id);document.documentElement.classList.add('lock')}
function closeLayer(id){const el=$(id);if(!el.classList.contains('open'))return;el.classList.remove('open');el.setAttribute('aria-hidden','true');const i=stack.indexOf(id);if(i>-1)stack.splice(i,1);if(!stack.length)document.documentElement.classList.remove('lock')}
document.querySelectorAll('.layer').forEach(l=>l.addEventListener('click',e=>{if(e.target.closest('[data-close]'))id_close(l.id)}));
function id_close(id){if(id==='sheet')closeBook();else closeLayer(id)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&stack.length)id_close(stack[stack.length-1])});
$('cartBtn').onclick=()=>{renderCart();openLayer('cart')};
$('browse').addEventListener('click',e=>{e.preventDefault();$('shop').scrollIntoView({behavior:RM?'auto':'smooth'})});

/* ---------- book detail ---------- */
let pushed=false,curBook=null;
function buyHTML(b){const q=cart.get(b.id)||0;if(b.pr==null)return `<div class="price">Price on request</div><p class="mut">Message us on Instagram to ask about this title.</p>`;
  return `<div class="price">${fm(b.pr)}${b.est?'*':''}<small>${b.est?'estimated, confirmed by seller':'per copy'}</small></div>
  <div class="perks"><span>Pan-India shipping</span><span>Order via Instagram DM</span></div>
  <div class="bbtns">${q?`<div class="stp"><button data-a="dec" aria-label="Remove one">−</button><b>${q}</b><button data-a="inc" aria-label="Add one">+</button></div><button class="btn ghost" data-a="cart">View cart</button><button class="btn pri" data-a="buy">Checkout</button>`:`<button class="btn ghost" data-a="inc">Add to cart</button><button class="btn pri" data-a="buy">Buy now</button>`}</div>`}
function specRows(b,m){const rows=[['Title',b.t+(b.t2?` (${b.t2})`:'')],['Author',[b.a,b.a2].filter(Boolean).join(' · ')],['Publisher',b.p||b.g],['Binding',b.b],['Language',b.l||(b.lg==='hi'?'Hindi':'English')],['Genre',b.gn||b.cat],['Pages',m&&m.pg?m.pg:''],['Published',m&&m.pub?m.pub:''],['ISBN',b.isbn]];
  return rows.filter(r=>r[1]).map(r=>`<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join('')}
function fallbackAbout(b){const g=b.gn||b.cat,au=b.a||b.a2;return `${b.t}${au?` by ${au}`:''} — a ${g.toLowerCase()} title in ${b.lg==='hi'?'Hindi':'English'}${b.g&&b.lg!=='hi'?`, published by ${b.g}`:''}. A full description wasn't found for this edition; message us on Instagram and we'll gladly tell you more.`}
function related(b){const same=DATA.filter(r=>r.lg===b.lg&&r.id!==b.id&&((b.a&&r.a===b.a)||(b.gn&&r.gn===b.gn&&r.cat===b.cat)||(!b.gn&&r.cat===b.cat)));
  same.sort((x,y)=>((y.a===b.a)-(x.a===b.a))||((y.cv?1:0)-(x.cv?1:0))||x.id-y.id);return same.slice(0,14)}
function openBook(id,fromHash){const b=DATA[id];if(!b)return;curBook=b;
  const rel=related(b);
  $('sbody').innerHTML=`<div class="d"><div class="d-cv"><div class="cv" data-id="${id}"><img class="art" alt="" src="${art(b)}"><img class="real" alt="Cover of ${esc(b.t)}" decoding="async"></div></div>
  <div><h2>${esc(b.t)}</h2>${b.t2?`<p class="sub">${esc(b.t2)}</p>`:''}<p class="by">by <b>${esc([b.a,b.a2].filter(Boolean).join(' · ')||'Unknown author')}</b></p><div class="rate" id="rate"></div>
  <div class="buy" data-buy="${id}">${buyHTML(b)}</div>
  <h4>About this book</h4><div id="about"><div class="skl" style="width:96%"></div><div class="skl" style="width:88%"></div><div class="skl" style="width:60%"></div></div>
  <h4>Product details</h4><dl class="spec" id="spec">${specRows(b,null)}</dl></div></div>
  ${rel.length?`<h4 style="margin:26px 0 8px;font-size:17px">You might also like</h4><div class="rel">${rel.map(r=>`<div class="rc" data-id="${r.id}">${thumb(r).replace('class="cv"','class="cv" data-rel="1"')}<p>${esc(r.t)}</p><small>${r.pr==null?'':fm(r.pr)}</small></div>`).join('')}</div>`:''}`;
  $('sbody').scrollTop=0;
  // cover: use the best resolution available
  const box=$('sbody').querySelector('.d-cv .cv');
  const show=u=>{if(!u)return;const im=box.querySelector('.real');const hi=u.includes('books.google')?u.replace(/zoom=\d/,'zoom=0'):u;im.referrerPolicy='no-referrer';im.onload=()=>im.classList.add('ok');im.onerror=()=>{if(im.src!==u){im.src=u}else im.remove()};im.src=hi};
  if(COVER[id])show(COVER[id]);else findCover(b).then(u=>{if(u)COVER[id]=u;show(u)});
  $('sbody').querySelectorAll('.rc .cv').forEach(el=>paintCover(DATA[+el.dataset.id],el));
  // description + rating
  loadMeta(b).then(m=>{if(curBook!==b)return;const a=$('about');if(!a)return;
    a.innerHTML=`<p class="about">${esc(m&&m.d?m.d:fallbackAbout(b))}</p>`+(m&&m.d?`<p class="mut" style="font-size:12px;margin:6px 0 0">Description via Google Books</p>`:'');
    $('spec').innerHTML=specRows(b,m);
    if(m&&m.rt){$('rate').innerHTML=`<span class="stars" style="--p:${m.rt/5*100}" aria-label="${m.rt} out of 5">★★★★★</span><span>${m.rt.toFixed(1)}${m.rc?` · ${m.rc} ratings`:''} on Google Books</span>`}
    if(m&&m.sub&&!b.t2){const h=$('sbody').querySelector('h2');h.insertAdjacentHTML('afterend',`<p class="sub">${esc(m.sub)}</p>`)}});
  openLayer('sheet');
  if(!fromHash){location.hash='b'+id;pushed=true}
}
async function loadMeta(b){const en=ENR[b.id];if(en&&en.d!==undefined)return{d:en.d,pg:en.pg,pub:en.pub,rt:en.rt,rc:en.rc,sub:en.sub};
  if(METAC[b.id])return METAC[b.id];
  const vi=await enqueue(()=>googleLookup(b));const m=metaFrom(vi);METAC[b.id]=m||{d:''};saveMeta();return METAC[b.id]}
function closeBook(){if(pushed){pushed=false;history.back();return}closeLayer('sheet');curBook=null;if(/^#b\d+/.test(location.hash))history.replaceState(null,'',location.pathname+location.search)}
addEventListener('hashchange',()=>{const m=location.hash.match(/^#b(\d+)$/);if(m){if(curBook&&curBook.id===+m[1]&&$('sheet').classList.contains('open'))return;openBook(+m[1],true)}else if($('sheet').classList.contains('open')){pushed=false;closeLayer('sheet');curBook=null}});
$('sbody').addEventListener('click',e=>{const rc=e.target.closest('.rc');if(rc){const id=+rc.dataset.id;pushed=false;openBook(id,true);history.replaceState(null,'','#b'+id);return}
  const a=e.target.closest('[data-a]');if(!a||!curBook)return;const id=curBook.id,q=cart.get(id)||0,k=a.dataset.a;
  if(k==='inc')setQty(id,q+1);else if(k==='dec')setQty(id,q-1,true);else if(k==='cart'){renderCart();openLayer('cart')}
  else if(k==='buy'){if(!q)setQty(id,1,true);startCheckout()}});
/* swipe-down to close (mobile sheet) */
{const g=$('grab'),p=document.querySelector('.sheetp');let y0=null,dy=0;
 g.addEventListener('touchstart',e=>{y0=e.touches[0].clientY;p.style.transition='none'},{passive:true});
 g.addEventListener('touchmove',e=>{if(y0==null)return;dy=Math.max(0,e.touches[0].clientY-y0);p.style.transform=`translateY(${dy}px)`},{passive:true});
 g.addEventListener('touchend',()=>{if(y0==null)return;p.style.transition='';p.style.transform='';if(dy>110)closeBook();y0=null;dy=0})}

/* ---------- checkout: details -> copy -> place ---------- */
let ORD=null,ODATE='',step=1,copied=false;
const cust=()=>({n:$('fn').value.trim(),p:$('fp').value.trim(),a:$('fa').value.trim(),m:$('fnote').value.trim()});
function ensureOid(){if(ORD)return;const d=new Date();ORD='BC'+String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'-'+Math.floor(1000+Math.random()*9000);
  try{ODATE=d.toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit'})}catch(e){ODATE=d.toString()}}
function orderText(){ensureOid();const {c,t}=totals(),u=cust();
  const lines=[...cart].map(([id,q],i)=>{const r=DATA[id],au=r.a||r.a2||'';
    const info=[au&&'Author: '+au+(r.a&&r.a2?' ('+r.a2+')':''),'Publisher: '+(r.p||r.g),r.b&&'Binding: '+r.b,r.lg==='hi'&&'Language: Hindi',r.isbn&&'ISBN: '+r.isbn].filter(Boolean).join(' | ');
    return `${i+1}. ${r.t}${r.t2?' ('+r.t2+')':''}\n   ${info}\n   ${q} × ${fm(r.pr)}${r.est?'*':''} = ${fm(r.pr*q)}`});
  return [`📚 NEW ORDER – @${IG}`,`Order ID: ${ORD}`,`Date: ${ODATE}`,'','👤 CUSTOMER DETAILS',`Name: ${u.n||'-'}`,`Phone: ${u.p||'-'}`,`Address: ${u.a||'-'}`,...(u.m?[`Note: ${u.m}`]:[]),'',
    `🛒 BOOKS (${cart.size} title${cart.size===1?'':'s'}, ${c} cop${c===1?'y':'ies'})`,lines.join('\n'),'',`💰 TOTAL: ${fm(t)}`,...([...cart.keys()].some(id=>DATA[id].est)?['* estimated price – please confirm']:[])].join('\n')}
function updateOrder(){$('fb').value=cart.size?orderText():'Your cart is empty.';$('mini').textContent=`${totals().c} book${totals().c===1?'':'s'} · Total ${fm(totals().t)}`}
function setStep(n){step=n;document.querySelectorAll('#co .pane').forEach(s=>s.classList.toggle('on',+s.dataset.s===n));
  document.querySelectorAll('#steps li').forEach(li=>{const s=+li.dataset.s;li.classList.toggle('on',s===n);li.classList.toggle('done',s<n)});
  $('back').style.visibility=n===1?'hidden':'visible';
  $('next').hidden=n===3;$('next').textContent=n===1?'Continue':'Continue';
  $('next').classList.toggle('off',n===2&&!copied);
  if(n===2){updateOrder();$('copy').textContent=copied?'Copied ✓  Copy again':'Copy order'}}
function missing(){const u=cust();const bad=[['fn',!u.n],['fp',u.p.replace(/\D/g,'').length<7],['fa',u.a.length<8]];
  bad.forEach(([i,m])=>$(i).classList.toggle('bad',m));const f=bad.find(x=>x[1]);if(f)$(f[0]).focus({preventScroll:false});return !!f}
function startCheckout(){if(!cart.size)return toast('Add a book first 📚');copied=false;setStep(1);openLayer('co')}
$('checkout').onclick=startCheckout;
$('next').onclick=()=>{if(step===1){if(missing()){return toast('Please fill in name, phone and address')}copied=false;setStep(2);return}
  if(step===2&&copied)setStep(3)};
$('back').onclick=()=>{if(step>1)setStep(step-1)};
['fn','fp','fa','fnote'].forEach(i=>$(i).addEventListener('input',()=>{$(i).classList.remove('bad');copied=false}));
try{localStorage.removeItem('bc_cust')}catch(e){}  /* older versions saved name/phone/address in this browser – wipe it */
function clearCust(){['fn','fp','fa','fnote'].forEach(i=>$(i).value='');ORD=null;copied=false;$('fb').value=''}
async function copyText(text){let ok=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);ok=true}}catch(e){}
  if(!ok){try{const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:0;left:0;opacity:0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,1e6);ok=document.execCommand('copy');ta.remove()}catch(e){}}
  return ok}
async function doCopy(){const ok=await copyText(orderText());
  if(ok){copied=true;toast('Order copied ✓');$('manual').hidden=true;setStep(step===2?2:step);if(step===2){$('copy').textContent='Copied ✓  Copy again';$('next').classList.remove('off')}}
  else{$('fb').focus();$('fb').select();$('manual').hidden=false;toast('Copy blocked — long-press the text to copy it')}return ok}
$('copy').onclick=doCopy;
$('recopy').onclick=doCopy;
$('manual').onclick=()=>{copied=true;$('manual').hidden=true;$('copy').textContent='Copied ✓';$('next').classList.remove('off');toast('Great — continue to place your order')};
$('dm').addEventListener('click',e=>{if(!copied){e.preventDefault();setStep(2);return toast('Copy your order first')}setTimeout(()=>{clearCust();closeLayer('co');toast('Paste the order in Instagram and tap send')},600)});;

/* ---------- toast ---------- */
let tt;function toast(m){const e=$('toast');e.textContent=m;e.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('show'),2200)}

/* ---------- hero stat ---------- */
$('st1').textContent=N.toLocaleString('en-IN');

/* ---------- init ---------- */
fillSelects();segCounts();chips();refilter();renderCart();
addEventListener('load',()=>{moveThumb($('lang'));moveThumb($('seg'))});addEventListener('resize',()=>{moveThumb($('lang'));moveThumb($('seg'))});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{moveThumb($('lang'));moveThumb($('seg'))});
moveThumb($('lang'));moveThumb($('seg'));
{const m=location.hash.match(/^#b(\d+)$/);if(m)openBook(+m[1],true)}

/* short search placeholder on narrow screens so it never gets cut off */
{const mq=matchMedia('(max-width:700px)'),f=()=>{$('q').placeholder=mq.matches?'Search books':'Search title, author, ISBN…'};f();(mq.addEventListener?mq.addEventListener('change',f):mq.addListener(f))}
