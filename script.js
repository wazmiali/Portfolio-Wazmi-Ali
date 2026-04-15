console.log("Script loaded");

console.log("Script loaded");




const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
console.log("navToggle found:", navToggle);
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

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("loaded");
    loader.style.display = "none";
  }, 800);
  revealOnScroll();
  setActivePageLink();
  updateThemeFromStorage();
  const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize + "px";
  }
});

navToggle.addEventListener("click", (event) => {
  event.preventDefault();
  navMenu.classList.toggle("show");
  navOverlay.classList.toggle("show");
  document.body.style.overflow = navMenu.classList.contains("show")
    ? "hidden"
    : "";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    setTimeout(() => {
      navMenu.classList.remove("show");
      navOverlay.classList.remove("show");
      document.body.style.overflow = "";
    }, 100);
  });
});

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navOverlay.classList.remove("show");
    document.body.style.overflow = "";
  });
}

window.addEventListener("click", (event) => {
  if (
    !navMenu.contains(event.target) &&
    event.target !== navToggle &&
    navMenu.classList.contains("show")
  ) {
    navMenu.classList.remove("show");
    navOverlay.classList.remove("show");
    document.body.style.overflow = "";
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
  if (window.scrollY > 420) {
    scrollTopBtn.style.display = "grid";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateThemeFromStorage() {
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

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  const activeDark = !isDark;
  localStorage.setItem("theme", activeDark ? "dark" : "light");
  themeToggle.textContent = activeDark ? "☀" : "☾";
});

if (fontIncrease && fontDecrease) {
  const savedFontSize = localStorage.getItem("fontSize") || "16px";
  document.body.style.fontSize = savedFontSize;

  fontIncrease.addEventListener("click", () => {
    const currentSize = parseInt(document.body.style.fontSize || "16px");
    const newSize = Math.min(currentSize + 2, 24) + "px";
    document.body.style.fontSize = newSize;
    localStorage.setItem("fontSize", newSize);
  });

  fontDecrease.addEventListener("click", () => {
    const currentSize = parseInt(document.body.style.fontSize || "16px");
    const newSize = Math.max(currentSize - 2, 12) + "px";
    document.body.style.fontSize = newSize;
    localStorage.setItem("fontSize", newSize);
  });
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
    searchFeedback.textContent =
      "Search the page for skills, projects, and contact details.";
    return;
  }

  const regex = new RegExp(escapeRegExp(query), "gi");
  const container = document.querySelector("main");
  const matches = highlightSearchText(container, regex);
  if (matches > 0) {
    searchFeedback.textContent = `${matches} result${matches === 1 ? "" : "s"} found for "${query}".`;
    const firstHighlight = document.querySelector(".search-highlight");
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    searchFeedback.textContent = `No results found for "${query}".`;
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

chatToggle.addEventListener("click", () => {
  chatPanel.style.display = "flex";
  chatInput.focus();
});

chatClose.addEventListener("click", () => {
  chatPanel.style.display = "none";
});

chatSend.addEventListener("click", () => handleChatMessage());
chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleChatMessage();
  }
});

function handleChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendChatMessage(text, "user");
  chatInput.value = "";
  setTimeout(() => {
    appendChatMessage(getChatResponse(text), "bot");
  }, 700);
}

function appendChatMessage(message, sender) {
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

  const qaMap = new Map([
    ["who are you", "I am Wazmi Ali, a software engineering student."],
    ["what do you study", "I study B.Tech in AI & ML."],
    ["what is your goal", "I want to become a skilled software engineer."],
    ["how many years have you studied", "6"],
    ["what languages do you know", "I know Python, C++, Java, and PHP."],
    ["what is your main skill", "Web development and problem solving."],
    ["what is your github", "github.com/wazmiali"],
    ["what do you upload on github", "Projects, code, and practice work."],
    ["what is your best project", "Heart Disease Prediction System."],
    ["what tech did you use there", "Python, Flask, and Machine Learning."],
    ["do you know web design", "Yes, I use HTML, CSS, and JavaScript."],
    ["do you know backend", "Yes, I use PHP and MySQL."],
    ["what tools do you use", "VS Code, Jupyter, and IntelliJ."],
    ["what is cloud computing", "It is storing and running data online."],
    ["do you use aws", "Yes, I use EC2, S3, and IAM."],
    ["what is dsa", "Data Structures and Algorithms."],
    ["why is dsa important", "It helps solve problems faster."],
    ["what is your strength", "Quick learning and hard work."],
    ["what is your weakness", "I try to improve my time management."],
    ["do you work in a team", "Yes, I like team projects."],
    ["what is your experience", "I worked as a web development intern."],
    [
      "do you have certificates",
      "Yes, I have 4 professional certificates: CCNA Introduction to Networks, Networking Devices and Initial Configuration, Introduction to Cybersecurity, and Python Essentials 1, all from Cisco Networking Academy.",
    ],
    [
      "what are your achievements",
      "I have certificates in CCNA Networking, Cybersecurity, and Python from Cisco Networking Academy, plus various project achievements.",
    ],
    [
      "how many certificates do you have",
      "I have 4 certificates from Cisco Networking Academy.",
    ],
    [
      "what did you do in internship",
      "Built responsive websites and clean code.",
    ],
    ["what is responsive design", "It works on mobile and desktop screens."],
    ["what is your hobby", "Coding and learning new tech."],
    ["do you like ai", "Yes, I am learning AI and ML."],
    ["what is your future plan", "Work on real-world software projects."],
    ["what is your database skill", "I use MySQL for data storage."],
    ["what is your ui skill", "I use Bootstrap and Tailwind CSS."],
    ["what is your project style", "Clean, simple, and user-friendly."],
    ["why should we hire you", "I am dedicated and always learning."],
    ["how can we contact you", "Email or GitHub profile."],
    ["what is your full name", "My full name is Wazmi Ali."],
    ["where are you from", "I am from India."],
    ["what is your current cgpa", "My CGPA is 7.7."],
    ["what is your diploma cgpa", "My diploma CGPA is 8.31."],
    ["what is your learning style", "I learn by practice and projects."],
    ["do you like coding daily", "Yes, I practice coding every day."],
    ["what is your favorite language", "I like Python and Java."],
    ["what is python used for", "It is used for web and AI projects."],
    ["what is java used for", "It is used for apps and backend."],
    ["what is c++ used for", "It is used for DSA and logic building."],
    ["what is your frontend skill", "HTML, CSS, JavaScript."],
    ["what is your backend skill", "PHP and MySQL."],
    ["what is your ml skill", "Basic machine learning models."],
    ["what is your data skill", "Data analysis using Pandas."],
    ["what is numpy", "It is used for numerical computing."],
    ["what is pandas", "It is used for data handling."],
    ["what is matplotlib", "It is used for data charts."],
    ["what is seaborn", "It is used for advanced graphs."],
    ["what is your project goal", "Solve real-world problems."],
    ["what is your coding level", "Beginner to intermediate."],
    ["do you know git", "Yes, I use Git for version control."],
    ["what is github", "It is a platform to store code."],
    ["do you write clean code", "Yes, I follow clean coding rules."],
    ["what is debugging", "Finding and fixing errors."],
    ["what is testing", "Checking code for correctness."],
    ["what is your biggest project", "Hospital Management System."],
    ["what is your web project", "Smart Waste Management Website."],
    ["do you use frameworks", "Yes, I use Flask and Bootstrap."],
    ["what is flask", "It is a Python web framework."],
    ["what motivates you", "Learning and building new things."],
    [
      "what kind of developer are you",
      "I am a full-stack and ML beginner developer.",
    ],
    [
      "can you show your projects",
      "Yes, you can explore them in my portfolio.",
    ],
    ["what problem do you solve", "I build solutions using web and data."],
    ["are you good for internships", "Yes, I am open and ready to learn."],
    ["why should i check your github", "It shows my real coding work."],
    ["do you build real projects", "Yes, all my projects solve real problems."],
    ["can you work on live projects", "Yes, I am ready for real-world work."],
    [
      "are you a beginner or expert",
      "I am improving from beginner to intermediate.",
    ],
    ["how fast do you learn new tech", "I learn quickly with practice."],
    ["can you work in a team", "Yes, I enjoy teamwork."],
    ["do you take freelance work", "Yes, I am open to opportunities."],
    ["what makes you different", "I focus on learning and building."],
    ["do you only code or also design", "I do both coding and UI design."],
    ["can you build a full website", "Yes, from frontend to backend."],
    ["what kind of apps can you build", "Web apps and basic ML apps."],
    ["are your projects responsive", "Yes, I try to make them responsive."],
    ["do you fix bugs", "Yes, debugging is part of my work."],
    ["how do you start a project", "I plan, design, then code step by step."],
    ["do you follow best practices", "Yes, I write clean and simple code."],
    ["can you explain your code", "Yes, I can explain it clearly."],
    ["what tools do you use daily", "VS Code, GitHub, and browser tools."],
    ["do you know databases well", "Yes, I work with MySQL."],
    ["can you handle data projects", "Yes, I use Python and Pandas."],
    ["do you know ai basics", "Yes, I am learning ML models."],
    ["what are you learning now", "DSA, AI, and full-stack development."],
    [
      "how do you improve your skills",
      "By coding daily and building projects.",
    ],
    ["are you ready for a job", "Yes, I am preparing actively."],
    ["can i contact you easily", "Yes, via email or GitHub."],
    ["do you update your projects", "Yes, I keep improving them."],
    ["what is your long term goal", "To become a strong software engineer."],
  ]);

  if (qaMap.has(normalized)) {
    return qaMap.get(normalized);
  }

  for (const [question, answer] of qaMap.entries()) {
    if (normalized.includes(question)) {
      return answer;
    }
  }

  if (normalized.includes("github")) {
    return "You can find my work on github.com/wazmiali.";
  }
  if (normalized.includes("contact")) {
    return "You can contact me by email or through my GitHub profile.";
  }
  return "I can help with portfolio details, skills, project highlights, or contact info. Ask anything and I will answer.";
}

window.addEventListener("click", (event) => {
  if (!chatPanel.contains(event.target) && event.target !== chatToggle) {
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
    currentIndex = (currentIndex - 1 + certImages.length) % certImages.length;
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
