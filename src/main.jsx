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

    instructionsTitle: "How to run W Debloat",
    instructionsText:
      "W Debloat uses WinUtil by Chris Titus Tech. Open PowerShell or Windows Terminal as administrator, paste the command below and follow the setup. Review the selected changes before applying them.",
    instructionsLink: "Official WinUtil",
    instructionsSteps: "PowerShell / Windows Terminal as administrator",
    instructionsStep2: "Paste the command below",
    instructionsStep3: "Review the changes and create a restore point if desired",
    instructionsCommandLabel: "Recommended command",
    instructionsWarning:
      "Do not run debloat scripts blindly. Review app removals and system tweaks before applying them.",

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

    statusActive: "ACTIVE",
    statusBeta: "BETA",
    statusComingSoon: "COMING SOON",

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

    instructionsTitle: "Cómo ejecutar W Debloat",
    instructionsText:
      "W Debloat utiliza WinUtil de Chris Titus Tech. Abre PowerShell o Terminal de Windows como administrador, pega el comando de abajo y sigue el asistente. Revisa los cambios seleccionados antes de aplicarlos.",
    instructionsLink: "WinUtil oficial",
    instructionsSteps: "PowerShell / Terminal de Windows como administrador",
    instructionsStep2: "Pega el comando de abajo",
    instructionsStep3: "Revisa los cambios y crea un punto de restauración si quieres",
    instructionsCommandLabel: "Comando recomendado",
    instructionsWarning:
      "No ejecutes herramientas de debloat a ciegas. Revisa las eliminaciones y los cambios del sistema antes de aplicarlos.",

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

    statusActive: "ACTIVO",
    statusBeta: "BETA",
    statusComingSoon: "PRÓXIMAMENTE",

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

    instructionsTitle: "W Debloat ausführen",
    instructionsText:
      "W Debloat nutzt WinUtil von Chris Titus Tech. Öffne PowerShell oder Windows Terminal als Administrator, füge den folgenden Befehl ein und folge dem Assistenten. Prüfe die ausgewählten Änderungen vor der Anwendung.",
    instructionsLink: "Offizielles WinUtil",
    instructionsSteps: "PowerShell / Windows Terminal als Administrator",
    instructionsStep2: "Den folgenden Befehl einfügen",
    instructionsStep3: "Änderungen prüfen und bei Bedarf einen Wiederherstellungspunkt erstellen",
    instructionsCommandLabel: "Empfohlener Befehl",
    instructionsWarning:
      "Debloat-Tools nicht blind ausführen. Prüfe App-Entfernungen und Systemänderungen vor der Anwendung.",

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

    statusActive: "AKTIV",
    statusBeta: "BETA",
    statusComingSoon: "DEMNÄCHST",

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

    "Odenvia Stay": {
      title: "Odenvia Stay",
      description:
        "Plataforma web moderna para descubrir alojamientos, consultar disponibilidad y realizar reservas.",
      details:
        "Demo de una plataforma de alquiler vacacional centrada en la experiencia del huésped, desde la búsqueda y consulta del alojamiento hasta la disponibilidad, las actividades locales y el proceso de reserva simulado.",
      status: "Demo",
      category: "Web",
      features: [
        "Presentación del alojamiento con información y precios",
        "Calendario de disponibilidad y proceso de reserva simulado",
        "Información sobre actividades y lugares de interés locales"
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

    "Odenvia Stay": {
      title: "Odenvia Stay",
      description:
        "Moderne Webplattform zur Entdeckung von Unterkünften, Verfügbarkeitsprüfung und Buchung.",
      details:
        "Demo einer Ferienvermietungsplattform mit Fokus auf die Gästeerfahrung – von der Suche und Präsentation der Unterkunft über die Verfügbarkeit bis hin zu lokalen Aktivitäten und einem simulierten Buchungsprozess.",
      status: "Demo",
      category: "Web",
      features: [
        "Präsentation der Unterkunft mit Informationen und Preisen",
        "Verfügbarkeitskalender und simulierter Buchungsprozess",
        "Informationen zu lokalen Aktivitäten und Sehenswürdigkeiten"
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
    ],
    "Template Studio": [
      "Template Studio",
      "Generador de plantillas para GoodNotes."
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
    ],
    "Template Studio": [
      "Template Studio",
      "Generator für GoodNotes-Vorlagen."
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

  const categoryLabels = {
    All: t.all,
    Software: "Software",
    Web: "Web",
    Productivity:
      lang === "es"
        ? "Productividad"
        : lang === "de"
          ? "Produktivität"
          : "Productivity"
  };

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
              className={`filter ${filter === category
                  ? "active"
                  : ""
                }`}
              key={category}
              onClick={() =>
                setFilter(category)
              }
            >
              {categoryLabels[category] || category}
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

            const statusLabel = {
              active: t.statusActive,
              beta: t.statusBeta,
              "coming-soon": t.statusComingSoon
            }[tool.status];

            const content = (
              <>
                <div className="tool-card-top">
                  <div className="tool-icon">
                    <KeyRound size={18} />
                  </div>

                  <div className="tool-status-row">
                    {tool.status && (
                      <span className={`tool-status ${tool.status}`}>
                        {statusLabel}
                      </span>
                    )}

                    <ArrowUpRight
                      className="tool-arrow"
                      size={18}
                    />
                  </div>
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
              </>
            );

            if (tool.externalUrl) {
              return (
                <a
                  className="tool-card"
                  style={{
                    "--accent": tool.accent
                  }}
                  href={tool.externalUrl}
                  key={tool.slug}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                className="tool-card"
                style={{
                  "--accent": tool.accent
                }}
                to={`/project/${tool.slug}`}
                key={tool.slug}
              >
                {content}
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

    /*
      Memorable phrase mode keeps the original word order
      and structure. Characters are transformed, separators
      stay between words, and extra entropy is appended at
      the end. The phrase is never globally shuffled.
    */
    const transformedWords = words.map((word) =>
      [...word]
        .map((char) => {
          const low = char.toLowerCase();

          if (
            useNumbers &&
            replacements[low] &&
            secureInt(100) < 42
          ) {
            return pick(replacements[low]);
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
    );

    let result = transformedWords.join(
      useSeparators
        ? pick("_-.=+:")
        : ""
    );

    const suffix = [];

    if (useNumbers) {
      suffix.push(
        pick("0123456789"),
        pick("0123456789")
      );
    }

    if (useSymbols) {
      suffix.push(
        pick("!@#$%^&*+=?_-.:;~")
      );
    }

    if (useSeparators) {
      suffix.push(
        pick("_-.=+")
      );
    }

    if (suffix.length) {
      result += pick("_-.=+") + suffix.join("");
    }

    const pool =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+=?_-.:;";

    /*
      If the phrase is shorter than the requested length,
      complete it at the end. If the phrase itself is longer
      than the selected length, keep it intact rather than
      truncating or destroying its recognisable structure.
    */
    while (result.length < Math.max(length, 1)) {
      result += pick(pool);
    }

    setPassword(result);
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
    } catch { }
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
          className={`chevron ${open ? "open" : ""
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
   LOCALIZED W DEBLOAT CHECKLIST
========================================================= */

const debloatTranslations = {
  en: [
    ["Activity history", "Disables unnecessary activity history."],
    ["Consumer features", "Disables automatic consumer-oriented content and apps."],
    ["Storage Sense / Disk cleanup", "Runs Windows disk cleanup and removes temporary files."],
    ["End task", "Adds the End Task option to the taskbar context menu."],
    ["Automatic folder discovery", "Disables automatic folder type detection for consistent Explorer views."],
    ["Location tracking", "Disable this if the PC does not need Windows location services."],
    ["Recommended Store search", "Disables recommended content in Microsoft Store searches."],
    ["Background apps", "Disables unnecessary apps from running in the background."],
    ["Explorer Home / Gallery", "Removes Home/Gallery content if you do not use it."],
    ["Edge debloat", "Removes unnecessary Edge extras without uninstalling Edge."],
    ["Windows AI", "Disables or removes Windows AI components you do not need."],
    ["Classic context menu", "Restores the previous right-click context menu design."],
    ["Widgets", "Removes Windows Widgets if you do not use them."],
    ["Telemetry", "Reduces or disables optional telemetry."],
    ["Temporary files", "Cleans temporary user and system files."],
    ["Restore point", "Creates a restore point before applying important changes."]
  ],
  es: [
    ["Historial de actividad", "Desactiva el historial de actividad innecesario."],
    ["Funciones para consumidores", "Desactiva contenido/apps automáticos orientados al consumidor."],
    ["Liberador de espacio", "Ejecuta la limpieza de disco y de archivos temporales de Windows."],
    ["Finalizar tarea", "Activa la opción Finalizar tarea en el menú contextual de la barra de tareas."],
    ["Detección automática de carpetas", "Desactiva la detección automática del tipo de carpeta si quieres vistas de Explorer consistentes."],
    ["Seguimiento de ubicación", "Desactívalo si el equipo no necesita los servicios de ubicación de Windows."],
    ["Búsqueda recomendada de Store", "Desactiva el contenido recomendado en las búsquedas de Microsoft Store."],
    ["Aplicaciones en segundo plano", "Desactiva la ejecución en segundo plano de aplicaciones innecesarias."],
    ["Inicio / Galería del Explorador", "Elimina el contenido de Inicio/Galería si no te resulta útil."],
    ["Debloat de Edge", "Elimina extras innecesarios de Edge sin desinstalar Edge."],
    ["Windows AI", "Desactiva/elimina componentes de Windows AI que no necesites."],
    ["Menú contextual clásico", "Restaura el diseño anterior del menú contextual del botón derecho."],
    ["Widgets", "Elimina Windows Widgets si no los utilizas."],
    ["Telemetría", "Reduce/desactiva la telemetría opcional."],
    ["Archivos temporales", "Limpia archivos temporales del usuario y del sistema."],
    ["Punto de restauración", "Crea un punto de restauración antes de aplicar cambios importantes."]
  ],
  de: [
    ["Aktivitätsverlauf", "Deaktiviert den unnötigen Aktivitätsverlauf."],
    ["Verbraucherfunktionen", "Deaktiviert automatische Inhalte und Apps für Verbraucher."],
    ["Datenträgerbereinigung", "Führt die Windows-Datenträgerbereinigung und die Bereinigung temporärer Dateien aus."],
    ["Aufgabe beenden", "Aktiviert die Option Aufgabe beenden im Kontextmenü der Taskleiste."],
    ["Automatische Ordnertyperkennung", "Deaktiviert die automatische Erkennung des Ordnertyps für einheitliche Explorer-Ansichten."],
    ["Standortverfolgung", "Deaktivieren, wenn der PC keine Windows-Standortdienste benötigt."],
    ["Empfohlene Store-Suche", "Deaktiviert empfohlene Inhalte in Microsoft-Store-Suchen."],
    ["Hintergrund-Apps", "Deaktiviert unnötige Apps, die im Hintergrund ausgeführt werden."],
    ["Explorer-Startseite / Galerie", "Entfernt Startseite-/Galerie-Inhalte, wenn du sie nicht verwendest."],
    ["Edge-Debloat", "Entfernt unnötige Edge-Zusatzfunktionen, ohne Edge zu deinstallieren."],
    ["Windows AI", "Deaktiviert oder entfernt nicht benötigte Windows-AI-Komponenten."],
    ["Klassisches Kontextmenü", "Stellt das frühere Design des Rechtsklick-Kontextmenüs wieder her."],
    ["Widgets", "Entfernt Windows Widgets, wenn du sie nicht verwendest."],
    ["Telemetrie", "Reduziert oder deaktiviert optionale Telemetrie."],
    ["Temporäre Dateien", "Bereinigt temporäre Benutzer- und Systemdateien."],
    ["Wiederherstellungspunkt", "Erstellt vor wichtigen Änderungen einen Wiederherstellungspunkt."]
  ]
};

const debloatRiskLevel = (level, t) =>
  level === "safe" ? t.ok : level === "review" ? t.review : t.omit;

/* =========================================================
   DEBLOAT
========================================================= */

function Debloat({ t, lang }) {
  const localizedItems = DEBLOAT_ITEMS.map(([title, desc, level], index) => {
    const translated = debloatTranslations[lang]?.[index] || debloatTranslations.en[index];
    return [translated[0], translated[1], level];
  });

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
    localizedItems.filter(
      (_, index) => done[index]
    ).length;

  const pct = Math.round(
    (completed /
      localizedItems.length) *
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
        localizedItems.map(
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
                {localizedItems.length}{" "}
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

        <div className="debloat-instructions">
          <div className="section-number">{t.instructionsTitle}</div>

          <p>{t.instructionsText}</p>

          <div className="instruction-steps">
            <div>
              <span>01</span>
              <strong>{t.instructionsSteps}</strong>
            </div>
            <div>
              <span>02</span>
              <strong>{t.instructionsStep2}</strong>
            </div>
            <div>
              <span>03</span>
              <strong>{t.instructionsStep3}</strong>
            </div>
          </div>

          <div className="instruction-command">
            <div className="instruction-command-head">
              <span>{t.instructionsCommandLabel}</span>
              <a
                href="https://github.com/ChrisTitusTech/winutil"
                target="_blank"
                rel="noreferrer"
              >
                {t.instructionsLink}
                <ArrowUpRight size={14} />
              </a>
            </div>

            <code>
              irm https://christitus.com/win | iex
            </code>
          </div>

          <div className="instruction-warning">
            <ShieldCheck size={15} />
            <span>{t.instructionsWarning}</span>
          </div>
        </div>

        {open && (
          <div className="checklist-panel">

            <div className="checklist-summary">
              <span>
                {completed} /{" "}
                {localizedItems.length}
              </span>

              <span>
                {pct}%
              </span>
            </div>

            {localizedItems.map(
              ([title, desc, level], index) => (
                <label
                  className={`check-item ${done[index]
                      ? "checked"
                      : ""
                    }`}
                  style={{
                    gridTemplateColumns: "20px minmax(0, 1fr) auto"
                  }}
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

                  <span
                    className="check-copy"
                    style={{ minWidth: 0 }}
                  >
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