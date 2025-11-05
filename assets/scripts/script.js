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

function updateQuote(containerId, textClass, authorClass) {
  const quoteContainer = document.getElementById(containerId);
  if (!quoteContainer) return;

  const quoteTextElement = quoteContainer.querySelector(textClass);
  const quoteAuthorElement = quoteContainer.querySelector(authorClass);

  if (!quoteTextElement || !quoteAuthorElement) return;

  const index = getQuoteIndexBasedOnTime();
  const currentQuote = quotes[index];

  quoteContainer.style.opacity = 0;

  setTimeout(() => {
    quoteTextElement.textContent = `“${currentQuote.quote}”`;
    quoteAuthorElement.textContent = `- ${currentQuote.author}`;
    quoteContainer.style.opacity = 1;
  }, 500);
}

function updateAllQuotes() {
  updateQuote("quote-section", ".quote-text", ".quote-author");
  updateQuote(
    "quote-section-sidebar",
    ".quote-text-sidebar",
    ".quote-author-sidebar"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  showTab("about");
  updateAllQuotes();
  setInterval(updateAllQuotes, 60000);
});
