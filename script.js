// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

// Active nav link highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (scrollY >= sectionTop) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
// Set correct icon on load
toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Animate skill bars when in view
const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".progress span");

function animateSkills() {
  const sectionTop = skillSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    skillBars.forEach(bar => {
      const target = bar.getAttribute("data-progress");
      bar.style.width = target + "%";
    });
    window.removeEventListener("scroll", animateSkills); // run once
  }
}

window.addEventListener("scroll", animateSkills);
