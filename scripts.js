document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile nav toggle (if you add a hamburger later) ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // --- Smooth scroll for internal anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- Typewriter Effect (robust loop) ---
  const typeEl = document.getElementById("typewriter");
  const words = ["Tomorrow", "Today"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isDotting = false;
  let dotCount = 0;

  const TYPING_SPEED = 150;     // ms per character while typing
  const DELETING_SPEED = 75;    // ms per character while deleting
  const DOT_INTERVAL = 350;     // ms between dot additions
  const PAUSE_AFTER_WORD = 700; // pause after a full cycle before next word

  function typeLoop() {
    if (!typeEl) return;

    const current = words[wordIndex];

    // 1) Typing phase
    if (!isDeleting && !isDotting) {
      charIndex++;
      typeEl.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        // word complete -> go into dotting phase
        isDotting = true;
        dotCount = 0;
        setTimeout(typeLoop, DOT_INTERVAL);
      } else {
        setTimeout(typeLoop, TYPING_SPEED);
      }
      return;
    }

    // 2) Dotting phase (adds 1..3 dots after full word)
    if (isDotting) {
      dotCount++;
      typeEl.textContent = current + ".".repeat(dotCount);

      if (dotCount >= 3) {
        // start deleting next
        isDotting = false;
        isDeleting = true;
        charIndex = current.length - 1; // begin deleting from last char
        setTimeout(typeLoop, DELETING_SPEED);
      } else {
        setTimeout(typeLoop, DOT_INTERVAL);
      }
      return;
    }

    // 3) Deleting phase (removes characters one-by-one)
    if (isDeleting) {
      typeEl.textContent = current.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        // finished deleting -> move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        setTimeout(typeLoop, PAUSE_AFTER_WORD);
      } else {
        setTimeout(typeLoop, DELETING_SPEED);
      }
      return;
    }
  }

  // start the typewriter if the element exists
  if (typeEl) typeLoop();

  console.log("Scripts loaded successfully 🚀");
});
