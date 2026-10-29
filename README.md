# Kenneth San — personal site

Static React + TypeScript + Vite site, deployed to GitHub Pages.

## Editing content

All copy lives in [`src/data/content.ts`](src/data/content.ts): intro, interests, publication, skills, and contact links.

- **Paper PDF / code links:** set `pdf` and `code` on the publication (they're hidden while `null`).
- **Co-authors:** add names to `authors` and set `authorsEtAl: false`.
- **LinkedIn:** set `contact.linkedin` (hidden while empty).
- **Portrait:** replace `src/assets/kenneth-san.jpg`.

## Development

```sh
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # outputs dist/
npm run preview  # http://localhost:4173/portfolio/ — serves dist/ exactly as Pages will
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The Vite `base` is derived from the repository name: `/<repo>/` for a project repo, or `/` if the repo is named `<user>.github.io`.
