# Project Tech Stack & Deployment Guide

This document details the technologies, architecture, and API integrations used to build **Ritesh Rajput's Professional Developer Portfolio**, along with steps to deploy it on **Netlify**.

---

## 🛠️ Technology Stack

The portfolio is built as a **high-performance, lightweight, and modern static web application** using vanilla web technologies. This guarantees fast page loads, excellent SEO, and complete control over the custom design language.

### 1. Core Technologies
- **HTML5**: Structured semantic markup optimized for accessibility and SEO.
- **CSS3 (Vanilla)**: 
  - Styled utilizing a custom **CSS custom properties (variables)** system for colors, shadows, and fonts.
  - **Glassmorphism UI** design aesthetic (frosted glass blur, subtle borders, high contrast shadows).
  - Responsive layouts using CSS Flexbox and CSS Grid, catering to desktop, tablet, and mobile screens.
- **JavaScript (ES6+)**: Custom dynamic UI behavior without heavy frameworks or library dependencies.

### 2. External API Integrations (Dynamic Data)
The portfolio pulls live data dynamically at runtime to keep your statistics up to date without manual rebuilding:
- **GitHub API**:
  - Fetches profile info (`public_repos`) and repository listings.
  - Dynamically calculates total repository stars.
  - Features built-in robust **fallback data** in `js/script.js` to ensure the page renders beautifully even if the GitHub API rate limit is exceeded.
- **LeetCode Stats API** (hosted on Render):
  - Fetches real-time statistics from `https://alfa-leetcode-api.onrender.com/userProfile/riteshrajput3924`.
  - Displays dynamic numerical statistics for problems solved.
  - Custom JavaScript updates the SVGs for circular progress indicators and widths of difficulty progress bars (Easy, Medium, Hard).
  - Renders recent accepted submissions dynamically.
- **GitHub Contribution Chart**:
  - Integrates the `ghchart.rshah.org` SVG widget to display active coding grids directly on the page.

### 3. Interactive UI Components (JavaScript-Driven)
- **Interactive Developer Console / Workspace**:
  - Tab switching logic that swaps active viewports between:
    1. `terminal.sh`: Custom hacker-style terminal command prompt (handled in `js/terminal.js`).
    2. `ask_ai.py`: Simulated chatbot assistant answering questions about your resume and skills.
    3. `config.json`: Live-rendered syntax-highlighted configurations detailing your tech profile.
- **Typing Carousel**: Simple text loop typing out "Full Stack Applications", "Cybersecurity Workflows", and "AI Automation Systems" on the hero landing page.
- **Responsive Mobile Navigation**: Click-outside-to-close toggle drawer for small screens.

---

## 🚀 How to Host on Netlify

Netlify is an excellent choice for hosting this portfolio because it serves static assets from global CDNs, provides free SSL certificates, and handles automatic deployments upon pushing code to GitHub.

### Step 1: Prepare the Project
Your project is already configured!
- We have created a `netlify.toml` file at the root of the project.
- This file tells Netlify that the build directory is the root folder (`.`), and sets secure headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, etc.).

### Step 2: Push your Code to GitHub
Ensure all your project files (including the newly created `netlify.toml`) are pushed to your GitHub repository:
```bash
git add netlify.toml
git commit -m "Add Netlify configuration and tech stack documentation"
git push origin main
```

### Step 3: Connect to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select **GitHub** as your Git provider and authorize Netlify.
4. Search and select your portfolio repository.
5. In the Site settings:
   - **Branch to deploy**: `main` (or your default branch)
   - **Base directory**: Leave blank (it defaults to root)
   - **Build command**: Leave blank (there is no build command required for static HTML/CSS/JS)
   - **Publish directory**: `.` (Netlify will auto-detect this from our `netlify.toml`)
6. Click **Deploy [Site Name]**.

### Step 4: Configure Domain and SSL (Optional)
- Netlify will assign a random subdomain (e.g. `https://your-site-name.netlify.app`).
- You can change the site name in **Site settings** -> **Domain management**.
- If you have a custom domain (e.g., `riteshrajput.com`), add it under **Add custom domain** and point your DNS records. Netlify will issue a free SSL certificate automatically via Let's Encrypt.
