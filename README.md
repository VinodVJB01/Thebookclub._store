# The Book Club – online store (GitHub Pages)

Static website, no server needed. Orders go to Instagram DM (@thebookclub._store).

## Put it online
1. Create a new GitHub repo (e.g. `thebookclub`), upload **everything in this folder** (keep the folder structure, including the hidden `.github` folder and `.nojekyll`).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
3. Your store opens at `https://<your-username>.github.io/<repo>/` after a minute.

## Get a real cover for every book (do this once)
The site already looks for covers by itself when a customer visits (your own files → Open Library → Google Books → title search). To **save them permanently** so they load instantly:
- Repo → **Actions** tab → **Fetch book covers** → **Run workflow**. It downloads every cover + description into `/covers` and `assets/enriched.js` and commits them. Run it again later with *retry* ticked for books still missing.
- Optional: add a free Google Books API key as a repo secret named `GOOGLE_BOOKS_KEY` for a higher quota.
- Or on your computer (Node 18+): `node tools/fetch-covers.mjs`

A cover that still can't be found shows a clean generated cover. To fix one by hand: put the image in `covers/` and add `"cv":"covers/yourfile.jpg"` to that book in `assets/books.js`.

## Edit
- Books & prices: `assets/books.js` · Look: `assets/style.css` · Behaviour: `assets/app.js`
