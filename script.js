/**
 * ADITYA SINGLA - PORTFOLIO INTERACTIVE ENGINE
 * Features: Dynamic Canvas Node Mesh, Interactive Unix CLI, Architecture Visualizer,
 * Filterable Skills, Copy-to-Clipboard Toasts & Navigation Controller.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasNetwork();
  initTerminal();
  initPipelineVisualizer();
  initSkillFilters();
  initScrollSpy();
  initMobileNav();
  initContactForm();
});

/* ==========================================================================
   1. CANVAS DATA MESH BACKGROUND
   ========================================================================== */
function initCanvasNetwork() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 18000), 70);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(0, 245, 160, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.22;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. INTERACTIVE CLI TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalContainer = document.getElementById('terminal');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span class="token-accent">Available Commands:</span>
  <span class="token-metric">about</span>        - Brief summary & engineering philosophy
  <span class="token-metric">experience</span>   - Work history & enterprise milestones
  <span class="token-metric">skills</span>       - Core technical stack & toolsets
  <span class="token-metric">projects</span>     - Key architecture and high-scale systems
  <span class="token-metric">contact</span>      - Email, phone, LinkedIn & location
  <span class="token-metric">pipeline</span>     - Explain the enterprise ELT + RAG architecture
  <span class="token-metric">clear</span>        - Clear terminal screen
  <span class="token-metric">whoami</span>       - Current session identity
  <span class="token-metric">sudo hire</span>    - Fast-track hiring inquiry
    `,
    about: () => `
<span class="token-accent">Aditya Singla — Software Engineer | Data Engineer</span>
Location: Delhi NCR · Noida · Nairobi (Onsite experience)
Driven by building precise, high-speed solutions bridging backend microservices, large-scale data pipelines, and AI systems (AWS / GCP / ClickHouse / Dagster).
Graduated from Panjab University, Chandigarh (B.E. ECE, CGPA: 8.43/10).
    `,
    experience: () => `
<span class="token-metric">[June 2026 - Present]</span> Software Engineer @ <span class="token-accent">Infinia Technologies | Infinia Technologies India</span>
  • 75% latency reduction (60h → 15h) via multithreaded ELT truncate-and-reload pipeline.
  • AI-powered NLP query interface using vLLMs (Llama.cpp), LangChain, DSPy & RAG for national health analytics.
  • Redis caching layer & Self-service Dagster+ClickHouse SQL pipeline.

<span class="token-metric">[Feb 2026 - May 2026]</span> Graduate Engineer Trainee @ <span class="token-accent">Infinia Technologies | Apeiro Digital</span>
  • 50+ production ELT pipelines (Dagster + ClickHouse), ERP/payer/HIE multi-system reconciliation.
  • Onsite deployment in Nairobi, Kenya with Government of Kenya health analytics stakeholders.

<span class="token-metric">[June 2025 - Jan 2026]</span> Data & Cloud Infra Engineer @ <span class="token-accent">Infinia Technologies | Coredge.io</span>
  • Edge cloud data workflows and infrastructure scaling.

<span class="token-metric">[Apr 2024 - May 2025]</span> Python Developer @ <span class="token-accent">VelTorg</span>
  • 100% automated options trading workflows, Asyncio/WebSockets high-throughput pipelines, RabbitMQ & GCP.
    `,
    skills: () => `
<span class="token-accent">Languages:</span> Python, SQL, C++, Java
<span class="token-accent">Data Engineering:</span> ClickHouse, Dagster, Apache Kafka, BigQuery, PostgreSQL, MySQL, SQLite, DBeaver
<span class="token-accent">Cloud & Infra:</span> GCP, AWS, Redis, RabbitMQ, Linux, Docker
<span class="token-accent">AI / ML:</span> LangChain, DSPy, RAG, vLLMs (Llama.cpp), Time Series Analysis
<span class="token-accent">BI & Visualization:</span> Power BI, Looker Studio, Metabase, Custom Dashboards
<span class="token-accent">Development:</span> FastAPI, REST APIs, Git, WebSockets, Node.js
    `,
    projects: () => `
<span class="token-metric">1. National Health NLP & RAG Analytics Interface</span>
   vLLMs, Llama.cpp, DSPy, LangChain, ClickHouse, FastAPI
   Enables natural-language querying of complex government health datasets.

<span class="token-metric">2. Multithreaded High-Throughput ELT Pipeline</span>
   Dagster, ClickHouse, Python, Redis
   Reduced enterprise ingestion SLA from 60 hrs to 15 hrs (4x throughput).

<span class="token-metric">3. Autonomous Algo-Trading & Market Signal Engine</span>
   Python, Asyncio, WebSockets, RabbitMQ, PostgreSQL, GCP
   Autonomous options order execution and live signal streaming.
    `,
    contact: () => `
<span class="token-accent">Email:</span> <a href="mailto:adityasingla505@gmail.com" class="token-string">adityasingla505@gmail.com</a>
<span class="token-accent">Phone:</span> <a href="tel:+918146536653" class="token-string">+91-8146536653</a>
<span class="token-accent">LinkedIn:</span> <a href="https://linkedin.com" target="_blank" class="token-string">linkedin.com/in/aditya-singla</a>
<span class="token-accent">Location:</span> Delhi NCR, India
    `,
    pipeline: () => `
<span class="token-accent">Pipeline Flow:</span>
[Data Ingestion (ERP/HIE/APIs)] ──> [Dagster Orchestrator] ──> [ClickHouse Analytical Engine] ──> [Redis In-Memory Cache] ──> [LLM RAG Interface + Power BI]
    `,
    whoami: () => `guest_engineer@aditya-singla-portfolio`,
    'sudo hire': () => `<span class="token-metric">Access Granted!</span> Opening email client to contact Aditya directly...`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      const commandKey = rawInput.toLowerCase();

      if (!rawInput) return;

      commandHistory.push(rawInput);
      historyIndex = commandHistory.length;

      // Render User Command
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.innerHTML = `<span class="prompt-user">aditya@cloud-node:~$</span> <span style="color: #fff;">${escapeHtml(rawInput)}</span>`;
      terminalOutput.appendChild(commandLine);

      // Execute
      let responseHtml = '';
      if (commands[commandKey]) {
        responseHtml = commands[commandKey]();
        if (commandKey === 'sudo hire') {
          setTimeout(() => {
            window.location.href = 'mailto:adityasingla505@gmail.com?subject=Opportunity%20Discussion%20with%20Aditya%20Singla';
          }, 800);
        }
      } else if (commandKey.startsWith('echo ')) {
        responseHtml = escapeHtml(rawInput.substring(5));
      } else if (commandKey === 'date') {
        responseHtml = new Date().toUTCString();
      } else {
        responseHtml = `<span style="color: #ff7b72;">Command not found: "${escapeHtml(rawInput)}". Type <span class="token-accent">help</span> for a list of available commands.</span>`;
      }

      if (responseHtml) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.innerHTML = responseHtml;
        terminalOutput.appendChild(responseLine);
      }

      terminalInput.value = '';
      terminalContainer.querySelector('.terminal-body').scrollTop = terminalContainer.querySelector('.terminal-body').scrollHeight;
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Focus terminal when clicking anywhere in the container
  terminalContainer.addEventListener('click', () => {
    terminalInput.focus();
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   3. PIPELINE VISUALIZER INTERACTION
   ========================================================================== */
const pipelineDetails = {
  1: {
    title: 'Multi-Source Raw Ingestion & Truncate-and-Reload Engine',
    tech: 'Python, Asyncio, REST APIs, ERP/HIE/Payer Feeds',
    icon: '⚡',
    desc: 'Ingests multi-system operational data from health exchanges, financial streams, and ERPs. Leverages multithreaded async chunking to slash initial ingestion windows from 60 hrs to 15 hrs.'
  },
  2: {
    title: 'Dagster Orchestration & Self-Service SQL Mesh',
    tech: 'Dagster, Python, Docker, RBAC Security',
    icon: '⚙️',
    desc: 'Automates 50+ production pipelines with dynamic dependency graphs and asset-based scheduling. Enables analysts to deploy new syncs simply by dropping SQL schema definitions into pre-prod.'
  },
  3: {
    title: 'ClickHouse High-Throughput Analytical Core',
    tech: 'ClickHouse, Materialized Views, SQL Tuning',
    icon: '🚀',
    desc: 'Columnar storage with customized materialized views and partitioning that handles millions of records with sub-second aggregate query execution for mission-critical national health dashboards.'
  },
  4: {
    title: 'Redis In-Memory Interception & Query Acceleration',
    tech: 'Redis, FastAPI, Cache Keys & TTL Policies',
    icon: '⚡',
    desc: 'Intercepts repetitive analytical and dashboard queries to reduce database read load by over 60%, maintaining low latency even under intense concurrent government stakeholder traffic.'
  },
  5: {
    title: 'AI RAG Natural Language Query Engine & Dashboards',
    tech: 'vLLMs (Llama.cpp), LangChain, DSPy, Power BI',
    icon: '🧠',
    desc: 'Translates non-technical natural language queries directly into high-speed analytical queries via fine-tuned RAG models, powering seamless visual dashboards and government reporting.'
  }
};

function initPipelineVisualizer() {
  const steps = document.querySelectorAll('.pipeline-step');
  const detailTitle = document.getElementById('pipeline-detail-title');
  const detailTech = document.getElementById('pipeline-detail-tech');
  const detailDesc = document.getElementById('pipeline-detail-desc');
  const detailIcon = document.getElementById('pipeline-detail-icon');

  if (!steps.length || !detailTitle) return;

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      steps.forEach((s) => s.classList.remove('active'));
      step.classList.add('active');

      const stepId = step.getAttribute('data-step');
      const data = pipelineDetails[stepId];
      if (data) {
        detailTitle.textContent = data.title;
        detailTech.textContent = data.tech;
        detailDesc.textContent = data.desc;
        detailIcon.textContent = data.icon;
      }
    });
  });
}

/* ==========================================================================
   4. SKILL FILTERS
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
window.copyToClipboard = function (text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
};

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✔</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================================================
   6. SCROLL SPY & MOBILE NAV
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value || 'Portfolio Contact';
    const message = document.getElementById('form-message').value;

    const mailtoUrl = `mailto:adityasingla505@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} - from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoUrl;
    showToast('Launching your email client...');
  });
}
