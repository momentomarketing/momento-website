import { useEffect, useState } from 'react'

let activeScrollAnimation

const scrollToContact = (event) => {
  event.preventDefault()
  const target = document.querySelector('#contact')
  if (!target) return

  if (activeScrollAnimation) {
    window.cancelAnimationFrame(activeScrollAnimation)
  }

  const start = window.scrollY
  const end = target.getBoundingClientRect().top + window.scrollY
  const distance = end - start
  const duration = 1200
  const easeOutCubic = (time) => 1 - Math.pow(1 - time, 3)
  let startTime
  let wasCancelled = false

  const cancelOnUserInput = () => {
    wasCancelled = true
    if (activeScrollAnimation) {
      window.cancelAnimationFrame(activeScrollAnimation)
    }
    cleanup()
  }

  const cleanup = () => {
    window.removeEventListener('wheel', cancelOnUserInput)
    window.removeEventListener('touchstart', cancelOnUserInput)
    window.removeEventListener('keydown', cancelOnUserInput)
  }

  window.addEventListener('wheel', cancelOnUserInput, { passive: true })
  window.addEventListener('touchstart', cancelOnUserInput, { passive: true })
  window.addEventListener('keydown', cancelOnUserInput)

  const step = (timestamp) => {
    if (wasCancelled) return
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    window.scrollTo(0, start + distance * easeOutCubic(progress))

    if (progress < 1) {
      activeScrollAnimation = window.requestAnimationFrame(step)
    } else {
      activeScrollAnimation = undefined
      cleanup()
    }
  }

  activeScrollAnimation = window.requestAnimationFrame(step)
}
import glowTexture from './assets/hero-glow-texture.png'
import momentoLogo from './assets/momento-logo-transparent.png'
import gqCompassLogo from './assets/gq-compass-logo-white.png'
import prpLogo from './assets/prp-logo-white.png'
import promoOgLogo from './assets/promo-og-logo.png'
import stokeLogo from './assets/stoke-logo-transparent.png'
import tccLogo from './assets/tacoma-fashion-collective-logo.png'
import zealotLogo from './assets/zealot-logo.png'
import './App.css'

const mediaFiles = import.meta.glob(
  './media/**/*.{jpg,jpeg,png,webp,avif,mp4,mov,webm}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
)

const mediaOrder = {
  'stoke-1-website.mov': 1,
  'stoke-2-website.mov': 2,
  'promo-og-promo.mov': 3,
  'tcc-website.mov': 4,
  'zealot-website.mov': 5,
  'website-portfolio-1.mov': 1,
  'tacoma-home.mov': 2,
  'matthew-black-diamond.mov': 3,
}

const collageOrder = [
  '16221-birch-way-e-enumclaw-9.jpg',
  '2031-yale-ave-east-25.jpg',
  'p2453392.jpg',
  '821-9th-ave-nw-puyallup-01.jpg',
  '3118-s-melrose-st-tacoma-wa-2.jpg',
  '23436-guinness-pl-nw-poulsbo-49.jpg',
  '5802-108th-avenue-ct-e-62.jpg',
  '2815-s-8th-street-5.jpg',
  'p1353912.jpg',
  '15821-269th-st-e-1.jpg',
  '10826-149th-st-e-puyallup-39.jpg',
  '32553-181th-ave-se-auburn-1.jpg',
  '5802-108th-avenue-ct-e-56.jpg',
  'p2453367.jpg',
  '3719-260th-st-e-spanaway-8.jpg',
  '17431-ne-28th-st-3.jpg',
  '2815-s-8th-street-28.jpg',
  'cary-fed-38.jpg',
  'p2441263.jpg',
  '16518-10th-ave-e-31.jpg',
]

const mediaItems = Object.entries(mediaFiles).map(([path, src]) => {
  const parts = path.split('/')
  const category = parts[2]
  const kind = parts[3]
  const fileName = parts.at(-1)
  const title = fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

  return {
    category,
    fileName,
    type: kind === 'videos' ? 'video' : 'photo',
    alt: title,
    src,
    order: mediaOrder[fileName] ?? 999,
    title:
      fileName === 'stoke-1-website.mov'
        ? ''
        : fileName === 'stoke-2-website.mov'
          ? 'Tukwila,WA'
        : fileName === 'website-portfolio-1.mov'
        ? 'GQ | Compass'
        : fileName === 'promo-og-promo.mov'
          ? 'Tacoma, WA'
        : fileName === 'tcc-website.mov'
          ? 'Tacoma, WA'
        : fileName === 'zealot-website.mov'
          ? 'Tacoma, WA'
        : fileName === 'tacoma-home.mov'
          ? ''
          : fileName === 'matthew-black-diamond.mov'
            ? 'Premier Real Estate Partners'
            : title,
    logo:
      fileName === 'website-portfolio-1.mov'
        ? gqCompassLogo
        : fileName === 'matthew-black-diamond.mov'
          ? prpLogo
          : null,
    topLogo:
      fileName === 'promo-og-promo.mov'
        ? promoOgLogo
        : fileName === 'tcc-website.mov'
          ? tccLogo
          : fileName === 'zealot-website.mov'
            ? zealotLogo
          : null,
    topLogoClass:
      fileName === 'promo-og-promo.mov'
        ? 'project-logo--promo-og'
        : fileName === 'tcc-website.mov'
          ? 'project-logo--tcc'
          : fileName === 'zealot-website.mov'
            ? 'project-logo--zealot'
          : '',
    logoClass: fileName === 'matthew-black-diamond.mov' ? 'client-logo--right client-logo--prp' : '',
    titleClass:
      fileName === 'matthew-black-diamond.mov'
        ? 'media-title--right'
        : fileName === 'stoke-2-website.mov'
          ? 'media-title--right media-title--italic'
        : fileName === 'promo-og-promo.mov'
          ? 'media-title--italic'
          : fileName === 'tcc-website.mov'
            ? 'media-title--right media-title--italic'
          : fileName === 'zealot-website.mov'
            ? 'media-title--italic'
          : '',
    cardClass:
      fileName === 'stoke-1-website.mov'
        ? 'media-card--stoke media-card--stoke-left'
        : fileName === 'stoke-2-website.mov'
          ? 'media-card--stoke media-card--stoke-right'
          : fileName === 'promo-og-promo.mov'
        ? 'media-card--creative-feature media-card--promo-og'
        : fileName === 'tcc-website.mov'
          ? 'media-card--creative-feature media-card--tcc'
          : fileName === 'zealot-website.mov'
            ? 'media-card--creative-feature media-card--zealot'
          : '',
  }
})

const collageItems = mediaItems
  .filter((item) => item.category === 'collage' && item.type === 'photo')
  .sort((a, b) => {
    const aIndex = collageOrder.indexOf(a.fileName)
    const bIndex = collageOrder.indexOf(b.fileName)
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })

const heroVideo = mediaItems.find(
  (item) => item.category === 'hero' && item.type === 'video',
)

const mediaSections = [
  {
    id: 'creative',
    title: 'Creative',
    description: 'Brand films, portraits, events, and story-led work.',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Property photography, listing films, and walkthroughs.',
  },
].map((section) => ({
  ...section,
  items: mediaItems
    .filter((item) => item.category === section.id)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
}))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const videos = document.querySelectorAll('.media-card video')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target

          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.6 },
    )

    videos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page">
      <header className="nav">
        <button
          className="menu-mark"
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰&nbsp;&nbsp;Menu
        </button>
        <a href="/" className="wordmark" aria-label="Momento home">
          <img src={momentoLogo} alt="Momento" />
        </a>
        <a href="#contact" className="chat-link" onClick={scrollToContact}>
          Let&apos;s chat →
        </a>
      </header>

      <main>
        <section id="home" className="hero">
          {heroVideo && (
            <video
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={heroVideo.src}
            />
          )}

          <div className="hero-overlay" aria-hidden="true" />

          <div
            className="aurora"
            aria-hidden="true"
            style={{ backgroundImage: `url(${glowTexture})` }}
          />

          <p className="locale">TACOMA<br />SEATTLE</p>

          <div className="hero-copy">
            <h1>
              <span>Capture <em className="hero-inline">el</em></span>
              <em>Momento</em>
            </h1>
          </div>

          <p className="side-note">Since 2020</p>

          <div className="scroll-mark" aria-hidden="true" />
        </section>

        {mediaSections.map((section) => (
          <section
            id={section.id}
            className={`media-section media-section--${section.id}`}
            aria-label={section.title}
            key={section.id}
          >
            <div className="section-heading">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>

            {section.items.length === 0 ? (
              <div className="empty-state">
                <p>{section.title} media will appear here once added.</p>
              </div>
            ) : section.id === 'creative' ? (
              <>
                <div className="stoke-logo-wrap" aria-hidden="true">
                  <img src={stokeLogo} alt="" />
                </div>
                <div className="media-grid media-grid--creative">
                {section.items.map((item) => (
                    <article className={`media-card ${item.cardClass}`} key={item.src}>
                    {item.topLogo && (
                      <img className={`project-logo ${item.topLogoClass}`} src={item.topLogo} alt="" />
                    )}
                    {item.type === 'video' ? (
                      <video loop muted playsInline preload="metadata" src={item.src} />
                    ) : (
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    )}
                    <div className="client-logo-slot">
                      {item.logo && (
                        <img className={`client-logo ${item.logoClass}`} src={item.logo} alt="" />
                      )}
                    </div>
                    {item.title && <h3 className={item.titleClass}>{item.title}</h3>}
                    </article>
                ))}
                </div>
              </>
            ) : (
              <div className="media-grid">
                {section.items.map((item) => (
                  <article className={`media-card ${item.cardClass}`} key={item.src}>
                    {item.topLogo && (
                      <img className={`project-logo ${item.topLogoClass}`} src={item.topLogo} alt="" />
                    )}
                    {item.type === 'video' ? (
                      <video loop muted playsInline preload="metadata" src={item.src} />
                    ) : (
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    )}
                    <div className="client-logo-slot">
                      {item.logo && (
                        <img className={`client-logo ${item.logoClass}`} src={item.logo} alt="" />
                      )}
                    </div>
                    {item.title && <h3 className={item.titleClass}>{item.title}</h3>}
                  </article>
                ))}
              </div>
            )}
            {section.id === 'real-estate' && (
              <div className="real-estate-collage-section">
                {collageItems.length > 0 && (
                  <div className="property-collage" aria-hidden="true">
                    {collageItems.map((item) => (
                      <img src={item.src} alt="" loading="lazy" key={item.src} />
                    ))}
                  </div>
                )}
                <h2 className="real-estate-statement">
                  <span>Over <strong>600</strong> properties</span>
                  <span>photographed, filmed</span>
                  <span>and brought to <em>market.</em></span>
                </h2>
              </div>
            )}
          </section>
        ))}

        <section className="services" aria-label="Services">
          <div className="services-glow" aria-hidden="true" />

          <div className="services-copy">
            <h2>
              <span>Let&apos;s</span>
              <span>create</span>
              <em>moments</em>
              <span>together</span>
            </h2>
            <a href="mailto:ourmomento.us@gmail.com">ourmomento.us@gmail.com</a>
          </div>

          <div className="service-list">
            <p className="service-kicker">Services</p>
            <article>
              <span>01</span>
              <h3>Creative Direction</h3>
              <p>Concepts, visual language, campaign planning.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Photo + Film</h3>
              <p>Portraits, brand stories, property, and editorial work.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Post Production</h3>
              <p>Editing, color, delivery, and final campaign assets.</p>
            </article>
          </div>

          <form className="inquiry-sheet">
            <p>Contact Us</p>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@email.com" />
            </label>
            <label>
              Project
              <textarea placeholder="Tell us a little about what you need" rows="3" />
            </label>
            <button type="button">Send inquiry</button>
          </form>
        </section>
      </main>

      <footer id="contact" className="contact">
        <p>Available for select projects.</p>
        <a href="mailto:ourmomento.us@gmail.com">ourmomento.us@gmail.com</a>
      </footer>
    
      <div
        className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!isMenuOpen}
      >
          <header className="menu-overlay-nav">
            <button type="button" onClick={() => setIsMenuOpen(false)}>
              ×&nbsp;&nbsp;Close
            </button>
            <a href="#home" onClick={() => setIsMenuOpen(false)} aria-label="Momento home">
              <img src={momentoLogo} alt="Momento" />
            </a>
            <a href="#contact" onClick={(event) => { setIsMenuOpen(false); scrollToContact(event) }}>
              Let&apos;s chat →
            </a>
          </header>

          <nav className="menu-links" aria-label="Overlay navigation">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#creative" onClick={() => setIsMenuOpen(false)}>
              Work
            </a>
            <a href="#contact" onClick={(event) => { setIsMenuOpen(false); scrollToContact(event) }}>
              Contact
            </a>
          </nav>

          <div className="menu-contact">
            <p>Contact us</p>
            <a href="mailto:ourmomento.us@gmail.com">ourmomento.us@gmail.com</a>
          </div>
      </div>
    </div>
  )
}

export default App
