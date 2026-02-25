# Deploy RadiantFit to GitHub Pages

Repo: **https://github.com/owenlim225/RadiantFit-1.0**  
Live site: **https://owenlim225.github.io/RadiantFit-1.0/**

## GitHub repo setup

1. In your repo go to **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **gh-pages** and folder **/ (root)**. Save.

## Deploy from your machine (exact commands)

Run these in order from the project root:

```bash
npm install
```

```bash
npm run build
```

*(For GitHub Pages, the build is done by `predeploy` when you run `npm run deploy`. Running `npm run build` alone will fail because of API routes. To build the static export locally, run `npm run predeploy` instead; on Windows you may get EPERM when it moves `app/api` — use WSL or deploy via GitHub Actions.)*

```bash
npm run deploy
```

**Recommended:** Run only `npm install` then `npm run deploy`. The deploy script runs `predeploy` first (which builds the site with `app/api` moved aside), then pushes `out/` to the **gh-pages** branch. On Windows if `predeploy` fails with EPERM, use **Deploy via GitHub Actions** below.

After a successful deploy, the site updates at https://owenlim225.github.io/RadiantFit-1.0/ in a few minutes.

## Deploy via GitHub Actions (recommended)

Pushing to the **main** branch triggers the workflow that runs `npm run deploy` for you.

1. Push your code to **main**.
2. Open the **Actions** tab and run the **Deploy to GitHub Pages** workflow (or wait for the push to run it).
3. When it finishes, the site at https://owenlim225.github.io/RadiantFit-1.0/ will use the latest build.

## Local dev vs GitHub Pages

- **Local:** `npm run dev` → open **http://localhost:3000** (no base path).
- **GitHub Pages:** The app is built with `basePath: '/RadiantFit-1.0'` and `output: 'export'`, so it runs as a static site at **https://owenlim225.github.io/RadiantFit-1.0/**.

There is no React Router in this project; routing is handled by the Next.js App Router. The correct base path and asset prefix are set in `next.config.mjs` for production builds.

## API routes and ExerciseDB on GitHub Pages

GitHub Pages only serves **static** files. It does not run a Node server, so **Next.js API routes** (e.g. `/api/exercisedb/...`) are **not** available on the deployed site. The UI and navigation will match `npm run dev`, but:

- Workout modal and any feature that calls `/api/exercisedb` or `/api/exercise-status` will get network errors and will use the app’s **fallback/demo data** (e.g. demo exercises).

To have live ExerciseDB (and other API) features, deploy to a platform that runs Node (e.g. **Vercel** or **Netlify**) so API routes work. The same repo and code can be used there without changing API usage.
