function toggleAccordion(element) {
  const item = element.parentElement;
  const wasActive = item.classList.contains("active");

  // Close all items
  document.querySelectorAll(".toggle-item").forEach((i) => {
    i.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!wasActive) {
    item.classList.add("active");
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document
  .querySelectorAll(".section, .feature-card, .toggle-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add scroll progress indicator
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  let progressBar = document.getElementById("progressBar");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: ${scrolled}%;
                    height: 3px;
                    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                    z-index: 9999;
                    transition: width 0.1s ease;
                `;
    document.body.appendChild(progressBar);
  } else {
    progressBar.style.width = scrolled + "%";
  }
});
