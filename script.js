// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ===== DARK MODE TOGGLE =====
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙";
toggleBtn.classList.add("dark-toggle");
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});
