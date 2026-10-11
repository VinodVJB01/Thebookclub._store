#!/usr/bin/env node
/**
 * Downloads the real cover image + description for every book and writes them into the repo,
 * so the website shows them instantly (no waiting on third-party APIs) and they never disappear.
 *
 * Source order for each cover (best first):
 *   1. Your own file already in /covers            (kept untouched)
 *   2. Open Library, exact ISBN match, then Amazon image by ISBN-10
 *   3. Google Books, exact ISBN match
 *   4. Google Books, title + author match (verified – wrong books are rejected)
 *   5. Open Library title + author search (verified)
 *
 * Usage:   node tools/fetch-covers.mjs            (needs Node 18+, run from the repo root)
 * Options: RETRY=1            also retry books that had no cover last time
 *          LIMIT=100          only process this many books this run
 *          GOOGLE_BOOKS_KEY=… optional free API key (higher Google Books quota)
 * It is resumable: re-run it any time and it only does the remaining books.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const KEY = process.env.GOOGLE_BOOKS_KEY ? `&key=${process.env.GOOGLE_BOOKS_KEY}` : '';
const LIMIT = +process.env.LIMIT || Infinity;
const RETRY = !!process.env.RETRY;
const UA = { 'User-Agent': 'TheBookClubStore/1.0 (cover sync)' };

const DATA = vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/books.js'), 'utf8') + ';DATA');
DATA.forEach((b, i) => (b.id = i));
let ENR = {};
try { ENR = vm.runInNewContext('var window={};' + fs.readFileSync(path.join(ROOT, 'assets/enriched.js'), 'utf8') + ';window.ENRICH') || {}; } catch { }
fs.mkdirSync(path.join(ROOT, 'covers'), { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const toks = s => norm(s).split(' ').filter(x => x.length > 1);
const titleOK = (q, got) => { const a = toks(q), g = new Set(toks(got)); return a.length > 0 && a.filter(x => g.has(x)).length / a.length >= 0.6; };
const authOK = (q, arr) => { if (!q) return true; const a = toks(q).filter(x => x.length > 2); if (!a.length) return true; const g = toks((arr || []).join(' ')); return a.some(x => g.includes(x)); };

let googleBlocked = false;
async function jget(url) {
  for (let t = 0; t < 4; t++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.status === 429 || r.status === 503) { await sleep(2500 * (t + 1)); if (t === 3 && url.includes('googleapis')) googleBlocked = true; continue; }
      if (!r.ok) return null;
      return await r.json();
    } catch { await sleep(600); }
  }
  return null;
}
async function image(url) {
  if (!url) return null;
  try {
    const r = await fetch(url, { headers: UA });
    if (!r.ok) return null;
    const type = (r.headers.get('content-type') || '').toLowerCase();
    if (!type.startsWith('image/')) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 4500) return null; // blank / "image not available" placeholders are tiny
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('gif') ? 'gif' : 'jpg';
    return { buf, ext };
  } catch { return null; }
}
const gUrl = vi => { const l = vi && vi.imageLinks; const u = l && (l.extraLarge || l.large || l.medium || l.thumbnail || l.smallThumbnail); return u ? u.replace('http:', 'https:').replace('&edge=curl', '') : null; };
function isbn10(i) { i = String(i || ''); if (!/^978\d{10}$/.test(i)) return /^\d{9}[\dX]$/.test(i) ? i : ''; const b = i.slice(3, 12); let s = 0; for (let k = 0; k < 9; k++) s += (10 - k) * +b[k]; const c = (11 - s % 11) % 11; return b + (c === 10 ? 'X' : c); }
async function googleImage(vi) {
  const base = gUrl(vi); if (!base) return null;
  for (const z of [3, 2, 1]) { const im = await image(base.replace(/zoom=\d/, 'zoom=' + z)); if (im) return im; }
  return null;
}
function pickVol(items, b, qt, strict) {
  if (!items) return null;
  const ok = items.map(x => x.volumeInfo).filter(vi => vi && (!strict || ((titleOK(qt, vi.title) || titleOK(qt, (vi.title || '') + ' ' + (vi.subtitle || ''))) && authOK(b.a2 || b.a, vi.authors) || (b.lg === 'hi' && titleOK(qt, vi.title)))));
  return ok.find(v => gUrl(v) && v.description) || ok.find(v => gUrl(v)) || ok[0] || null;
}
async function googleLookup(b) {
  if (googleBlocked) return null;
  const tries = [];
  if (b.isbn) tries.push({ q: 'isbn:' + b.isbn, strict: false, t: b.t });
  const au = b.a2 || b.a || '';
  [b.t, b.t2].filter(Boolean).forEach(t => tries.push({ q: `intitle:"${t}"` + (au ? ` inauthor:"${au}"` : ''), strict: true, t, hi: b.lg === 'hi' && t === b.t }));
  for (const x of tries) {
    const j = await jget('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(x.q) + '&maxResults=6&printType=books' + (x.hi ? '&langRestrict=hi' : '') + KEY);
    const vi = pickVol(j && j.items, b, x.t, x.strict);
    if (vi) return vi;
    await sleep(200);
  }
  return null;
}
async function olSearch(b) {
  const t = b.lg === 'hi' ? (b.t2 || b.t) : b.t, a = b.a2 || b.a || '';
  const j = await jget('https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&title=' + encodeURIComponent(t) + (a ? '&author=' + encodeURIComponent(a) : ''));
  const d = j && j.docs && j.docs.find(x => x.cover_i && titleOK(t, x.title));
  return d ? image(`https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg?default=false`) : null;
}
const metaFrom = vi => vi ? {
  d: (vi.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1100),
  pg: vi.pageCount || 0, pub: vi.publishedDate || '', rt: vi.averageRating || 0, rc: vi.ratingsCount || 0, sub: vi.subtitle || ''
} : null;

function save() {
  fs.writeFileSync(path.join(ROOT, 'assets/enriched.js'), 'window.ENRICH=' + JSON.stringify(ENR) + ';\n');
}

const todo = DATA.filter(b => { const e = ENR[b.id]; if (!e) return true; if (e.cover) return false; return RETRY && !e.cover && !b.cv; });
console.log(`${DATA.length} books · ${DATA.filter(b => b.cv).length} with your own cover · ${todo.length} to process`);
let n = 0, found = 0, missing = 0;
for (const b of todo) {
  if (n >= LIMIT) break;
  n++;
  try {
    const entry = ENR[b.id] || {};
    let img = null, vi = null;
    if (!b.cv) {
      if (b.isbn) img = await image(`https://covers.openlibrary.org/b/isbn/${b.isbn}-L.jpg?default=false`);
    }
    if (!b.cv && !img && isbn10(b.isbn)) img = await image(`https://images-na.ssl-images-amazon.com/images/P/${isbn10(b.isbn)}.01.LZZZZZZZ.jpg`);
    vi = await googleLookup(b);                      // description, rating, pages (and a cover if still needed)
    if (!b.cv && !img && vi) img = await googleImage(vi);
    if (!b.cv && !img) img = await olSearch(b);
    Object.assign(entry, metaFrom(vi) || { d: '' });
    if (img) {
      const file = `covers/${b.id}.${img.ext}`;
      fs.writeFileSync(path.join(ROOT, file), img.buf);
      entry.cover = file; found++;
    } else if (!b.cv) { entry.tried = 1; missing++; }
    ENR[b.id] = entry;
    process.stdout.write(`\r${n}/${todo.length}  covers found: ${found}  not found: ${missing}   `);
    if (n % 20 === 0) save();
    if (googleBlocked) { console.log('\nGoogle Books is rate-limiting this IP – saving progress; run again later to continue.'); break; }
    await sleep(250);
  } catch (e) { console.error('\n#' + b.id, b.t, e.message); }
}
save();
console.log(`\nDone. Found ${found} new covers; ${missing} still missing (re-run with RETRY=1 later, or drop a file into /covers and set "cv" in assets/books.js).`);
