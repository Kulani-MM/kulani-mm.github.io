(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
    if (window.innerWidth <= 768) {
      document.querySelector(".nav-links").classList.remove("active");
    }
  });
});

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
      () => {
        alert("Message sent successfully! I will get back to you soon.");
        this.reset();
      },
      (error) => {
        alert("Failed to send message. Please try again later.");
        console.error("EmailJS error:", error);
      }
    );
  });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(
    ".section, .project-card, .resume-card, .contact-item, .contact-form, .stat-card, .resume-header"
  )
  .forEach((element) => {
    observer.observe(element);
  });
