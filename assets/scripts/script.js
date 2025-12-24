function showTab(tabId) {
  const allTabs = document.querySelectorAll(".tab-content");
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  const allButtons = document.querySelectorAll(".nav-item");
  allButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  const activeBtn = document.querySelector(
    `.nav-item[onclick="showTab('${tabId}')"]`
  );
  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}

const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "We must all suffer one of two things: the pain of discipline or the pain of regret.",
    author: "Jim Rohn",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
];

function getQuoteIndexBasedOnTime() {
  const totalQuotes = quotes.length;
  const now = new Date().getTime();

  const intervalLength = 5 * 60 * 1000;

  const intervalCount = Math.floor(now / intervalLength);

  return intervalCount % totalQuotes;
}

function updateQuote(containerId, textClass, authorClass, skipAnimation = false) {
  const quoteContainer = document.getElementById(containerId);
  if (!quoteContainer) return;

  const quoteTextElement = quoteContainer.querySelector(textClass);
  const quoteAuthorElement = quoteContainer.querySelector(authorClass);

  if (!quoteTextElement || !quoteAuthorElement) return;

  const index = getQuoteIndexBasedOnTime();
  const currentQuote = quotes[index];

  if (skipAnimation) {
    quoteTextElement.textContent = `"${currentQuote.quote}"`;
    quoteAuthorElement.textContent = `- ${currentQuote.author}`;
  } else {
    quoteContainer.style.opacity = 0;

    setTimeout(() => {
      quoteTextElement.textContent = `"${currentQuote.quote}"`;
      quoteAuthorElement.textContent = `- ${currentQuote.author}`;
      quoteContainer.style.opacity = 1;
    }, 500);
  }
}

function updateAllQuotes(skipAnimation = false) {
  updateQuote("quote-section", ".quote-text", ".quote-author", skipAnimation);
  updateQuote(
    "quote-section-sidebar",
    ".quote-text-sidebar",
    ".quote-author-sidebar",
    skipAnimation
  );
}

// Portfolio filter functionality
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-v2");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          const cardCategory = card.getAttribute("data-category");
          card.style.display = cardCategory === filterValue ? "block" : "none";
        }
      });
    });
  });
}

// Form submission handling
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (form && submitBtn) {
    form.addEventListener("submit", () => {
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoading = submitBtn.querySelector(".btn-loading");
      const btnIcon = submitBtn.querySelector(".fa-paper-plane");

      if (btnText && btnLoading && btnIcon) {
        btnText.style.display = "none";
        btnIcon.style.display = "none";
        btnLoading.style.display = "inline";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "not-allowed";
      }
    });
  }
}

// Theme system based on time of day
const themes = {
  morning: {
    name: 'morning',
    accent: '#f39c12', // Warm orange/amber
    time: { start: 6, end: 12 }
  },
  afternoon: {
    name: 'afternoon',
    accent: '#3498db', // Bright blue
    time: { start: 12, end: 18 }
  },
  evening: {
    name: 'evening',
    accent: '#d3c26b', // Gold (current/default)
    time: { start: 18, end: 22 }
  },
  night: {
    name: 'night',
    accent: '#9b59b6', // Purple
    time: { start: 22, end: 6 }
  }
};

const themeOrder = ['morning', 'afternoon', 'evening', 'night'];
let manualOverride = false;

function getThemeByTime() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return themes.morning;
  if (hour >= 12 && hour < 18) return themes.afternoon;
  if (hour >= 18 && hour < 22) return themes.evening;
  return themes.night;
}

function applyTheme(themeName = null) {
  let theme;

  if (themeName) {
    // Manual selection
    theme = themes[themeName];
    manualOverride = true;
    localStorage.setItem('manual-theme', themeName);
  } else if (manualOverride) {
    // Use saved manual theme
    const saved = localStorage.getItem('manual-theme');
    theme = saved ? themes[saved] : getThemeByTime();
  } else {
    // Auto by time
    theme = getThemeByTime();
  }

  const root = document.documentElement;
  root.style.setProperty('--accent', theme.accent);
  localStorage.setItem('current-theme', theme.name);
}

function cycleTheme() {
  const currentTheme = localStorage.getItem('current-theme') || 'evening';
  const currentIndex = themeOrder.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themeOrder.length;
  const nextTheme = themeOrder[nextIndex];

  applyTheme(nextTheme);
}

function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', cycleTheme);
  }

  // Check if user had manual override
  const manualTheme = localStorage.getItem('manual-theme');
  if (manualTheme) {
    manualOverride = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showTab("about");
  updateAllQuotes(true); // Skip animation on initial load
  setInterval(updateAllQuotes, 60000);
  initPortfolioFilters();
  initContactForm();
  initThemeSwitcher();

  // Apply theme on load
  applyTheme();

  // Check for theme change every minute (only if no manual override)
  setInterval(() => {
    if (!manualOverride) {
      applyTheme();
    }
  }, 60000);
});
