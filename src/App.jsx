import { useState, useEffect } from 'react'
import './App.css'

/* ─── Datos editables ─────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Áreas', href: '#areas' },
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Rutas', href: '#rutas' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Contacto', href: '#contacto' },
]

const HERO_TAGS = [
  'Ciclo de vida', 'Flujo de materiales', 'Baterías', 'Economía circular', 'IA para investigación', 'Becas y PhD',
]

const CREDENTIALS = [
  'PhD Candidate, Chalmers',
  'MSc, KTH Royal Institute of Technology',
  'MSc, Universidad Nacional Mayor de San Marcos',
  'Swedish Institute Scholarship holder',
  '9 años de experiencia ambiental',
]

const AREAS = [
  {
    title: 'Sostenibilidad cuantitativa',
    text: 'Impactos, flujos, stocks y escenarios con rigor metodológico.',
    variant: 'quant',
  },
  {
    title: 'Análisis de Ciclo de Vida y Flujo de Materiales',
    text: 'Límites del sistema, inventarios, supuestos y comunicación de resultados.',
    variant: 'cycle',
  },
  {
    title: 'Economía circular y baterías',
    text: 'Reúso, segunda vida, reciclaje y evaluación de sistemas energéticos.',
    variant: 'battery',
  },
  {
    title: 'IA para investigación académica',
    text: 'ChatGPT, Cursor, Excel y Python asistido con rigor y flujos reproducibles.',
    variant: 'ai',
  },
]

const AUDIENCE = [
  'Estudiantes que están definiendo su tema de tesis.',
  'Tesistas con dudas sobre metodología, objetivos o resultados.',
  'Personas trabajando en análisis de ciclo de vida, flujo de materiales, economía circular o baterías.',
  'Jóvenes profesionales que quieren fortalecer su perfil académico.',
  'Postulantes a becas, maestrías o PhD en Europa.',
  'Personas que quieren usar IA para investigación sin perder rigor.',
]

const SERVICES = [
  {
    number: '01',
    label: 'Becas',
    title: 'Asesoría de becas internacionales',
    text: 'Orientación para identificar becas, preparar postulaciones y entender qué buscan los programas en Europa y otros destinos.',
    includes: [
      'Swedish Institute y otras becas relevantes',
      'Revisión de CV y perfil académico',
      'Cartas de motivación y estrategia de postulación',
      'Plazos, requisitos y errores frecuentes',
    ],
    pdf: '/docs/asesoria-becas.pdf',
    variant: 'becas',
  },
  {
    number: '02',
    label: 'Máster y PhD',
    title: 'Asesoría de aplicación de máster y doctorado',
    text: 'Apoyo para postular con claridad a programas internacionales de posgrado, desde la búsqueda hasta entrevistas y decisiones finales.',
    includes: [
      'Búsqueda y selección de programas',
      'CV académico, cartas y correos a supervisores',
      'Preparación para entrevistas de admisión',
      'Estrategia cuando postulas a varios procesos',
    ],
    pdf: '/docs/aplicacion-master-phd.pdf',
    variant: 'postgrado',
  },
  {
    number: '03',
    label: 'Tesis',
    title: 'Asesoría de tesis',
    text: 'Acompañamiento en tesis e investigación aplicada en sostenibilidad, economía circular, baterías y métodos cuantitativos.',
    includes: [
      'Tema, objetivos, metodología y estructura',
      'Análisis de ciclo de vida y flujo de materiales',
      'Economía circular, baterías e interpretación de resultados',
      'IA para investigación y comunicación académica',
    ],
    pdf: '/docs/asesoria-tesis.pdf',
    variant: 'tesis',
  },
]

const RUTAS_TOPICS = [
  {
    title: 'Estudiar en el extranjero',
    text: 'Experiencias reales sobre maestrías, becas, adaptación cultural y vida académica fuera de Latinoamérica.',
    icon: 'globe',
  },
  {
    title: 'Carreras en sostenibilidad',
    text: 'Conversaciones sobre ingeniería ambiental, economía circular, energía, minería, análisis de ciclo de vida, flujo de materiales y sostenibilidad aplicada.',
    icon: 'leaf',
  },
  {
    title: 'Becas, maestrías y PhD',
    text: 'Charlas sobre cómo preparar postulaciones, buscar programas, escribir cartas y enfrentar procesos académicos internacionales.',
    icon: 'path',
  },
  {
    title: 'Experiencias profesionales',
    text: 'Invitados compartiendo cómo es trabajar en distintos sectores, países y trayectorias profesionales.',
    icon: 'people',
  },
]

const COURSES = [
  {
    title: 'Introducción práctica al análisis de ciclo de vida y flujo de materiales',
    text: 'Fundamentos aplicados en tesis y proyectos reales.',
    meta: 'Programa corto · Online',
  },
  {
    title: 'Economía circular y baterías',
    text: 'Estrategias circulares e impactos ambientales para Latinoamérica.',
    meta: 'Programa corto · Online',
  },
  {
    title: 'IA para tesis e investigación académica',
    text: 'IA responsable para leer, escribir, analizar y presentar investigación.',
    meta: 'Programa corto · Online',
  },
]

const TIMELINE = [
  {
    place: 'Perú',
    period: 'Formación y experiencia',
    text: 'Ingeniería Ambiental, experiencia profesional en energía, industria y gestión ambiental.',
  },
  {
    place: 'UNFV',
    period: 'Pregrado',
    text: 'Tesis sobre líquenes como bioindicadores de contaminación del aire.',
  },
  {
    place: 'UNMSM',
    period: 'Posgrado',
    text: 'Maestría en Gestión Integrada de Seguridad, Salud Ocupacional y Medio Ambiente.',
  },
  {
    place: 'KTH, Suecia',
    period: 'Posgrado',
    text: 'Máster en Environmental Engineering and Sustainable Infrastructure con beca Swedish Institute.',
    rank: '#26 en Europa · #3 en Suecia · QS World 2026',
  },
  {
    place: 'Stockholm University',
    period: 'Investigación',
    text: 'Research en proyecto internacional Stanford–Berkeley sobre imágenes históricas, GIS y cambio ambiental.',
  },
  {
    place: 'Chalmers, Suecia',
    period: 'Actualidad',
    text: 'PhD Candidate en sostenibilidad dinámica aplicada a sistemas de baterías.',
    rank: '#73 en Europa · #5 en Suecia · QS World 2026',
    current: true,
  },
]

const RESOURCES = [
  { title: 'Guía básica de análisis de ciclo de vida y flujo de materiales', type: 'Guía PDF' },
  { title: 'Plantilla para ordenar una tesis', type: 'Plantilla' },
  { title: 'Lista de lecturas recomendadas', type: 'Bibliografía' },
  { title: 'Videos cortos explicativos', type: 'Video' },
]

const WORK_STEPS = [
  { step: '01', title: 'Diagnóstico', text: 'Revisamos tu tema, avance, dudas y objetivo principal.' },
  { step: '02', title: 'Plan de trabajo', text: 'Definimos prioridades, entregables y próximos pasos.' },
  { step: '03', title: 'Acompañamiento', text: 'Sesiones prácticas para metodología, análisis o comunicación.' },
]

const ABOUT_TOOLS = [
  'LCA', 'MFA', 'dLCA', 'dMFA', 'Flodym', 'Brightway2', 'Ecoinvent',
  'SimaPro', 'Excel', 'GIS/AERMOD', 'Jupyter', 'Git', 'Python asistido',
]

const LINKEDIN_URL = 'https://www.linkedin.com/in/valdiviadiego/'
const EMAIL = 'daaron.valdiviah@gmail.com'
const TELEGRAM_URL = 'https://t.me/diegovalacademy'

/* ─── Componente principal ────────────────────────────────────── */

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal suave de secciones al hacer scroll (respeta prefers-reduced-motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') return

    const els = Array.from(document.querySelectorAll('.section'))
    els.forEach((el) => el.classList.add('reveal'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <a href="#inicio" className="navbar__brand" onClick={closeMenu}>
            Diego Valdivia
          </a>

          <button
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            <ul className="navbar__links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a href="#contacto" className="btn btn--primary navbar__cta" onClick={closeMenu}>
              Agendar asesoría
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="inicio" className="hero">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__shape hero__shape--ring" />
            <div className="hero__shape hero__shape--arc" />
            <div className="hero__shape hero__shape--nodes">
              <span /><span /><span /><span />
            </div>
            <div className="hero__shape hero__shape--flow" />
          </div>

          <div className="container hero__grid">
            <div className="hero__content">
              <p className="hero__location">Perú · Suecia · Latinoamérica</p>
              <h1 className="hero__name">Diego Valdivia</h1>
              <p className="hero__narrative">
                De la sostenibilidad aplicada en Perú a la investigación doctoral en Suecia.
              </p>
              <h2 className="hero__title">
                Asesoría en tesis, sostenibilidad cuantitativa, análisis de ciclo de vida, flujo de materiales y baterías para Latinoamérica
              </h2>
              <p className="hero__subtitle">
                Acompaño a estudiantes y jóvenes profesionales a convertir ideas complejas en
                metodologías claras, resultados sólidos y proyectos mejor comunicados.
              </p>
              <div className="hero__actions">
                <a href="#contacto" className="btn btn--primary btn--lg">Agendar asesoría</a>
                <a href="#servicios" className="btn btn--outline btn--lg">Ver servicios</a>
              </div>
              <p className="hero__note">Sesiones en español · Primera conversación exploratoria</p>
            </div>

            <div className="hero__visual">
              <div className="hero__photo-wrap">
                <div className="hero__photo-frame" aria-hidden="true" />
                <div className="hero__photo-glow" aria-hidden="true" />
                <img src="/diego.jpg" alt="Diego Valdivia" className="hero__photo" />
                <div className="hero__tags-card">
                  <p className="hero__tags-label">Enfoque</p>
                  <div className="hero__tags">
                    {HERO_TAGS.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Credibility strip ── */}
        <section className="credibility" aria-label="Credenciales">
          <div className="container">
            <ul className="credibility__list">
              {CREDENTIALS.map((item) => (
                <li key={item} className="credibility__item">
                  <span className="credibility__dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Statement editorial ── */}
        <section className="statement">
          <div className="statement__deco" aria-hidden="true" />
          <div className="container statement__inner">
            <p className="statement__quote">
              Ayudo a convertir temas complejos de sostenibilidad en tesis, metodologías y
              resultados claros.
            </p>
            <p className="statement__sub">
              Trabajo con estudiantes y jóvenes profesionales que necesitan ordenar su investigación,
              definir límites del sistema, estructurar análisis de ciclo de vida y flujo de materiales, interpretar resultados o
              preparar postulaciones académicas internacionales.
            </p>
          </div>
        </section>

        {/* ── Sobre mí ── */}
        <section id="sobre-mi" className="section section--about">
          <div className="container about__layout">
            <header className="about__header">
              <span className="section__eyebrow">Mi historia</span>
              <h2 className="section__title">Sobre mí</h2>
            </header>

            <div className="about__grid">
              <div className="about__narrative">
                <p>
                  Mi camino empezó en Perú, trabajando en gestión ambiental en sectores energético,
                  industrial y metalúrgico. Esa experiencia práctica me permitió entender los retos
                  reales de cumplimiento ambiental, monitoreo, permisos, evaluación de impactos y
                  sistemas de gestión.
                </p>
                <p>
                  Luego continué mi formación en Suecia, donde fui becario del Swedish Institute
                  Scholarships for Global Professionals para estudiar el máster en Environmental
                  Engineering and Sustainable Infrastructure en KTH. Actualmente desarrollo mi
                  doctorado en Chalmers University of Technology, enfocado en sostenibilidad
                  cuantitativa aplicada a sistemas de baterías mediante análisis dinámico de flujo de materiales (dMFA) y de ciclo de vida (dLCA).
                </p>
                <p>
                  Mi objetivo es acercar este conocimiento a estudiantes y jóvenes profesionales de
                  Latinoamérica que quieren desarrollar mejores tesis, proyectos e investigaciones.
                </p>
              </div>

              <aside className="about__aside">
                <div className="about__route" aria-hidden="true">
                  <span className="about__route-point about__route-point--pe">PE</span>
                  <span className="about__route-line" />
                  <span className="about__route-point about__route-point--se">SE</span>
                </div>
                <div className="about__highlights">
                  <div className="about__highlight">
                    <span className="about__highlight-num">9</span>
                    <span className="about__highlight-label">años de experiencia ambiental</span>
                  </div>
                  <div className="about__highlight">
                    <span className="about__highlight-num">PhD</span>
                    <span className="about__highlight-label">internacional en curso · Chalmers</span>
                  </div>
                </div>
                <div className="about__tools">
                  <span className="about__tools-label">Herramientas y métodos</span>
                  <div className="about__tools-list">
                    {ABOUT_TOOLS.map((tool) => (
                      <span key={tool} className="tag tag--muted">{tool}</span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Áreas de trabajo ── */}
        <section id="areas" className="section section--areas">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Especialización</span>
            <h2 className="section__title section__title--center">Áreas de trabajo</h2>
            <div className="areas-grid">
              {AREAS.map((area) => (
                <article key={area.title} className={`area-card area-card--${area.variant}`}>
                  <div className={`area-card__icon area-card__icon--${area.variant}`} aria-hidden="true" />
                  <h3 className="area-card__title">{area.title}</h3>
                  <p className="area-card__text">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Para quién es ── */}
        <section id="para-quien" className="section section--audience">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Audiencia</span>
            <h2 className="section__title section__title--center">¿Para quién es esta asesoría?</h2>
            <ul className="audience-grid">
              {AUDIENCE.map((item) => (
                <li key={item} className="audience-item">
                  <span className="audience-item__check" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Servicios ── */}
        <section id="servicios" className="section section--services">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Asesorías</span>
            <h2 className="section__title section__title--center">Servicios</h2>
            <p className="section__subtitle section__subtitle--center">
              Tres líneas de acompañamiento para avanzar con claridad en becas, posgrado internacional
              o tesis en sostenibilidad e investigación aplicada.
            </p>
            <div className="services-grid services-grid--main">
              {SERVICES.map((service) => (
                <article
                  key={service.title}
                  className={`service-card service-card--main service-card--${service.variant}`}
                >
                  <div className="service-card__head">
                    <span className="service-card__number">{service.number}</span>
                    <span className="service-card__label">{service.label}</span>
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__text">{service.text}</p>
                  <ul className="service-card__includes">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="service-card__actions">
                    <a
                      href={service.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline service-card__btn"
                    >
                      Ver información
                    </a>
                    <a href="#contacto" className="btn btn--primary service-card__btn">
                      Agendar asesoría
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Rutas Profesionales (iniciativa gratuita) ── */}
        <section id="rutas" className="section section--rutas">
          <div className="rutas__bg" aria-hidden="true">
            <div className="rutas__shape rutas__shape--1" />
            <div className="rutas__shape rutas__shape--2" />
          </div>
          <div className="container rutas__inner">
            {/* Banner principal de la iniciativa */}
            <img
              src="/rutas.png"
              alt="Rutas Profesionales — iniciativa gratuita de conversaciones online para estudiantes y jóvenes profesionales de Perú y Latinoamérica"
              className="rutas__banner"
            />

            <div className="rutas__intro">
              <p>
                Además de las asesorías, quiero crear un espacio gratuito de conversaciones online con
                profesionales, estudiantes e investigadores que puedan compartir experiencias reales sobre
                carreras, estudios en el extranjero, becas, maestrías, PhD y caminos profesionales.
              </p>
              <p>
                La idea es acercar información práctica y honesta a estudiantes de Latinoamérica que están
                pensando en su futuro académico o profesional.
              </p>
              <p className="rutas__context">
                Yo mismo he recorrido ese camino: una maestría en Perú, un máster internacional en Suecia
                con beca y un doctorado en curso, además de varios procesos de postulación y entrevistas
                para PhD. Quiero abrir un espacio donde otros compartan trayectorias similares — sin
                filtros ni promesas de resultados.
              </p>
            </div>

            <p className="rutas__topics-label">Posibles temas de conversación</p>
            <div className="rutas__topics">
              {RUTAS_TOPICS.map((topic) => (
                <article key={topic.title} className={`rutas-card rutas-card--${topic.icon}`}>
                  <div className={`rutas-card__icon rutas-card__icon--${topic.icon}`} aria-hidden="true" />
                  <h3 className="rutas-card__title">{topic.title}</h3>
                  <p className="rutas-card__text">{topic.text}</p>
                </article>
              ))}
            </div>

            <p className="rutas__note">
              Las charlas se organizarán de acuerdo con la demanda y la disponibilidad de invitados.
              No hay calendario fijo ni costo de participación.
            </p>

            <div className="rutas__suggest">
              <h3 className="rutas__suggest-title">¿Te gustaría proponer una charla?</h3>
              <p className="rutas__suggest-text">
                Si hay una carrera, país, universidad o experiencia profesional que te gustaría conocer,
                puedes escribirme y sugerir un tema. Las charlas se organizarán de acuerdo con la demanda
                y disponibilidad de invitados.
              </p>
              <a href="#contacto" className="btn btn--rutas">Sugerir una charla</a>
            </div>
          </div>
        </section>

        {/* ── Telegram — comunidad gratuita ── */}
        <section className="telegram-cta" aria-labelledby="telegram-cta-title">
          <div className="container telegram-cta__inner">
            <div className="telegram-cta__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div className="telegram-cta__content">
              <h2 id="telegram-cta-title" className="telegram-cta__title">
                Únete a la comunidad gratuita
              </h2>
              <p className="telegram-cta__text">
                Recibe información sobre becas internacionales, aplicaciones a Master/PhD, tesis y
                herramientas académicas.
              </p>
            </div>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--telegram"
            >
              Unirme al Telegram
            </a>
          </div>
        </section>

        {/* ── Cursos ── */}
        <section id="cursos" className="section section--courses">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Formación</span>
            <h2 className="section__title section__title--center">Cursos y talleres</h2>
            <p className="section__subtitle section__subtitle--center">
              Programas cortos para aprender herramientas aplicadas de sostenibilidad e investigación.
            </p>
            <div className="courses-grid">
              {COURSES.map((course) => (
                <article key={course.title} className="course-card">
                  <div className="course-card__cover" aria-hidden="true">
                    <span className="course-card__badge">Próximamente</span>
                  </div>
                  <div className="course-card__body">
                    <p className="course-card__meta">{course.meta}</p>
                    <h3 className="course-card__title">{course.title}</h3>
                    <p className="course-card__text">{course.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trayectoria ── */}
        <section id="trayectoria" className="section section--timeline">
          <div className="container timeline-layout">
            <div className="timeline-layout__header">
              <span className="section__eyebrow">Experiencia</span>
              <h2 className="section__title">Trayectoria internacional</h2>
              <p className="timeline-layout__intro">
                De la gestión ambiental en Perú a la investigación doctoral en Suecia — un recorrido
                entre la práctica profesional y la sostenibilidad cuantitativa.
              </p>
            </div>
            <ol className="timeline-v">
              {TIMELINE.map((item, index) => (
                <li
                  key={item.place}
                  className={`timeline-v__item ${item.current ? 'timeline-v__item--current' : ''}`}
                >
                  <div className="timeline-v__marker">
                    <span className="timeline-v__dot" />
                    {index < TIMELINE.length - 1 && <span className="timeline-v__line" />}
                  </div>
                  <div className="timeline-v__body">
                    <div className="timeline-v__meta">
                      <h3 className="timeline-v__place">{item.place}</h3>
                      <span className="timeline-v__period">{item.period}</span>
                    </div>
                    <p className="timeline-v__text">{item.text}</p>
                    {item.rank && <span className="timeline-v__rank">{item.rank}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Recursos ── */}
        <section id="recursos" className="section section--resources">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Biblioteca</span>
            <h2 className="section__title section__title--center">Recursos gratuitos</h2>
            <p className="section__subtitle section__subtitle--center">
              Materiales introductorios para empezar en análisis de ciclo de vida, flujo de materiales, economía circular y baterías.
            </p>
            <div className="resources-grid">
              {RESOURCES.map((resource) => (
                <article key={resource.title} className="resource-card">
                  <div className="resource-card__icon" aria-hidden="true" />
                  <div className="resource-card__info">
                    <span className="resource-card__type">{resource.type}</span>
                    <h3 className="resource-card__title">{resource.title}</h3>
                  </div>
                  <span className="resource-card__soon">Próximamente</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Proceso ── */}
        <section className="section section--process">
          <div className="container">
            <span className="section__eyebrow section__eyebrow--center">Proceso</span>
            <h2 className="section__title section__title--center">Cómo podemos trabajar juntos</h2>
            <div className="process__grid">
              {WORK_STEPS.map((step) => (
                <article key={step.step} className="process__step">
                  <span className="process__number">{step.step}</span>
                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__text">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contacto ── */}
        <section id="contacto" className="section section--contact">
          <div className="contact__bg" aria-hidden="true">
            <div className="contact__glow" />
          </div>
          <div className="container contact__inner">
            <span className="section__eyebrow section__eyebrow--light">Contacto</span>
            <h2 className="section__title section__title--light">
              ¿Estás trabajando en una tesis, proyecto o postulación académica?
            </h2>
            <p className="contact__text">
              Si tu tema está relacionado con sostenibilidad, economía circular, análisis de ciclo de vida y flujo de materiales, baterías,
              investigación ambiental o becas internacionales, podemos revisar tu caso y definir si
              una asesoría tiene sentido.
            </p>
            <div className="contact__actions">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light btn--lg"
              >
                Contactar por LinkedIn
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn--outline-light btn--lg">
                Enviar correo
              </a>
            </div>
            <p className="contact__note">
              Primera conversación exploratoria · Sin compromiso
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <p className="footer__name">Diego Valdivia</p>
            <p className="footer__tagline">
              Sostenibilidad cuantitativa · Ciclo de vida y flujos de materiales · Economía circular · Baterías
            </p>
            <p className="footer__region">Perú · Suecia · Latinoamérica</p>
          </div>
          <nav className="footer__nav" aria-label="Enlaces del pie de página">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${EMAIL}`}>Correo</a>
            <a href="#inicio">Inicio</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
