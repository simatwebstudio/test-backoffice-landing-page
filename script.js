const OPENING_HOURS = {
  0: [{ start: "18:00", end: "22:00" }],
  1: [],
  2: [],
  3: [{ start: "18:00", end: "22:00" }],
  4: [{ start: "18:00", end: "22:00" }],
  5: [{ start: "18:00", end: "22:00" }],
  6: [{ start: "18:00", end: "22:00" }],
};

const DAY_NAMES = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getRomeTimeParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    day: dayMap[parts.weekday],
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

function findNextOpening(day, minutes) {
  for (let offset = 0; offset < 8; offset += 1) {
    const nextDay = (day + offset) % 7;
    const ranges = OPENING_HOURS[nextDay];

    for (const range of ranges) {
      const start = timeToMinutes(range.start);

      if (offset > 0 || start > minutes) {
        return {
          day: nextDay,
          time: range.start,
          label: `${DAY_NAMES[nextDay]} alle ${range.start}`,
        };
      }
    }

    minutes = -1;
  }

  return null;
}

function isOpen(date = new Date()) {
  const { day, minutes } = getRomeTimeParts(date);
  const ranges = OPENING_HOURS[day];

  for (const range of ranges) {
    const start = timeToMinutes(range.start);
    const end = timeToMinutes(range.end);

    if (minutes >= start && minutes < end) {
      return {
        open: true,
        closesAt: range.end,
        nextOpen: null,
      };
    }
  }

  return {
    open: false,
    closesAt: null,
    nextOpen: findNextOpening(day, minutes),
  };
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");

  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (!toggle || !nav) return;

  const closeMenu = () => {
    document.body.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri menu");
  };

  toggle.addEventListener("click", () => {
    const willOpen = !document.body.classList.contains("is-menu-open");
    document.body.classList.toggle("is-menu-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Chiudi menu" : "Apri menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function updateOpeningStatus() {
  const status = document.querySelector("[data-open-status]");
  const label = document.querySelector("[data-open-label]");
  const detail = document.querySelector("[data-open-detail]");

  if (!status || !label || !detail) return;

  const state = isOpen();
  status.classList.toggle("is-closed", !state.open);

  if (state.open) {
    label.textContent = "Aperto ora";
    detail.textContent = `Chiude alle ${state.closesAt}`;
    return;
  }

  label.textContent = "Chiuso ora";
  detail.textContent = state.nextOpen ? `Riapre ${state.nextOpen.label}` : "Controlla gli orari";
}

function initCurrentYear() {
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function initLegalLanguage() {
  const buttons = document.querySelectorAll("[data-lang-button]");

  if (!buttons.length) return;

  const panels = document.querySelectorAll("[data-lang-panel]");
  const legalContent = document.querySelector(".legal-content");
  const description = document.querySelector('meta[name="description"]');

  const setLanguage = (language) => {
    const isEnglish = language === "en";

    document.documentElement.lang = language;
    document.body.dataset.legalLang = language;
    document.title = isEnglish ? "Privacy Notice | Pizza 38 Bra" : "Privacy Policy | Pizza 38 Bra";

    if (description) {
      description.content = isEnglish
        ? "Pizza 38 privacy notice: GitHub Pages hosting, no cookies or trackers, external links and data subject rights."
        : "Informativa sul trattamento dei dati personali del sito Pizza 38: hosting GitHub Pages, assenza di cookie e tracciatori, collegamenti esterni e diritti degli interessati.";
    }

    if (legalContent) {
      legalContent.setAttribute("aria-label", isEnglish ? "Privacy notice content" : "Contenuto dell'informativa privacy");
    }

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.langPanel !== language;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.langButton === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.langButton));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  updateOpeningStatus();
  initCurrentYear();
  initLegalLanguage();

  window.setInterval(updateOpeningStatus, 60 * 1000);
});

window.isOpen = isOpen;
