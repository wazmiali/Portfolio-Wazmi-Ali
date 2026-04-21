const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navOverlay = document.getElementById("navOverlay");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const loader = document.getElementById("loader");
const projectFilter = document.getElementById("projectFilter");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const formResult = document.getElementById("formResult");
const typingTextElement = document.getElementById("typingText");
const photoUpload = document.getElementById("photoUpload");
const profilePhoto = document.getElementById("profilePhoto");
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatSend = document.getElementById("chatSend");
const chatInput = document.getElementById("chatInput");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const searchForm = document.getElementById("searchForm");
const pageSearch = document.getElementById("pageSearch");
const searchFeedback = document.getElementById("searchFeedback");
const fontIncrease = document.getElementById("fontIncrease");
const fontDecrease = document.getElementById("fontDecrease");

const typingPhrases = [
  "Web Developer",
  "Problem Solver",
  "Creative Engineer",
  "App Builder",
];
let typingIndex = 0;
let charIndex = 0;
let typingForward = true;

function setBodyScrollLock(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
}

function closeNav() {
  if (!navMenu || !navOverlay) return;
  navMenu.classList.remove("show");
  navOverlay.classList.remove("show");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
  setBodyScrollLock(false);
}


function openNav() {
  if (!navMenu || !navOverlay) return;
  navMenu.classList.add("show");
  navOverlay.classList.add("show");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "true");
  }
  setBodyScrollLock(true);
}

function toggleNav() {
  if (!navMenu) return;
  if (navMenu.classList.contains("show")) {
    closeNav();
  } else {
    openNav();
  }
}

function activateNavLink(link, event) {
  const href = link.getAttribute("href");

  navLinks.forEach((item) => item.classList.remove("active"));
  link.classList.add("active");

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  closeNav();

  if (!href || href.startsWith("#")) return;

  requestAnimationFrame(() => {
    window.location.assign(href);
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("loaded");
      loader.style.display = "none";
    }
  }, 800);
  revealOnScroll();
  setActivePageLink();
  updateThemeFromStorage();
  const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize.endsWith("px")
      ? savedFontSize
      : `${savedFontSize}px`;
  }
});

if (navToggle) {
  navToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleNav();
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    activateNavLink(link, event);
  });

  link.addEventListener(
    "touchend",
    (event) => {
      activateNavLink(link, event);
    },
    { passive: false },
  );
});

if (navClose) {
  navClose.addEventListener("click", closeNav);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeNav);
}

window.addEventListener("click", (event) => {
  if (
    navMenu &&
    navMenu.classList.contains("show") &&
    !navMenu.contains(event.target) &&
    (!navToggle || !navToggle.contains(event.target))
  ) {
    closeNav();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeNav();
  }
});

function setActivePageLink() {
  const page = currentPage === "" ? "index.html" : currentPage;
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle(
      "active",
      href === page || (href === "index.html" && page === "index.html"),
    );
  });
}

window.addEventListener("scroll", () => {
  updateActiveLink();
  toggleScrollTopButton();
  revealOnScroll();
});

function updateActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 4;
  let foundSection = false;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      foundSection = true;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });

  if (!foundSection) {
    setActivePageLink();
  }
}

function toggleScrollTopButton() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 420) {
    scrollTopBtn.style.display = "grid";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateThemeFromStorage() {
  if (!themeToggle) return;
  const savedTheme = localStorage.getItem("theme");
  const useDark =
    savedTheme === "dark" || (savedTheme === null && prefersDark.matches);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    themeToggle.textContent = "☀";
  } else if (savedTheme === "light") {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    themeToggle.textContent = "☾";
  } else if (useDark) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    themeToggle.textContent = "☀";
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    themeToggle.textContent = "☾";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    const activeDark = !isDark;
    localStorage.setItem("theme", activeDark ? "dark" : "light");
    themeToggle.textContent = activeDark ? "☀" : "☾";
  });
}

if (fontIncrease && fontDecrease) {
  const savedFontSize = localStorage.getItem("fontSize") || "16px";
  document.body.style.fontSize = savedFontSize;
}

function typeText() {
  const currentPhrase = typingPhrases[typingIndex];
  if (typingForward) {
    charIndex += 1;
    if (charIndex > currentPhrase.length) {
      typingForward = false;
      setTimeout(typeText, 1000);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }

  typingTextElement.textContent = currentPhrase.slice(0, charIndex);
  setTimeout(typeText, typingForward ? 100 : 50);
}

if (typingTextElement) {
  typeText();
}

if (photoUpload && profilePhoto) {
  photoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePhoto.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

if (projectFilter && projectCards.length > 0) {
  projectFilter.addEventListener("click", (event) => {
    if (!event.target.matches(".filter-btn")) return;

    projectFilter
      .querySelectorAll(".filter-btn")
      .forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");

    const filter = event.target.dataset.filter;
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "grid";
      } else {
        card.style.display = "none";
      }
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formResult.textContent =
        "Please complete all fields before sending your message.";
      formResult.style.color = "#ff8d8d";
      return;
    }

    if (!validateEmail(email)) {
      formResult.textContent = "Please enter a valid email address.";
      formResult.style.color = "#ff8d8d";
      return;
    }

    formResult.textContent =
      "Message sent successfully! Thank you for reaching out.";
    formResult.style.color = "#23d5ab";
    contactForm.reset();
  });
}

if (searchForm && pageSearch) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchPage(pageSearch.value.trim());
  });
}

if (fontIncrease && fontDecrease) {
  fontIncrease.addEventListener("click", () => adjustFontSize(2));
  fontDecrease.addEventListener("click", () => adjustFontSize(-2));
}

function searchPage(query) {
  clearSearchHighlights();
  if (!query) {
    if (searchFeedback) {
      searchFeedback.textContent =
        "Search the page for skills, projects, and contact details.";
    }
    return;
  }

  const regex = new RegExp(escapeRegExp(query), "gi");
  const container = document.querySelector("main");
  const matches = highlightSearchText(container, regex);
  if (matches > 0) {
    if (searchFeedback) {
      searchFeedback.textContent = `${matches} result${matches === 1 ? "" : "s"} found for "${query}".`;
    }
    const firstHighlight = document.querySelector(".search-highlight");
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    if (searchFeedback) {
      searchFeedback.textContent = `No results found for "${query}".`;
    }
  }
}

function highlightSearchText(node, regex) {
  let count = 0;
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const parent = node.parentNode;
    if (
      text.trim().length === 0 ||
      !parent ||
      parent.closest(".search-form") ||
      parent.closest(".chat-body")
    ) {
      return 0;
    }
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) {
      return 0;
    }
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    matches.forEach((match) => {
      const [matchText] = match;
      const index = match.index;
      if (index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, index)),
        );
      }
      const highlight = document.createElement("span");
      highlight.className = "search-highlight";
      highlight.textContent = matchText;
      fragment.appendChild(highlight);
      lastIndex = index + matchText.length;
      count += 1;
    });
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    parent.replaceChild(fragment, node);
    return count;
  }
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    !["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "BUTTON"].includes(
      node.nodeName,
    ) &&
    !node.classList.contains("search-highlight")
  ) {
    Array.from(node.childNodes).forEach((child) => {
      count += highlightSearchText(child, regex);
    });
  }
  return count;
}

function clearSearchHighlights() {
  const highlights = document.querySelectorAll(".search-highlight");
  highlights.forEach((span) => {
    const parent = span.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function adjustFontSize(delta) {
  const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
  const newSize = Math.max(12, Math.min(24, currentSize + delta));
  document.body.style.fontSize = newSize + "px";
  localStorage.setItem("fontSize", newSize);
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".fade-up");
  reveals.forEach((element) => {
    const offset = element.getBoundingClientRect().top;
    if (offset < window.innerHeight - 100) {
      element.classList.add("show");
    }
  });
}

if (chatToggle && chatPanel && chatInput) {
  chatToggle.addEventListener("click", () => {
    chatPanel.style.display = "flex";
    chatInput.focus();
  });
}

if (chatClose && chatPanel) {
  chatClose.addEventListener("click", () => {
    chatPanel.style.display = "none";
  });
}

if (chatSend) {
  chatSend.addEventListener("click", () => handleChatMessage());
}

if (chatInput) {
  chatInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleChatMessage();
    }
  });
}

function handleChatMessage() {
  if (!chatInput || !chatBody) return;
  const text = chatInput.value.trim();
  if (!text) return;
  appendChatMessage(text, "user");
  chatInput.value = "";
  setTimeout(() => {
    appendChatMessage(getChatResponse(text), "bot");
  }, 700);
}

function appendChatMessage(message, sender) {
  if (!chatBody) return;
  const messageEl = document.createElement("div");
  messageEl.className = `chat-message ${sender}`;
  messageEl.textContent = message;
  chatBody.appendChild(messageEl);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getChatResponse(message) {
  const text = message.toLowerCase().trim();
  const normalized = text
    .replace(/[?.!]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");
  const hasAny = (...phrases) =>
    phrases.some((phrase) => normalized.includes(phrase));

  if (hasAny("hello", "hi", "hey")) {
    return "Hi, I can answer questions about Wazmi Ali's portfolio, skills, projects, education, resume, and contact details.";
  }

  if (hasAny("who are you", "full name", "your name")) {
    return "Wazmi Ali is an AI and ML student focused on full-stack development, cloud fundamentals, and practical software projects.";
  }

  if (hasAny("study", "education", "college", "degree", "btech", "diploma")) {
    return "Wazmi Ali is pursuing B.Tech in AI and ML at GL Bajaj Institute of Technology and Management, Greater Noida, and completed a diploma in CSE from Quantum University, Roorkee.";
  }

  if (hasAny("cgpa", "grade", "score")) {
    return "The portfolio mentions a current CGPA of 7.7 and a diploma CGPA of 8.31.";
  }

  if (hasAny("skill", "skills", "tech stack", "technology", "technologies")) {
    return "Main skills include HTML, CSS, JavaScript, Python, Java, React, Flask, MySQL, data handling with Pandas, and AI/ML fundamentals.";
  }

  if (hasAny("frontend", "front end", "ui", "design")) {
    return "Frontend skills include HTML, CSS, JavaScript, responsive design, and UI-focused portfolio work.";
  }

  if (hasAny("backend", "back end", "database", "mysql", "php")) {
    return "Backend experience includes PHP, MySQL, Flask, and building web applications that connect frontend interfaces with data and logic.";
  }

  if (hasAny("ai", "ml", "machine learning", "data")) {
    return "Wazmi Ali is focused on AI and ML learning, with experience in Python, Pandas, and machine-learning-based project work such as the Heart Disease Predictor.";
  }

  if (hasAny("project", "projects", "best project", "featured work")) {
    return "Featured projects include the Heart Disease Predictor, Hospital Management System, and Smart Waste Management Website, covering web development and AI-focused problem solving.";
  }

  if (
    hasAny(
      "heart disease",
      "predictor",
      "prediction system",
      "flask project",
    )
  ) {
    return "The Heart Disease Predictor is a Flask and machine learning project that estimates cardiovascular risk using patient data, preprocessing, and model inference.";
  }

  if (hasAny("certificate", "certificates", "achievement", "achievements")) {
    return "The portfolio highlights 4 Cisco Networking Academy certificates: CCNA Introduction to Networks, Networking Devices and Initial Configuration, Introduction to Cybersecurity, and Python Essentials 1.";
  }

  if (hasAny("experience", "internship", "intern")) {
    return "The portfolio says Wazmi Ali has web development internship experience and has worked on responsive websites with clean code.";
  }

  if (hasAny("resume", "cv", "download resume")) {
    return "You can download the resume from the Download Resume button on the home page.";
  }

  if (hasAny("github", "github profile", "source code")) {
    return "GitHub profile: github.com/wazmiali. It includes project code, practice work, and portfolio-related repositories.";
  }

  if (hasAny("linkedin")) {
    return "LinkedIn is available from the social links in the portfolio header and contact sections.";
  }

  if (hasAny("contact", "email", "phone", "reach", "hire")) {
    return "You can contact Wazmi Ali by email at wazmiali9058@gmail.com, by phone at +91 9058652406, or through GitHub and LinkedIn.";
  }

  if (hasAny("location", "where are you from", "where do you live")) {
    return "The portfolio lists Greater Noida, Uttar Pradesh, India as the location.";
  }

  if (hasAny("goal", "future plan", "career goal")) {
    return "The long-term goal is to become a strong software engineer and work on real-world software and AI projects.";
  }

  if (hasAny("strength", "strengths")) {
    return "Highlighted strengths include quick learning, problem solving, clean code, and consistent project-based improvement.";
  }

  if (hasAny("hobby", "hobbies", "motivate", "motivation")) {
    return "Wazmi Ali enjoys coding, learning new technologies, and improving through hands-on projects.";
  }

  if (hasAny("team", "teamwork", "freelance", "job", "opportunity")) {
    return "The portfolio presents Wazmi Ali as open to teamwork, internships, freelance work, and real-world project opportunities.";
  }

  return "I can help with resume, education, skills, projects, certificates, contact details, GitHub, and career goals. Try asking about skills, projects, education, or contact.";
}

window.addEventListener("click", (event) => {
  if (
    chatPanel &&
    chatToggle &&
    !chatPanel.contains(event.target) &&
    !chatToggle.contains(event.target)
  ) {
    chatPanel.style.display = "none";
  }
});

document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const moreDiv = btn.parentElement.nextElementSibling;
    if (moreDiv.style.display === "none" || moreDiv.style.display === "") {
      moreDiv.style.display = "block";
      btn.textContent = "Read Less";
    } else {
      moreDiv.style.display = "none";
      btn.textContent = "Read More";
    }
  });
});

// Modal functionality for achievements page
if (window.location.href.includes("achievements.html")) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const certImages = [
    "Image/Certificates/CCNA.jpg",
    "Image/Certificates/network.jpg",
    "Image/Certificates/cyber.jpg",
    "Image/Certificates/python.jpg",
  ];

  let currentIndex = 0;

  if (modal && modalImg && closeModal && prevBtn && nextBtn) {
    document.querySelectorAll(".achievement-thumb").forEach((thumb, index) => {
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", () => {
        currentIndex = index;
        modalImg.src = certImages[currentIndex];
        modal.style.display = "flex";
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + certImages.length) % certImages.length;
      modalImg.src = certImages[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % certImages.length;
      modalImg.src = certImages[currentIndex];
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex") {
        if (e.key === "Escape") {
          modal.style.display = "none";
        } else if (e.key === "ArrowLeft") {
          prevBtn.click();
        } else if (e.key === "ArrowRight") {
          nextBtn.click();
        }
      }
    });
  }
}
