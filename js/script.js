// TYPING CAROUSEL ANIMATION
const words = [
  "Embedded Systems",
  "AI Automation Systems",
  "Secure Software Solutions"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function type() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 85;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1600; // hold at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

// THEME TOGGLE LOGIC
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// SCROLL REVEAL & NAV SCROLL ACTIONS
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  
  // Navbar shrink on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // IntersectionObserver for reveal elements
  const revealElements = document.querySelectorAll('.reveal-element');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animations if this contains stats
        const counters = entry.target.querySelectorAll('[data-counter-target]');
        counters.forEach(counter => {
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            const targetVal = parseFloat(counter.getAttribute('data-counter-target'));
            animateCounter(counter, 0, targetVal, 1500);
          }
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// SCROLLSPY (ACTIVE NAVBAR LINK FOCUS)
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-menu a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 100; // offset navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}` || link.getAttribute('href').endsWith(`#${currentSectionId}`)) {
          link.classList.add('active');
        }
      });
    }
  });
}

// VALUE COUNT-UP ANIMATION
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Smooth out-cubic easing
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = start + easeProgress * (end - start);
    
    if (end % 1 === 0) {
      element.textContent = Math.floor(currentVal);
    } else {
      element.textContent = currentVal.toFixed(1) + "%";
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + (end % 1 === 0 ? "" : "%");
    }
  };
  window.requestAnimationFrame(step);
}

// WORKSPACE TAB SWITCHING LOGIC
function initWorkspace() {
  const tabs = document.querySelectorAll('.workspace-tab');
  const panels = document.querySelectorAll('.workspace-panel');
  const titleDisplay = document.getElementById('workspace-title-display');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        }
      });
      
      if (titleDisplay) {
        let filename = 'terminal.sh';
        let userMachine = 'ritesh@embedded-core';
        if (targetTab === 'hardware') {
          filename = 'hardware/';
        } else if (targetTab === 'security') {
          filename = 'security.log';
        } else if (targetTab === 'chat') {
          filename = 'ai_model.py';
        } else if (targetTab === 'firmware') {
          filename = 'firmware.c';
        } else if (targetTab === 'config') {
          filename = 'config.json';
        }
        titleDisplay.textContent = `${userMachine}: ~/workspace/${filename}`;
      }
    });
  });
}

// MOBILE NAV DRAWER MENU
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('#nav-menu a');
  
  if (!toggleBtn || !navMenu) return;
  
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('mobile-active');
    toggleBtn.classList.toggle('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('mobile-active');
      toggleBtn.classList.remove('active');
    }
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
      toggleBtn.classList.remove('active');
    });
  });
}

// DYNAMIC CODING LANGUAGE CHART BUILDER
const languageColors = {
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'C++': '#f34b7d',
  'C': '#555555',
  'Solidity': '#AA6746',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'TypeScript': '#3178c6',
  'Go': '#00ADD8'
};

function buildLanguageChart(repos) {
  const chartBar = document.getElementById('lang-chart-bar');
  const legendContainer = document.getElementById('lang-chart-legend');
  if (!chartBar || !legendContainer) return;

  const counts = {};
  let totalValid = 0;

  repos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalValid++;
    }
  });

  if (totalValid === 0) return;

  // Sort languages by count
  const sortedLangs = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // display top 5 languages

  chartBar.innerHTML = '';
  legendContainer.innerHTML = '';

  sortedLangs.forEach(([lang, count]) => {
    const percentage = Math.round((count / totalValid) * 100);
    const color = languageColors[lang] || '#8e8e8e';

    // Segment bar
    const segment = document.createElement('div');
    segment.className = 'lang-bar-segment';
    segment.style.width = `${percentage}%`;
    segment.style.backgroundColor = color;
    segment.title = `${lang}: ${percentage}%`;
    chartBar.appendChild(segment);

    // Legend
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
      <span class="legend-color" style="background-color: ${color}"></span>
      ${lang} (${percentage}%)
    `;
    legendContainer.appendChild(legendItem);
  });
}

// GITHUB API
const GITHUB_USERNAME = 'riteshrajput3';

const fallbackRepos = [
  {
    name: 'intelligent-automation-suite',
    description: 'Modular event-driven automation platform using n8n and Python for document parsing and workflows.',
    language: 'Python',
    stargazers_count: 5,
    html_url: 'https://github.com/riteshrajput3',
    updated_at: '2026-06-15T12:00:00Z'
  },
  {
    name: 'cybersecurity-alert-triage',
    description: 'AI-driven threat intelligence aggregation and alert priority scoring for SOC automation.',
    language: 'Python',
    stargazers_count: 4,
    html_url: 'https://github.com/riteshrajput3',
    updated_at: '2026-05-22T08:30:00Z'
  },
  {
    name: 'passwordless-mfa',
    description: 'Zero-Trust face recognition multi-factor authentication with AES-256 encrypted local database.',
    language: 'Python',
    stargazers_count: 3,
    html_url: 'https://github.com/riteshrajput3',
    updated_at: '2026-03-10T14:15:00Z'
  },
  {
    name: 'decentralized-student-records',
    description: 'Blockchain ledger records system with Solidity smart contracts and Web3.js gas-optimized structure.',
    language: 'Solidity',
    stargazers_count: 6,
    html_url: 'https://github.com/riteshrajput3',
    updated_at: '2025-12-18T10:45:00Z'
  },
  {
    name: 'portfolio',
    description: 'Interactive portfolio website showcasing Full Stack & Cybersecurity skills and project details.',
    language: 'JavaScript',
    stargazers_count: 2,
    html_url: 'https://github.com/riteshrajput3',
    updated_at: '2026-06-23T00:00:00Z'
  }
];

function renderRepos(repos) {
  const container = document.getElementById('github-repos-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  repos.slice(0, 5).forEach(repo => {
    const date = new Date(repo.updated_at).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
    
    const repoElement = document.createElement('div');
    repoElement.className = 'github-repo-item';
    repoElement.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="github-repo-name">${repo.name}</a>
      <p class="github-repo-desc">${repo.description || 'No description available.'}</p>
      <div class="github-repo-meta">
        <span>🔹 ${repo.language || 'Code'}</span>
        <span>⭐ ${repo.stargazers_count}</span>
        <span>Updated ${date}</span>
      </div>
    `;
    container.appendChild(repoElement);
  });
}

async function fetchGitHubData() {
  try {
    const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (profileRes.ok) {
      const data = await profileRes.json();
      const reposElement = document.getElementById('github-repos');
      const followersElement = document.getElementById('github-followers');
      
      // Store numbers in data attributes so they can trigger counting reveal animations
      if (reposElement) {
        reposElement.setAttribute('data-counter-target', data.public_repos || 24);
        reposElement.textContent = data.public_repos || 24;
      }
      if (followersElement) {
        followersElement.setAttribute('data-counter-target', data.followers || 0);
        followersElement.textContent = data.followers || 0;
      }
    }
    
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (repos && repos.length > 0) {
        renderRepos(repos);
        buildLanguageChart(repos);
        
        const stars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
          starsElement.setAttribute('data-counter-target', stars || 8);
          starsElement.textContent = stars || 8;
        }
      } else {
        renderRepos(fallbackRepos);
        buildLanguageChart(fallbackRepos);
      }
    } else {
      renderRepos(fallbackRepos);
      buildLanguageChart(fallbackRepos);
    }
  } catch (error) {
    console.error('GitHub API error, using fallback:', error);
    renderRepos(fallbackRepos);
    buildLanguageChart(fallbackRepos);
  }
}

// LEETCODE STATS
async function fetchLeetCodeData() {
  const username = 'riteshrajput3924';
  const url = `https://alfa-leetcode-api.onrender.com/userProfile/${username}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch LeetCode data');
    const data = await response.json();
    
    const easySolved = data.easySolved || 0;
    const mediumSolved = data.mediumSolved || 0;
    const hardSolved = data.hardSolved || 0;
    const totalSolved = data.totalSolved || 0;
    
    const totalEasy = data.totalEasy || 951;
    const totalMedium = data.totalMedium || 2074;
    const totalHard = data.totalHard || 947;
    
    const solvedEl = document.getElementById('leetcode-solved');
    const easyEl = document.getElementById('leetcode-easy');
    const mediumEl = document.getElementById('leetcode-medium');
    const hardEl = document.getElementById('leetcode-hard');
    
    if (solvedEl) {
      solvedEl.setAttribute('data-counter-target', totalSolved);
      solvedEl.textContent = totalSolved;
    }
    if (easyEl) easyEl.textContent = `${easySolved} / ${totalEasy}`;
    if (mediumEl) mediumEl.textContent = `${mediumSolved} / ${totalMedium}`;
    if (hardEl) hardEl.textContent = `${hardSolved} / ${totalHard}`;
    
    const easyBar = document.querySelector('.leetcode-bar-fill.easy');
    const mediumBar = document.querySelector('.leetcode-bar-fill.medium');
    const hardBar = document.querySelector('.leetcode-bar-fill.hard');
    
    if (easyBar) easyBar.style.width = `${(easySolved / totalEasy) * 100}%`;
    if (mediumBar) mediumBar.style.width = `${(mediumSolved / totalMedium) * 100}%`;
    if (hardBar) hardBar.style.width = `${(hardSolved / totalHard) * 100}%`;
    
    const circle = document.getElementById('leetcode-progress-circle');
    if (circle) {
      const radius = 40;
      const circumference = 2 * Math.PI * radius; // ~251.2
      const totalGoal = 50; 
      const progress = Math.min(totalSolved / totalGoal, 1);
      circle.style.strokeDashoffset = circumference * (1 - progress);
    }
    
    const problemListContainer = document.querySelector('.leetcode-problems-list');
    if (problemListContainer && data.recentSubmissions) {
      problemListContainer.innerHTML = '';
      
      const uniqueSolved = [];
      const seen = new Set();
      
      data.recentSubmissions.forEach(sub => {
        if (sub.statusDisplay === 'Accepted' && !seen.has(sub.title)) {
          seen.add(sub.title);
          uniqueSolved.push(sub);
        }
      });
      
      if (uniqueSolved.length > 0) {
        uniqueSolved.slice(0, 5).forEach(prob => {
          const probItem = document.createElement('div');
          probItem.className = 'leetcode-prob-item';
          
          const questionUrl = `https://leetcode.com/problems/${prob.titleSlug}`;
          const langLabel = prob.lang ? prob.lang.toUpperCase() : 'CODE';
          
          probItem.innerHTML = `
            <a href="${questionUrl}" target="_blank" class="leetcode-prob-title">${prob.title}</a>
            <span class="leetcode-diff-badge easy">${langLabel}</span>
          `;
          
          problemListContainer.appendChild(probItem);
        });
      } else {
        problemListContainer.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:12.5px;padding:20px;">No recently solved questions found.</div>';
      }
    }
  } catch (error) {
    console.error('LeetCode live fetch error:', error);
    const problemListContainer = document.querySelector('.leetcode-problems-list');
    if (problemListContainer) {
      problemListContainer.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:12.5px;padding:20px;">Could not load live submissions.</div>';
    }
  }
}

// SECURITY LOG LIVE SIMULATION LOOP
function startSecurityLogLoop() {
  const logContainer = document.getElementById('security-log');
  if (!logContainer) return;

  const templates = [
    { status: 'success', msg: 'Secure handshake verified with client device.' },
    { status: 'success', msg: 'TLS 1.3 session established successfully.' },
    { status: 'success', msg: 'User session signature WebAuthn validated.' },
    { status: 'warn', msg: 'Port scan detected from IP 192.168.1.105.' },
    { status: 'success', msg: 'Incoming API request routing: /api/v1/telemetry.' },
    { status: 'success', msg: 'Database connection pool status: OK.' },
    { status: 'warn', msg: 'Rate limiting threshold reached for IP 185.220.101.4.' },
    { status: 'error', msg: 'SPI read checksum error on REG_SENSOR_DATA (0x42).' },
    { status: 'success', msg: 'Recalibrating MPU-6050 accelerometer offset...' },
    { status: 'success', msg: 'Edge inference successful: Drone confidence 98.4%.' },
    { status: 'success', msg: 'LoRa transceiver heartbeat acknowledged.' },
    { status: 'success', msg: 'MQTT message published to topic: sensor/esp32/telemetry.' },
    { status: 'error', msg: 'Failed login attempt at account ritesh@embedded-core.' },
    { status: 'success', msg: 'Corrective Action (CAPA) logs written to storage.' },
    { status: 'success', msg: 'Incoming Quality Control (IQC) specification matches.' }
  ];

  function addLog() {
    const time = new Date().toLocaleTimeString();
    const item = templates[Math.floor(Math.random() * templates.length)];
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-timestamp">[${time}]</span>
      <span class="log-status ${item.status}">${item.status}</span>
      <span class="log-msg">${item.msg}</span>
    `;
    
    logContainer.appendChild(entry);
    
    while (logContainer.childNodes.length > 50) {
      logContainer.removeChild(logContainer.firstChild);
    }
    
    logContainer.scrollTop = logContainer.scrollHeight;
    
    setTimeout(addLog, 1500 + Math.random() * 2500);
  }

  // Seed initial logs on load
  for (let i = 0; i < 8; i++) {
    const time = new Date(Date.now() - (8 - i) * 5000).toLocaleTimeString();
    const item = templates[Math.floor(Math.random() * templates.length)];
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-timestamp">[${time}]</span>
      <span class="log-status ${item.status}">${item.status}</span>
      <span class="log-msg">${item.msg}</span>
    `;
    logContainer.appendChild(entry);
  }
  logContainer.scrollTop = logContainer.scrollHeight;

  setTimeout(addLog, 2000);
}

// INITS
document.addEventListener("DOMContentLoaded", () => {
  type();
  initThemeToggle();
  initScrollEffects();
  initScrollspy();
  initWorkspace();
  initMobileMenu();
  fetchGitHubData();
  fetchLeetCodeData();
  startSecurityLogLoop();
});