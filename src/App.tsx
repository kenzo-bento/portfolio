import Header from './components/Header'
import About from './components/About'
import Interests from './components/Interests'
import Research from './components/Research'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { profile } from './data/content'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <About />
        <Interests />
        <Research />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
