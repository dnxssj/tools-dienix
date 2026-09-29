import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Dices,
  KeyRound,
  Menu,
  Moon,
  RotateCcw,
  ShieldCheck,
  Sun,
  X
} from "lucide-react";

import {
  DEBLOAT_ITEMS,
  NAV_ITEMS,
  PROJECTS,
  TOOLS
} from "./data";

import "./styles.css";

const CHECKLIST_KEY = "daniel-site-w-debloat-v2";
const LANG_KEY = "daniel-site-language-v1";
const THEME_KEY = "daniel-site-theme-v1";

const LocaleContext = createContext(null);

function useLocale() {
  return useContext(LocaleContext);
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    nav: {
      projects: "PROJECTS",
      toolkit: "TOOLKIT",
      debloat: "W DEBLOAT"
    },

    heroEyebrow: "PERSONAL / SOFTWARE / EXPERIMENTS",
    heroTitle1: "I build things",
    heroTitle2: "that solve problems.",
    heroCopy:
      "A personal space for software, experiments and tools. Built around things that are useful, interesting and worth finishing.",

    explore: "Explore projects",
    toolkit: "Toolkit",

    projectsKicker: "01 / PROJECTS",
    projectsTitle: "Things I'm building.",
    projectsCopy:
      "Selected projects and software experiments. Each project controls its own accent, content, status, tags and links.",

    all: "All",

    toolkitKicker: "02 / TOOLKIT",
    toolkitTitle: "Tools I made.",
    toolkitCopy:
      "Small utilities and local tools. The visual system stays restrained; the functionality lives inside each module.",

    password: "Password Generator",
    localUtility: "UTILITY / LOCAL",
    passwordDesc:
      "Local generation using Web Crypto. Nothing is sent or stored.",

    mode: "MODE",
    phraseMode: "Memorable phrase",
    randomMode: "Random",
    basePhrase: "BASE PHRASE",
    uppercase: "Uppercase / lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    separators: "Separators",
    length: "LENGTH",
    generate: "Generate",
    generated: "GENERATED PASSWORD",
    approx: "bits · approx.",
    copyPassword: "Copy password",
    copied: "Copied",
    generatePlaceholder: "Generate a password",
    localOnly: "Local only",
    csprngNote:
      "CSPRNG of the browser with mixed sets and at least one character from each class.",

    debloatKicker: "03 / W DEBLOAT",
    debloatTitle: "Windows, without the bullshit.",
    debloatCopy:
      "The checklist keeps the original W Debloat content while making it part of this site, with persistent local progress.",

    checklistKicker: "W DEBLOAT / CHECKLIST",
    checklistTitle: "Clean Windows. Your way.",
    checklistDesc:
      "16 points. Progress is stored locally. Items marked REVIEW require judgement before applying them.",

    openChecklist: "Open checklist",
    closeChecklist: "Close checklist",
    reset: "Reset",
    selectAll: "Select all",
    clearAll: "Clear",
    completed: "completed",

    ok: "OK",
    review: "REVIEW",
    omit: "SKIP",

    viewProject: "View project",
    back: "Back",
    overview: "Overview",
    features: "Features",
    technology: "Technology",
    links: "Links",
    sourceCode: "Source Code",
    liveDemo: "Live Demo",
    notPublished: "Source not published yet",
    notFound: "Not found.",

    footer: "Personal projects, software and experiments.",
    powered: "Powered by",
    available: "Available",
    categoryToolkit: "Toolkit",

    light: "Light mode",
    dark: "Dark mode",
    language: "Language"
  },

  es: {
    nav: {
      projects: "PROYECTOS",
      toolkit: "HERRAMIENTAS",
      debloat: "W DEBLOAT"
    },

    heroEyebrow: "PERSONAL / SOFTWARE / EXPERIMENTOS",
    heroTitle1: "Construyo cosas",
    heroTitle2: "que resuelven problemas.",
    heroCopy:
      "Un espacio personal para software, experimentos y herramientas. Creado alrededor de cosas útiles, interesantes y que merece la pena terminar.",

    explore: "Ver proyectos",
    toolkit: "Herramientas",

    projectsKicker: "01 / PROYECTOS",
    projectsTitle: "Cosas que estoy construyendo.",
    projectsCopy:
      "Proyectos seleccionados y experimentos de software. Cada proyecto controla su color, contenido, estado, etiquetas y enlaces.",

    all: "Todos",

    toolkitKicker: "02 / HERRAMIENTAS",
    toolkitTitle: "Herramientas que he creado.",
    toolkitCopy:
      "Pequeñas utilidades y herramientas locales. El diseño se mantiene limpio; la funcionalidad vive dentro de cada módulo.",

    password: "Generador de contraseñas",
    localUtility: "UTILIDAD / LOCAL",
    passwordDesc:
      "Generación local mediante Web Crypto. No se envía ni almacena nada.",

    mode: "MODO",
    phraseMode: "Frase memorable",
    randomMode: "Aleatoria",
    basePhrase: "FRASE BASE",
    uppercase: "Mayúsculas / minúsculas",
    numbers: "Números",
    symbols: "Símbolos",
    separators: "Separadores",
    length: "LONGITUD",
    generate: "Generar",
    generated: "CONTRASEÑA GENERADA",
    approx: "bits · aprox.",
    copyPassword: "Copiar contraseña",
    copied: "Copiada",
    generatePlaceholder: "Genera una contraseña",
    localOnly: "Solo local",
    csprngNote:
      "CSPRNG del navegador con conjuntos mezclados y al menos un carácter de cada clase.",

    debloatKicker: "03 / W DEBLOAT",
    debloatTitle: "Windows, sin basura innecesaria.",
    debloatCopy:
      "La checklist conserva el contenido original de W Debloat y ahora forma parte de esta web, con progreso persistente en local.",

    checklistKicker: "W DEBLOAT / CHECKLIST",
    checklistTitle: "Limpia Windows. A tu manera.",
    checklistDesc:
      "16 puntos. El progreso se guarda localmente. Los elementos marcados como REVISAR requieren criterio antes de aplicarlos.",

    openChecklist: "Abrir checklist",
    closeChecklist: "Cerrar checklist",
    reset: "Restablecer",
    selectAll: "Marcar todo",
    clearAll: "Limpiar",
    completed: "completadas",

    ok: "OK",
    review: "REVISAR",
    omit: "OMITIR",

    viewProject: "Ver proyecto",
    back: "Volver",
    overview: "Descripción",
    features: "Funciones",
    technology: "Tecnología",
    links: "Enlaces",
    sourceCode: "Código fuente",
    liveDemo: "Demo online",
    notPublished: "Código fuente aún no publicado",
    notFound: "No encontrado.",

    footer: "Proyectos personales, software y experimentos.",
    powered: "Desarrollado con",
    available: "Disponible",
    categoryToolkit: "Herramientas",

    light: "Modo claro",
    dark: "Modo oscuro",
    language: "Idioma"
  },

  de: {
    nav: {
      projects: "PROJEKTE",
      toolkit: "TOOLS",
      debloat: "W DEBLOAT"
    },

    heroEyebrow: "PERSÖNLICH / SOFTWARE / EXPERIMENTE",
    heroTitle1: "Ich entwickle Dinge",
    heroTitle2: "die Probleme lösen.",
    heroCopy:
      "Ein persönlicher Ort für Software, Experimente und Tools. Gebaut rund um Dinge, die nützlich, interessant und es wert sind, fertiggestellt zu werden.",

    explore: "Projekte ansehen",
    toolkit: "Tools",

    projectsKicker: "01 / PROJEKTE",
    projectsTitle: "Dinge, die ich entwickle.",
    projectsCopy:
      "Ausgewählte Projekte und Software-Experimente. Jedes Projekt steuert Farbe, Inhalt, Status, Tags und Links selbst.",

    all: "Alle",

    toolkitKicker: "02 / TOOLS",
    toolkitTitle: "Tools, die ich gebaut habe.",
    toolkitCopy:
      "Kleine Utilities und lokale Tools. Das Design bleibt zurückhaltend; die Funktionalität steckt in den einzelnen Modulen.",

    password: "Passwort-Generator",
    localUtility: "UTILITY / LOKAL",
    passwordDesc:
      "Lokale Generierung mit Web Crypto. Nichts wird gesendet oder gespeichert.",

    mode: "MODUS",
    phraseMode: "Merkbarer Satz",
    randomMode: "Zufällig",
    basePhrase: "BASISSATZ",
    uppercase: "Groß-/Kleinschreibung",
    numbers: "Zahlen",
    symbols: "Symbole",
    separators: "Trennzeichen",
    length: "LÄNGE",
    generate: "Generieren",
    generated: "GENERIERTES PASSWORT",
    approx: "Bits · ca.",
    copyPassword: "Passwort kopieren",
    copied: "Kopiert",
    generatePlaceholder: "Passwort generieren",
    localOnly: "Nur lokal",
    csprngNote:
      "CSPRNG des Browsers mit gemischten Zeichensätzen und mindestens einem Zeichen aus jeder Klasse.",

    debloatKicker: "03 / W DEBLOAT",
    debloatTitle: "Windows, ohne unnötigen Ballast.",
    debloatCopy:
      "Die Checkliste behält den ursprünglichen W-Debloat-Inhalt und ist jetzt Teil dieser Website, inklusive lokal gespeichertem Fortschritt.",

    checklistKicker: "W DEBLOAT / CHECKLISTE",
    checklistTitle: "Windows bereinigen. Auf deine Art.",
    checklistDesc:
      "16 Punkte. Der Fortschritt wird lokal gespeichert. Mit PRÜFEN markierte Punkte sollten vor der Anwendung bewertet werden.",

    openChecklist: "Checkliste öffnen",
    closeChecklist: "Checkliste schließen",
    reset: "Zurücksetzen",
    selectAll: "Alle markieren",
    clearAll: "Leeren",
    completed: "erledigt",

    ok: "OK",
    review: "PRÜFEN",
    omit: "ÜBERSPRINGEN",

    viewProject: "Projekt ansehen",
    back: "Zurück",
    overview: "Übersicht",
    features: "Funktionen",
    technology: "Technologie",
    links: "Links",
    sourceCode: "Quellcode",
    liveDemo: "Live-Demo",
    notPublished: "Quellcode noch nicht veröffentlicht",
    notFound: "Nicht gefunden.",

    footer: "Persönliche Projekte, Software und Experimente.",
    powered: "Powered by",
    available: "Verfügbar",
    categoryToolkit: "Toolkit",

    light: "Heller Modus",
    dark: "Dunkler Modus",
    language: "Sprache"
  }
};

/* =========================================================
   LOCALIZED PROJECT DATA
========================================================= */

const dataTranslations = {
  en: {},

  es: {
    "BeeWeb": {
      title: "BeeWeb",
      description:
        "Plataforma modular de gestión para apicultura y operaciones agrícolas.",
      details:
        "BeeWeb se está desarrollando como una plataforma práctica tipo ERP para gestionar colmenas, inspecciones, tratamientos, inventario y futuros módulos agrícolas desde un solo lugar.",
      status: "En desarrollo",
      category: "Software",
      features: [
        "Seguimiento de colmenas mediante QR",
        "Sistema de autenticación seguro",
        "Gestión centralizada de datos",
        "Flujo de inspección y control de varroa"
      ]
    },

    "Vacation Rental Web Platform": {
      title: "Plataforma Web de Alquiler Vacacional",
      description:
        "Plataforma web para gestionar y presentar alojamientos turísticos.",
      details:
        "Proyecto orientado a crear una plataforma moderna para alojamientos vacacionales, con una interfaz clara y preparada para futuras funciones de gestión.",
      status: "Demo",
      category: "Web",
      features: [
        "Diseño responsive",
        "Presentación de alojamientos",
        "Arquitectura preparada para gestión",
        "Interfaz moderna"
      ]
    },

    "Task Manager": {
      title: "Gestor de tareas",
      description:
        "Aplicación para organizar tareas y mantener el trabajo estructurado.",
      details:
        "Una aplicación centrada en organizar tareas de forma sencilla, rápida y visual.",
      status: "Funcional",
      category: "Productividad",
      features: [
        "Gestión de tareas",
        "Estados y prioridades",
        "Interfaz rápida",
        "Persistencia local"
      ]
    }
  },

  de: {
    "BeeWeb": {
      title: "BeeWeb",
      description:
        "Modulare Verwaltungsplattform für Imkerei und landwirtschaftliche Abläufe.",
      details:
        "BeeWeb wird als praktische ERP-Plattform zur Verwaltung von Völkern, Inspektionen, Behandlungen, Lagerbeständen und zukünftigen Landwirtschaftsmodulen entwickelt.",
      status: "In Entwicklung",
      category: "Software",
      features: [
        "Verfolgung von Völkern per QR",
        "Sicheres Authentifizierungssystem",
        "Zentrale Datenverwaltung",
        "Inspektions- und Varroa-Kontrolle"
      ]
    },

    "Vacation Rental Web Platform": {
      title: "Ferienvermietungs-Plattform",
      description:
        "Webplattform zur Verwaltung und Präsentation von Ferienunterkünften.",
      details:
        "Ein Projekt für eine moderne Plattform für Ferienunterkünfte mit klarer Benutzeroberfläche und einer Architektur für zukünftige Verwaltungsfunktionen.",
      status: "Demo",
      category: "Web",
      features: [
        "Responsive Design",
        "Präsentation von Unterkünften",
        "Erweiterbare Verwaltungsarchitektur",
        "Moderne Benutzeroberfläche"
      ]
    },

    "Task Manager": {
      title: "Aufgabenverwaltung",
      description:
        "Anwendung zur Organisation von Aufgaben und strukturiertem Arbeiten.",
      details:
        "Eine Anwendung zur einfachen, schnellen und übersichtlichen Organisation von Aufgaben.",
      status: "Funktional",
      category: "Produktivität",
      features: [
        "Aufgabenverwaltung",
        "Status und Prioritäten",
        "Schnelle Oberfläche",
        "Lokale Speicherung"
      ]
    }
  }
};

const toolTranslations = {
  en: {},

  es: {
    "DNX Lab": [
      "DNX Lab",
      "Laboratorio personal para software, experimentos y proyectos."
    ],
    "DNX Cleaner": [
      "DNX Cleaner",
      "Herramienta local para limpieza y mantenimiento de Windows."
    ],
    "Desktop Mover": [
      "Desktop Mover",
      "Utilidad para mover y reorganizar archivos del escritorio."
    ],
    "DNX Winget": [
      "DNX Winget",
      "Interfaz simplificada para gestionar aplicaciones mediante Winget."
    ]
  },

  de: {
    "DNX Lab": [
      "DNX Lab",
      "Persönliches Labor für Software, Experimente und Projekte."
    ],
    "DNX Cleaner": [
      "DNX Cleaner",
      "Lokales Tool zur Reinigung und Wartung von Windows."
    ],
    "Desktop Mover": [
      "Desktop Mover",
      "Utility zum Verschieben und Organisieren von Desktop-Dateien."
    ],
    "DNX Winget": [
      "DNX Winget",
      "Vereinfachte Oberfläche zur Verwaltung von Anwendungen mit Winget."
    ]
  }
};

/* =========================================================
   LOCALE PROVIDER
========================================================= */

function LocaleProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem(LANG_KEY) || "es"
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "dark"
  );

  const t = translations[lang] || translations.es;

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <LocaleContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        t
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

/* =========================================================
   CRYPTO HELPERS
========================================================= */

function secureInt(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);

  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);

  return buf[0] % max;
}

function pick(string) {
  return string[secureInt(string.length)];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = secureInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <Routes>
      <Route
        path="/project/:slug"
        element={<ProjectPage />}
      />

      <Route
        path="*"
        element={<Site />}
      />
    </Routes>
  );
}

/* =========================================================
   LAYOUT
========================================================= */

function Layout({ children }) {
  const location = useLocation();
  const { lang, setLang, theme, setTheme, t } = useLocale();

  const [menu, setMenu] = useState(false);

  const go = (id) => {
    setMenu(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="header">
        <div className="shell nav">

          <Link className="brand" to="/">
            dienix<span>.</span>
          </Link>

          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>

          <nav className={`nav-links ${menu ? "open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
              >
                {t.nav[item.id]}
              </button>
            ))}
          </nav>

          <div className="nav-tools">

            <div
              className="language-switch"
              aria-label={t.language}
            >
              {["es", "en", "de"].map((code) => (
                <button
                  key={code}
                  className={lang === code ? "active" : ""}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              className="theme-button"
              title={theme === "dark" ? t.light : t.dark}
              aria-label={theme === "dark" ? t.light : t.dark}
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
            >
              {theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

          </div>
        </div>
      </header>

      {children}
    </>
  );
}

/* =========================================================
   HOME
========================================================= */

function Site() {
  const location = useLocation();
  const { t, lang } = useLocale();

  useEffect(() => {
    const id = location.hash?.slice(1);

    if (id) {
      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView();
      }, 40);
    }
  }, [location.hash]);

  return (
    <Layout>
      <main>
        <Hero />

        {/* IMPORTANTE:
            Projects y Debloat reciben ahora t/lang correctamente */}
        <Projects
          t={t}
          lang={lang}
        />

        <Toolkit />

        <Debloat
          t={t}
          lang={lang}
        />
      </main>

      <Footer />
    </Layout>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero">
      <div className="shell hero-grid">

        <div>

          <div className="eyebrow">
            <span className="status-dot" />
            {t.heroEyebrow}
          </div>

          <h1>
            {t.heroTitle1}
            <br />
            <span>{t.heroTitle2}</span>
          </h1>

          <p className="hero-copy">
            {t.heroCopy}
          </p>

          <div className="hero-actions">

            <a
              className="button primary"
              href="#projects"
            >
              {t.explore}
              <ArrowDownRight size={16} />
            </a>

            <a
              className="button"
              href="#toolkit"
            >
              {t.toolkit}
            </a>

          </div>
        </div>

        <div
          className="hero-mark"
          aria-hidden="true"
        >
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />

          <div className="hero-core">
            <span>D</span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  number,
  title,
  copy
}) {
  return (
    <div className="section-head">
      <div>
        <div className="section-number">
          {number}
        </div>

        <h2>{title}</h2>
      </div>

      <p>{copy}</p>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  t,
  lang
}) {
  const tr =
    dataTranslations[lang]?.[project.title] || {};

  const p = {
    ...project,
    ...tr
  };

  return (
    <article
      className="project-card"
      style={{
        "--accent": p.accent
      }}
    >

      <div className="project-topline">
        <span className="category">
          {p.category}
        </span>

        <span className="status">
          {p.status}
        </span>
      </div>

      <h3>{p.title}</h3>

      <p className="project-description">
        {p.description}
      </p>

      <ul className="feature-list">
        {p.features
          .slice(0, 3)
          .map((feature) => (
            <li key={feature}>
              <Check size={14} />
              {feature}
            </li>
          ))}
      </ul>

      <div className="tags">
        {p.tags.map((tag) => (
          <span key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="card-footer">
        <Link
          to={`/project/${project.slug}`}
        >
          {t.viewProject}
          <ArrowUpRight size={15} />
        </Link>
      </div>

    </article>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function Projects({
  t,
  lang
}) {
  const [filter, setFilter] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      PROJECTS.map(
        (project) => project.category
      )
    )
  ];

  const visible = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter(
            (project) =>
              project.category === filter
          ),
    [filter]
  );

  return (
    <section
      id="projects"
      className="section"
    >
      <div className="shell">

        <SectionHeader
          number={t.projectsKicker}
          title={t.projectsTitle}
          copy={t.projectsCopy}
        />

        <div className="filter-row">
          {categories.map((category) => (
            <button
              className={`filter ${
                filter === category
                  ? "active"
                  : ""
              }`}
              key={category}
              onClick={() =>
                setFilter(category)
              }
            >
              {category === "All"
                ? t.all
                : category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              t={t}
              lang={lang}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   TOOLKIT
========================================================= */

function Toolkit() {
  const { t, lang } = useLocale();

  return (
    <section
      id="toolkit"
      className="section section-alt"
    >
      <div className="shell">

        <SectionHeader
          number={t.toolkitKicker}
          title={t.toolkitTitle}
          copy={t.toolkitCopy}
        />

        <div className="tool-grid">

          {TOOLS.map((tool) => {
            const tr =
              toolTranslations[lang]?.[
                tool.title
              ];

            return (
              <Link
                className="tool-card"
                style={{
                  "--accent": tool.accent
                }}
                to={`/project/${tool.slug}`}
                key={tool.slug}
              >

                <div className="tool-icon">
                  <KeyRound size={18} />
                </div>

                <div className="tool-title">
                  {tr?.[0] || tool.title}
                </div>

                <p>
                  {tr?.[1] ||
                    tool.description}
                </p>

                <div className="tags compact">
                  {tool.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <ArrowUpRight
                  className="tool-arrow"
                  size={18}
                />

              </Link>
            );
          })}

        </div>

        <PasswordGenerator t={t} />

      </div>
    </section>
  );
}

/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function PasswordGenerator({ t }) {
  const [open, setOpen] =
    useState(false);

  const [mode, setMode] =
    useState("phrase");

  const [phrase, setPhrase] =
    useState("nubes de amoniaco");

  const [length, setLength] =
    useState(18);

  const [useCase, setUseCase] =
    useState(true);

  const [useNumbers, setUseNumbers] =
    useState(true);

  const [useSymbols, setUseSymbols] =
    useState(true);

  const [useSeparators, setUseSeparators] =
    useState(true);

  const [password, setPassword] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const generatePhrase = () => {
    const replacements = {
      a: "4@",
      e: "3",
      i: "1!",
      o: "0",
      s: "5$",
      t: "7",
      g: "69"
    };

    const words = phrase
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) =>
        [...word]
          .filter((char) =>
            /[\p{L}\p{N}]/u.test(char)
          )
          .join("")
      );

    if (!words.length) {
      setPassword("");
      return;
    }

    let result = words
      .map((word) =>
        [...word]
          .map((char) => {
            const low =
              char.toLowerCase();

            if (
              useNumbers &&
              replacements[low] &&
              secureInt(100) < 42
            ) {
              return pick(
                replacements[low]
              );
            }

            if (
              useCase &&
              /[a-záéíóúüñ]/i.test(char) &&
              secureInt(100) < 48
            ) {
              return secureInt(2)
                ? char.toUpperCase()
                : char.toLowerCase();
            }

            return char;
          })
          .join("")
      )
      .join(
        useSeparators
          ? pick("_-.=+:")
          : ""
      );

    if (useNumbers) {
      result +=
        pick("0123456789") +
        pick("0123456789");
    }

    if (useSymbols) {
      result += pick(
        "!@#$%^&*+=?_-.:;~"
      );
    }

    if (useSeparators) {
      result += pick("_-.=+");
    }

    result = shuffle(
      [...result]
    ).join("");

    if (result.length < length) {
      const pool =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+=?_-.:;";

      while (result.length < length) {
        result += pick(pool);
      }
    }

    setPassword(
      shuffle(
        [
          ...result.slice(
            0,
            Math.max(length, 1)
          )
        ]
      ).join("")
    );

    setCopied(false);
  };

  const generateRandom = () => {
    const lower =
      "abcdefghijklmnopqrstuvwxyz";

    const upper =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const numbers =
      "0123456789";

    const symbols =
      "!@#$%^&*+=?_-.:;~";

    const pool =
      lower +
      upper +
      numbers +
      symbols;

    const chars = [
      pick(lower),
      pick(upper),
      pick(numbers),
      pick(symbols)
    ];

    while (chars.length < length) {
      chars.push(pick(pool));
    }

    setPassword(
      shuffle(chars).join("")
    );

    setCopied(false);
  };

  const generate = () =>
    mode === "phrase"
      ? generatePhrase()
      : generateRandom();

  const copy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(
        password
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        1600
      );
    } catch {}
  };

  const entropy =
    mode === "random"
      ? Math.round(
          length *
            Math.log2(
              26 + 26 + 10 + 28
            )
        )
      : Math.round(
          Math.max(
            1,
            phrase.replace(/\s+/g, "")
              .length
          ) *
            4.2 +
            (useNumbers ? 8 : 0) +
            (useSymbols ? 8 : 0) +
            (useSeparators ? 3 : 0)
        );

  return (
    <div className="utility-panel">

      <button
        className="utility-head"
        onClick={() =>
          setOpen(!open)
        }
        aria-expanded={open}
      >

        <div>

          <div className="section-number">
            {t.localUtility}
          </div>

          <h3>
            <KeyRound size={18} />
            {t.password}
          </h3>

          <p>
            {t.passwordDesc}
          </p>

        </div>

        <span
          className={`chevron ${
            open ? "open" : ""
          }`}
        >
          <ChevronDown size={18} />
        </span>

      </button>

      {open && (
        <div className="utility-content">

          <div className="password-layout">

            <div className="password-controls">

              <label>{t.mode}</label>

              <div className="mode-switch">

                <button
                  className={
                    mode === "phrase"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setMode("phrase")
                  }
                >
                  {t.phraseMode}
                </button>

                <button
                  className={
                    mode === "random"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setMode("random")
                  }
                >
                  {t.randomMode}
                </button>

              </div>

              {mode === "phrase" ? (
                <>
                  <label>
                    {t.basePhrase}
                  </label>

                  <input
                    value={phrase}
                    onChange={(event) =>
                      setPhrase(
                        event.target.value
                      )
                    }
                    placeholder="nubes de amoniaco"
                  />

                  <div className="option-grid">

                    <label>
                      <input
                        type="checkbox"
                        checked={useCase}
                        onChange={(event) =>
                          setUseCase(
                            event.target.checked
                          )
                        }
                      />
                      {t.uppercase}
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={(event) =>
                          setUseNumbers(
                            event.target.checked
                          )
                        }
                      />
                      {t.numbers}
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={(event) =>
                          setUseSymbols(
                            event.target.checked
                          )
                        }
                      />
                      {t.symbols}
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={useSeparators}
                        onChange={(event) =>
                          setUseSeparators(
                            event.target.checked
                          )
                        }
                      />
                      {t.separators}
                    </label>

                  </div>
                </>
              ) : (
                <div className="generator-note">
                  <Dices size={17} />
                  {t.csprngNote}
                </div>
              )}

              <label>
                {t.length}
                <strong>{length}</strong>
              </label>

              <input
                className="range"
                type="range"
                min="10"
                max="64"
                value={length}
                onChange={(event) =>
                  setLength(
                    Number(
                      event.target.value
                    )
                  )
                }
              />

              <button
                className="generate"
                onClick={generate}
              >
                <RotateCcw size={16} />
                {t.generate}
              </button>

            </div>

            <div className="password-result">

              <div className="result-top">
                <span>
                  {t.generated}
                </span>

                <span className="entropy">
                  {entropy} {t.approx}
                </span>
              </div>

              <div className="password-output">
                {password || (
                  <span>
                    {t.generatePlaceholder}
                  </span>
                )}
              </div>

              <button
                className="copy-button"
                onClick={copy}
                disabled={!password}
              >
                <Copy size={15} />
                {copied
                  ? t.copied
                  : t.copyPassword}
              </button>

              <div className="security-note">
                <ShieldCheck size={15} />
                {t.localOnly} ·{" "}
                <code>
                  crypto.getRandomValues()
                </code>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   DEBLOAT
========================================================= */

function Debloat({ t }) {
  const [open, setOpen] =
    useState(false);

  const [done, setDone] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            CHECKLIST_KEY
          ) || "{}"
        );
      } catch {
        return {};
      }
    });

  const completed =
    DEBLOAT_ITEMS.filter(
      (_, index) => done[index]
    ).length;

  const pct = Math.round(
    (completed /
      DEBLOAT_ITEMS.length) *
      100
  );

  const update = (next) => {
    localStorage.setItem(
      CHECKLIST_KEY,
      JSON.stringify(next)
    );

    setDone(next);
  };

  const toggle = (index) => {
    update({
      ...done,
      [index]: !done[index]
    });
  };

  const selectAll = () => {
    update(
      Object.fromEntries(
        DEBLOAT_ITEMS.map(
          (_, index) => [
            index,
            true
          ]
        )
      )
    );
  };

  const reset = () =>
    update({});

  return (
    <section
      id="debloat"
      className="section"
    >
      <div className="shell">

        <SectionHeader
          number={t.debloatKicker}
          title={t.debloatTitle}
          copy={t.debloatCopy}
        />

        <div className="debloat-panel">

          <div className="debloat-copy">

            <div className="section-number">
              {t.checklistKicker}
            </div>

            <h3>
              {t.checklistTitle}
            </h3>

            <p>
              {t.checklistDesc}
            </p>

            <div className="progress">
              <i
                style={{
                  width: `${pct}%`
                }}
              />
            </div>

            <div className="progress-meta">
              <span>
                {completed} /{" "}
                {DEBLOAT_ITEMS.length}{" "}
                {t.completed}
              </span>

              <strong>
                {pct}%
              </strong>
            </div>

          </div>

          <div className="debloat-actions">

            <button
              className="button primary"
              onClick={() =>
                setOpen(!open)
              }
            >
              {open
                ? t.closeChecklist
                : t.openChecklist}

              <ChevronDown size={16} />
            </button>

            <button
              className="button"
              onClick={selectAll}
            >
              <Check size={15} />
              {t.selectAll}
            </button>

            <button
              className="button"
              onClick={reset}
            >
              <RotateCcw size={15} />
              {t.clearAll}
            </button>

          </div>

        </div>

        {open && (
          <div className="checklist-panel">

            <div className="checklist-summary">
              <span>
                {completed} /{" "}
                {DEBLOAT_ITEMS.length}
              </span>

              <span>
                {pct}%
              </span>
            </div>

            {DEBLOAT_ITEMS.map(
              ([title, desc, level], index) => (
                <label
                  className={`check-item ${
                    done[index]
                      ? "checked"
                      : ""
                  }`}
                  key={title}
                >

                  <input
                    type="checkbox"
                    checked={
                      !!done[index]
                    }
                    onChange={() =>
                      toggle(index)
                    }
                  />

                  <span className="checkmark">
                    <Check size={13} />
                  </span>

                  <span className="check-copy">
                    <strong>
                      {title}
                    </strong>

                    <small>
                      {desc}
                    </small>
                  </span>

                  <span
                    className={`risk ${level}`}
                  >
                    {level === "safe"
                      ? t.ok
                      : level === "review"
                      ? t.review
                      : t.omit}
                  </span>

                </label>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
}

/* =========================================================
   PROJECT PAGE
========================================================= */

function ProjectPage() {
  const { t, lang } =
    useLocale();

  const { slug } =
    useParams();

  const project =
    PROJECTS.find(
      (item) =>
        item.slug === slug
    );

  const tool =
    TOOLS.find(
      (item) =>
        item.slug === slug
    );

  const item =
    project || tool;

  if (!item) {
    return (
      <Layout>
        <div className="shell not-found">
          <h1>{t.notFound}</h1>

          <Link to="/">
            {t.back}
          </Link>
        </div>
      </Layout>
    );
  }

  const tr = project
    ? dataTranslations[lang]?.[
        project.title
      ] || {}
    : {};

  const p = {
    ...item,
    ...tr,

    category: project
      ? tr.category ||
        item.category
      : t.categoryToolkit,

    status: project
      ? tr.status ||
        item.status
      : t.available,

    details: project
      ? tr.details ||
        item.details
      : item.description,

    features: project
      ? tr.features ||
        item.features
      : [
          "Focused utility",
          "Designed for Windows",
          "Built as part of DNX Lab"
        ],

    links:
      item.links || {
        source: "",
        demo: ""
      }
  };

  return (
    <Layout>

      <main
        className="detail"
        style={{
          "--accent": p.accent
        }}
      >

        <div className="shell">

          <Link
            className="back"
            to="/"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>

          <div className="detail-kicker">
            {p.category} / {p.status}
          </div>

          <h1>{p.title}</h1>

          <p className="detail-lead">
            {p.details}
          </p>

          <div className="detail-grid">

            <div className="detail-main">

              <h2>
                {t.overview}
              </h2>

              <p>
                {p.description}
              </p>

              <h2>
                {t.features}
              </h2>

              <div className="detail-features">
                {p.features.map(
                  (feature) => (
                    <div
                      key={feature}
                    >
                      <Check size={15} />
                      {feature}
                    </div>
                  )
                )}
              </div>

            </div>

            <aside className="detail-side">

              <div className="detail-box">

                <div className="detail-label">
                  {t.technology}
                </div>

                <div className="tags">
                  {p.tags.map(
                    (tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    )
                  )}
                </div>

              </div>

              <div className="detail-box">

                <div className="detail-label">
                  {t.links}
                </div>

                {p.links?.source ? (
                  <a
                    href={
                      p.links.source
                    }
                  >
                    {t.sourceCode}
                    <ArrowUpRight
                      size={14}
                    />
                  </a>
                ) : (
                  <span className="muted">
                    {t.notPublished}
                  </span>
                )}

                {p.links?.demo ? (
                  <a
                    href={p.links.demo}
                  >
                    {t.liveDemo}
                    <ArrowUpRight
                      size={14}
                    />
                  </a>
                ) : null}

              </div>

            </aside>

          </div>

        </div>

      </main>

    </Layout>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const { t } =
    useLocale();

  return (
    <footer>
      <div className="shell footer">

        <div>

          <div className="footer-brand">
            D<span>.</span>
          </div>

          <p>
            {t.footer}
          </p>

        </div>

        <div className="footer-right">

          <span>
            © 2026 dienix
          </span>

          <span>
            {t.powered}{" "}
            <strong>
              DNX Lab
            </strong>
          </span>

        </div>

      </div>
    </footer>
  );
}

/* =========================================================
   ROOT
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </BrowserRouter>
);