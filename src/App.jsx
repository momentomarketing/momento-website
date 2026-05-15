import './App.css'

const projects = [
  {
    title: 'Brand Film',
    detail: 'Commercial',
  },
  {
    title: 'Wedding Story',
    detail: 'Documentary',
  },
  {
    title: 'Artist Profile',
    detail: 'Portrait',
  },
]

function App() {
  return (
    <div className="page">
      <header className="nav">
        <a href="/" className="wordmark">
          Momento
        </a>
        <nav>
          <a href="#work" className="nav-link">
            Work
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Selected work</p>
          <h1>Film work by Momento.</h1>
          <p className="lede">
            A temporary home for recent films while the full platform is in
            development.
          </p>
        </section>

        <section id="work" className="work" aria-label="Selected work">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-frame" />
              <h2>{project.title}</h2>
              <p>{project.detail}</p>
            </article>
          ))}
        </section>

        <section className="about">
          <p>
            For project inquiries, commissions, or portfolio requests, reach
            out directly.
          </p>
        </section>
      </main>

      <footer id="contact" className="contact">
        <p>Available for select projects.</p>
        <a href="mailto:hello@momento.com">hello@momento.com</a>
      </footer>
    </div>
  )
}

export default App
