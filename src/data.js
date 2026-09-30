export const DEBLOAT_ITEMS = [
  ["Historial de actividad", "Desactiva el historial de actividad innecesario.", "safe"],
  ["Funciones para consumidores", "Desactiva contenido/apps automáticos orientados al consumidor.", "safe"],
  ["Liberador de espacio", "Ejecuta la limpieza de disco y de archivos temporales de Windows.", "safe"],
  ["Finalizar tarea", "Activa la opción Finalizar tarea en el menú contextual de la barra de tareas.", "safe"],
  ["Detección automática de carpetas", "Desactiva la detección automática del tipo de carpeta si quieres vistas de Explorer consistentes.", "safe"],
  ["Seguimiento de ubicación", "Desactívalo si el equipo no necesita los servicios de ubicación de Windows.", "review"],
  ["Búsqueda recomendada de Store", "Desactiva el contenido recomendado en las búsquedas de Microsoft Store.", "safe"],
  ["Aplicaciones en segundo plano", "Desactiva la ejecución en segundo plano de aplicaciones innecesarias.", "safe"],
  ["Inicio / Galería del Explorador", "Elimina el contenido de Inicio/Galería si no te resulta útil.", "safe"],
  ["Debloat de Edge", "Elimina extras innecesarios de Edge sin desinstalar Edge.", "safe"],
  ["Windows AI", "Desactiva/elimina componentes de Windows AI que no necesites.", "review"],
  ["Menú contextual clásico", "Restaura el diseño anterior del menú contextual del botón derecho.", "safe"],
  ["Widgets", "Elimina Windows Widgets si no los utilizas.", "safe"],
  ["Telemetría", "Reduce/desactiva la telemetría opcional.", "review"],
  ["Archivos temporales", "Limpia archivos temporales del usuario y del sistema.", "safe"],
  ["Punto de restauración", "Crea un punto de restauración antes de aplicar cambios importantes.", "safe"],
];

export const PROJECTS = [
  {
    slug: "beeweb",
    title: "BeeWeb",
    status: "In Progress",
    category: "Software",
    accent: "#FFB86B",
    description: "A modular management platform for beekeeping and agricultural operations.",
    details: "BeeWeb is being developed as a practical ERP-style platform for managing hives, inspections, treatments, inventory and future agricultural modules from one place.",
    tags: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "JWT", "QR Code"],
    features: ["QR-based hive tracking", "Secure authentication system", "Centralized data management", "Inspection and varroa control workflow"],
    links: { source: "", demo: "" }
  },
  {
    slug: "odenvia-demo",
    title: "Odenvia Stay",
    status: "Demo",
    category: "Web",
    accent: "#8C6CFF",
    description: "A modern vacation rental platform focused on accommodation discovery, availability and booking flow.",
    details: "A frontend-focused vacation rental demo exploring the guest experience, from discovering a property and checking availability to reviewing local activities and completing a simulated booking.",
    tags: ["React", "Vite", "React Router", "Mock Data"],
    features: [
      "Property showcase with accommodation details and pricing",
      "Availability calendar and simulated booking flow",
      "Local activities and destination information"
    ],
    links: {
      source: "",
      demo: "https://tools.dnxlab.de/odenvia-demo/"
    }
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    status: "Functional",
    category: "Productivity",
    accent: "#FF5CA8",
    description: "A task manager focused on deadlines, reminders and calendar synchronization.",
    details: "A personal productivity application with task handling, reminders and Google Calendar synchronization.",
    tags: ["PHP", "MySQL", "JavaScript", "Google Calendar API"],
    features: ["Deadline and reminder system", "Google Calendar synchronization", "User authentication and session handling"],
    links: { source: "", demo: "" }
  }
];

export const TOOLS = [
  { slug: "dnx-lab", title: "DNX Lab", description: "A growing collection of practical Windows utilities.", accent: "#00F0FF", tags: ["Windows", "C#", "PowerShell"] },
  { slug: "dnx-cleaner", title: "DNX Cleaner", description: "Windows cleanup and maintenance utility.", accent: "#8C6CFF", tags: ["Windows", "PowerShell"] },
  { slug: "desktop-mover", title: "Desktop Mover", description: "Keeps new desktop icons positioned on the intended monitor.", accent: "#FFB86B", tags: ["Windows", "C#", "WinAPI"] },
  { slug: "dnx-winget", title: "DNX Winget", description: "A focused software installation workflow for fresh Windows setups.", accent: "#FF5CA8", tags: ["Windows", "WinGet", "C#"] }
];

export const NAV_ITEMS = [
  { id: "projects", label: "PROJECTS" },
  { id: "toolkit", label: "TOOLKIT" },
  { id: "debloat", label: "W DEBLOAT" }
];
