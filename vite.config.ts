import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project repos from /<repo>/ and user/org sites
// (<user>.github.io) from the root. In Actions, GITHUB_REPOSITORY is set
// ("owner/repo"); locally we fall back to the current repo name.
const FALLBACK_REPO = 'portfolio'

function pagesBase(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? FALLBACK_REPO
  return repo.toLowerCase().endsWith('.github.io') ? '/' : `/${repo}/`
}

// Same base in dev, preview and production so local URLs match GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: pagesBase(),
})
