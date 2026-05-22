// ===== TYPES =====
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  emoji: string;
  gradient: string;
  liveUrl?: string;
  repoUrl?: string;
}

// ===== DATA =====
const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico full stack con carrito de compras, pagos con Stripe y panel de administración.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "fullstack",
    emoji: "🛒",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
  {
    id: 2,
    title: "AWS Serverless API",
    description: "API REST serverless desplegada en AWS Lambda con API Gateway, DynamoDB y autenticación con Cognito.",
    tags: ["AWS Lambda", "DynamoDB", "TypeScript", "Terraform"],
    category: "cloud",
    emoji: "☁️",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Dashboard interactivo con visualizaciones en tiempo real, filtros avanzados y exportación de reportes.",
    tags: ["TypeScript", "React", "Chart.js", "WebSockets"],
    category: "frontend",
    emoji: "📊",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
  {
    id: 4,
    title: "Task Manager App",
    description: "Aplicación de gestión de tareas con drag & drop, colaboración en tiempo real y notificaciones push.",
    tags: ["Next.js", "Prisma", "Socket.io", "Redis"],
    category: "fullstack",
    emoji: "✅",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
  {
    id: 5,
    title: "CI/CD Pipeline AWS",
    description: "Pipeline de integración y despliegue continuo con CodePipeline, CodeBuild y despliegue en ECS Fargate.",
    tags: ["AWS", "Docker", "GitHub Actions", "ECS"],
    category: "cloud",
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
  {
    id: 6,
    title: "Portfolio UI Kit",
    description: "Librería de componentes UI reutilizables con TypeScript, Storybook y pruebas automatizadas.",
    tags: ["TypeScript", "Storybook", "CSS", "Jest"],
    category: "frontend",
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    liveUrl: "#",
    repoUrl: "https://github.com/ferfloo27",
  },
];

// ===== THEME TOGGLE =====
function initTheme(): void {
  const toggle = document.getElementById("themeToggle") as HTMLButtonElement;
  const icon = toggle.querySelector(".theme-icon") as HTMLSpanElement;
  const saved = localStorage.getItem("theme") ?? "dark";

  document.documentElement.setAttribute("data-theme", saved);
  icon.textContent = saved === "dark" ? "🌙" : "☀️";

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    icon.textContent = next === "dark" ? "🌙" : "☀️";
  });
}

// ===== NAVBAR =====
function initNavbar(): void {
  const navbar = document.getElementById("navbar") as HTMLElement;
  const hamburger = document.getElementById("hamburger") as HTMLButtonElement;
  const navLinks = document.getElementById("navLinks") as HTMLUListElement;
  const links = navLinks.querySelectorAll<HTMLAnchorElement>(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    updateActiveLink();
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

function updateActiveLink(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// ===== TYPEWRITER =====
function initTypewriter(): void {
  const el = document.getElementById("typedRole") as HTMLParagraphElement;
  const roles = ["Full Stack Developer", "Cloud Engineer", "TypeScript Enthusiast", "AWS Architect"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type(): void {
    const current = roles[roleIndex];
    el.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  type();
}

// ===== COUNTER ANIMATION =====
function animateCounters(): void {
  const counters = document.querySelectorAll<HTMLSpanElement>(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target") ?? "0", 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const update = (): void => {
      current = Math.min(current + step, target);
      counter.textContent = Math.floor(current).toString();
      if (current < target) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Animate skill bars
          const fills = entry.target.querySelectorAll<HTMLDivElement>(".skill-fill");
          fills.forEach((fill) => fill.classList.add("animated"));

          // Animate counters once
          if (entry.target.id === "home") animateCounters();
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll<HTMLElement>(".animate-on-scroll, section").forEach((el) => {
    observer.observe(el);
  });

  // Skill bars observer
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll<HTMLDivElement>(".skill-fill");
          fills.forEach((fill) => fill.classList.add("animated"));
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll<HTMLElement>(".skill-card").forEach((card) => {
    skillObserver.observe(card);
  });
}

// ===== PROJECTS =====
function renderProjects(filter: string = "all"): void {
  const grid = document.getElementById("projectsGrid") as HTMLDivElement;
  grid.innerHTML = "";

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  filtered.forEach((project, i) => {
    const card = document.createElement("article");
    card.className = "project-card animate-on-scroll";
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="project-image" style="background: ${project.gradient}">
        <span style="font-size: 4rem; position: relative; z-index: 1;">${project.emoji}</span>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-links">
          ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link primary" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Demo
          </a>` : ""}
          ${project.repoUrl ? `<a href="${project.repoUrl}" class="project-link" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            Código
          </a>` : ""}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-observe new cards
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
  );
  grid.querySelectorAll<HTMLElement>(".animate-on-scroll").forEach((el) => observer.observe(el));
}

function initProjectFilter(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.getAttribute("data-filter") ?? "all");
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm(): void {
  const form = document.getElementById("contactForm") as HTMLFormElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const messageInput = document.getElementById("message") as HTMLTextAreaElement;
  const nameError = document.getElementById("nameError") as HTMLSpanElement;
  const emailError = document.getElementById("emailError") as HTMLSpanElement;
  const messageError = document.getElementById("messageError") as HTMLSpanElement;
  const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
  const btnText = document.getElementById("btnText") as HTMLSpanElement;
  const formSuccess = document.getElementById("formSuccess") as HTMLDivElement;

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors(): void {
    [nameInput, emailInput, messageInput].forEach((el) => el.classList.remove("error"));
    [nameError, emailError, messageError].forEach((el) => (el.textContent = ""));
  }

  function validate(): boolean {
    let valid = true;
    clearErrors();

    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add("error");
      nameError.textContent = "El nombre debe tener al menos 2 caracteres.";
      valid = false;
    }
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add("error");
      emailError.textContent = "Ingresa un email válido.";
      valid = false;
    }
    if (messageInput.value.trim().length < 10) {
      messageInput.classList.add("error");
      messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
      valid = false;
    }
    return valid;
  }

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    btnText.textContent = "Enviando...";

    // Simulate async send
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    form.reset();
    clearErrors();
    submitBtn.disabled = false;
    btnText.textContent = "Enviar mensaje";
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  });
}

// ===== ADD ANIMATE CLASSES =====
function addAnimateClasses(): void {
  const selectors = [
    ".about-grid > *",
    ".skill-category",
    ".contact-grid > *",
    ".section-header",
  ];
  selectors.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
      el.classList.add("animate-on-scroll");
      el.style.transitionDelay = `${i * 0.15}s`;
    });
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initTypewriter();
  addAnimateClasses();
  renderProjects();
  initProjectFilter();
  initScrollAnimations();
  initContactForm();
  animateCounters();
});
