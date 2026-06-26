# Portfolio Website - Implementation Guide

## 🎯 QUICK START (Choose Your Path)

### Option 1: **No-Code/Low-Code (Fastest - 2-3 days)**
Use Webflow, Framer, or Wix

```
Tools: Webflow / Framer / Wix
Time: 2-3 days
Cost: $30-50/month
Skills: No coding needed
Pros: Drag-and-drop, automatic hosting, built-in SEO
Cons: Limited customization, monthly cost
```

**Steps:**
1. Sign up on Webflow/Framer
2. Choose "Developer Portfolio" template
3. Customize with your content from the prompt
4. Add integrations for GitHub/LeetCode (manual updates)
5. Deploy to custom domain
6. Add Google Analytics

---

### Option 2: **React/Next.js (Recommended - 5-7 days)**
Full control, modern stack, impressive to recruiters

```
Tools: Next.js + React + Tailwind CSS
Hosting: Vercel (free tier available)
Time: 5-7 days
Cost: $0-10/month for custom domain
Skills: JavaScript/React knowledge
Pros: Fast, customizable, SEO-friendly, impressive tech stack
Cons: Requires coding knowledge
```

**Tech Stack:**
```
Frontend: Next.js 14 + React 18 + TypeScript
Styling: Tailwind CSS + Framer Motion (animations)
Database: Supabase (form submissions) or Firebase
APIs: GitHub API, LeetCode API
Deployment: Vercel (1-click deployment)
Email: Resend or SendGrid
Analytics: Vercel Analytics
```

**Steps:**
1. Clone Next.js portfolio template from GitHub
2. Replace content with your data
3. Connect GitHub API for real-time stats
4. Set up LeetCode integration
5. Deploy to Vercel
6. Connect custom domain

---

### Option 3: **Hybrid (Webflow + Code - 3-4 days)**
Best balance

```
Use Webflow for design, add custom code for integrations
Time: 3-4 days
Cost: $30-50/month
Pros: Designer-friendly UI + custom functionality
```

---

## 🚀 STEP-BY-STEP IMPLEMENTATION (React/Next.js Path)

### Phase 1: Setup (Day 1)

#### Step 1.1: Create Next.js Project
```bash
npx create-next-app@latest portfolio --typescript --tailwind
cd portfolio
```

#### Step 1.2: Install Dependencies
```bash
npm install framer-motion axios react-icons zustand next-seo
```

#### Step 1.3: Project Structure
```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Projects.tsx
│   ├── GitHub.tsx
│   ├── LeetCode.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Awards.tsx
│   ├── Contact.tsx
│   └── Navigation.tsx
├── lib/
│   ├── github.ts (GitHub API calls)
│   ├── leetcode.ts (LeetCode data fetching)
│   └── constants.ts (All your content)
├── public/
│   ├── images/
│   └── resume.pdf
└── tailwind.config.ts
```

---

### Phase 2: Component Development (Days 2-4)

#### Step 2.1: Constants File (lib/constants.ts)
```typescript
export const PERSONAL_DATA = {
  name: "Ritesh Rajput",
  email: "rishirajput3924@gmail.com",
  phone: "+91 8767887417",
  headline: "Full Stack Developer × Cybersecurity Engineer × AI Automation Specialist",
  subheading: "Building secure, intelligent systems | 5K+ API requests/month @ 99.9% uptime",
  location: "Pune, India",
  social: {
    github: "https://github.com/riteshrajput3",
    linkedin: "https://linkedin.com/in/ritesh-rajput39",
    leetcode: "https://leetcode.com/[your-username]",
  }
};

export const PROJECTS = [
  {
    id: 1,
    title: "Intelligent Business Process Automation Suite",
    tagline: "80% Operational Effort Reduction",
    description: "Architected a modular, event-driven automation platform...",
    metrics: [
      { value: "8+", label: "End-to-End Workflows" },
      { value: "92%+", label: "Routing Accuracy" },
      { value: "65%", label: "Review Time Reduction" }
    ],
    tech: ["n8n", "Python", "OpenAI", "REST APIs", "Telegram Bot"],
    image: "/images/project1.png",
    links: {
      github: "https://github.com/...",
      demo: "https://...",
      caseStudy: "https://..."
    }
  },
  // ... more projects
];

export const EXPERIENCE = [
  {
    company: "STSARC",
    position: "Full Stack Developer Intern",
    duration: "Dec 2025 – Mar 2026",
    location: "Nashik, India",
    highlights: [
      { metric: "15+", description: "Production React Components" },
      { metric: "99.9%", description: "Uptime SLA" },
      { metric: "30%", description: "Deployment Error Reduction" }
    ],
    tech: ["React", "Node.js", "MySQL", "REST APIs", "Docker", "CI/CD"]
  }
];

// ... More data exports
```

#### Step 2.2: GitHub Integration (lib/github.ts)
```typescript
export async function getGitHubStats(username: string) {
  const query = `
    query {
      user(login: "${username}") {
        repositories(first: 10, orderBy: {field: STARS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazers {
              totalCount
            }
            languages(first: 1) {
              nodes {
                name
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  return response.json();
}
```

#### Step 2.3: LeetCode Integration (lib/leetcode.ts)
```typescript
export async function getLeetCodeStats(username: string) {
  // Option 1: GraphQL Query (if available)
  // Option 2: Web Scraping (using cheerio)
  // Option 3: LeetCode Stats API (third-party)
  
  // Simple option - use LeetCode Stats API
  const response = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`
  );
  
  const data = await response.json();
  
  return {
    solved: data.totalSolved,
    easy: data.easySolved,
    medium: data.mediumSolved,
    hard: data.hardSolved,
    rank: data.ranking
  };
}
```

#### Step 2.4: Hero Component (components/Hero.tsx)
```typescript
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Full Stack Developer × Cybersecurity Engineer
          </h1>
          <p className="text-xl text-cyan-300 mb-8">
            Building secure, intelligent systems | 5K+ API requests/month @ 99.9% uptime
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition">
              View Projects
            </button>
            <button className="px-8 py-3 border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 rounded-lg font-semibold transition">
              Download Resume
            </button>
            <button className="px-8 py-3 border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 rounded-lg font-semibold transition">
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

#### Step 2.5: Stats Component (components/Stats.tsx)
```typescript
import { motion } from 'framer-motion';

const stats = [
  { value: "12+", label: "Projects Deployed", icon: "📊" },
  { value: "5,000+", label: "Monthly API Requests at 99.9% Uptime", icon: "🚀" },
  { value: "Top 3", label: "Hackathon Wins (Back-to-Back)", icon: "🏆" },
  { value: "80%", label: "Operational Effort Reduction", icon: "⚡" }
];

export default function Stats() {
  return (
    <section className="py-16 bg-slate-800">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-700 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-cyan-300 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-300">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

### Phase 3: Integration & Polish (Days 5-7)

#### Step 3.1: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# GITHUB_TOKEN=your_github_token
# NEXT_PUBLIC_GITHUB_USER=riteshrajput3
```

#### Step 3.2: Custom Domain
1. Go to vercel.com dashboard
2. Add custom domain (e.g., riteshrajput.com)
3. Update DNS records with your domain provider
4. Wait for SSL certificate (auto-generated)

#### Step 3.3: SEO Setup
Add to `app/layout.tsx`:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ritesh Rajput - Full Stack Developer & Cybersecurity Engineer",
  description: "Full Stack Developer & Cybersecurity Engineer | AI Automation | DevSecOps | 99.9% Uptime APIs | Top 3 Hackathon Winner",
  keywords: "Full Stack Developer, Cybersecurity, AI Automation, DevSecOps, Blockchain",
  openGraph: {
    title: "Ritesh Rajput - Full Stack Developer & Cybersecurity Engineer",
    description: "Building secure, intelligent systems | 99.9% Uptime APIs | Top 3 Hackathon Winner",
    url: "https://riteshrajput.com",
    type: "website"
  }
};
```

#### Step 3.4: Analytics
```bash
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 📋 GITHUB INTEGRATION CHECKLIST

#### Get GitHub Token:
1. Go to github.com/settings/tokens
2. Create new token with these scopes:
   - `public_repo` (read public repos)
   - `user` (read user profile)
3. Copy token to Vercel environment variables

#### GitHub Stats to Display:
- [ ] Total public repositories
- [ ] Total stars earned
- [ ] Contributions (past 12 months)
- [ ] Longest streak
- [ ] Latest repositories with star count
- [ ] Programming languages used

---

## 🎮 LEETCODE INTEGRATION CHECKLIST

#### Easy Methods (No Authentication Needed):
1. **LeetCode Stats API** (Free)
   ```
   https://leetcode-stats-api.herokuapp.com/{username}
   ```
   Gives: Problems solved, ranking, difficulty breakdown

2. **Manual Updates** (Simplest)
   - Update stats in `constants.ts` monthly
   - Show badge with date: "Last updated: June 2026"

#### Display Items:
- [ ] Problems solved count
- [ ] Easy/Medium/Hard breakdown
- [ ] Current rank/percentile
- [ ] Recent problems solved (last 10)
- [ ] Current streak

---

## 🎨 TAILWIND CSS SETUP

#### Colors (Dark Mode Default):
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      slate: {
        900: '#0F172A',
        800: '#1E293B',
        700: '#334155',
      },
      cyan: {
        300: '#06B6D4',
        500: '#06B6D4',
      }
    }
  }
}
```

---

## 📧 CONTACT FORM SETUP

Use **Resend** (easiest) or Supabase:

```typescript
// components/ContactForm.tsx
import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Send to Resend API or backend
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData))
    });
    
    if (response.ok) {
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Send Message</button>
    </form>
  );
}
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Image Optimization
```typescript
import Image from 'next/image';

// Always use Next.js Image component
<Image
  src="/project.png"
  alt="Project"
  width={600}
  height={400}
  priority={false}
  placeholder="blur"
/>
```

### Font Optimization
```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });
```

### Code Splitting
```typescript
import dynamic from 'next/dynamic';

const LeetCode = dynamic(() => import('../components/LeetCode'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
```

---

## 🔒 SECURITY CHECKLIST

- [ ] Hide GitHub token in environment variables
- [ ] No API keys exposed in frontend code
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting on API calls
- [ ] Form validation on frontend & backend
- [ ] CORS properly configured

---

## 📱 TESTING CHECKLIST

- [ ] Desktop (1920px, 1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px, 414px)
- [ ] Dark mode vs Light mode (if applicable)
- [ ] All links working
- [ ] Forms submitting correctly
- [ ] GitHub/LeetCode data loading
- [ ] Page load under 2 seconds
- [ ] Lighthouse score 95+

---

## 📚 USEFUL RESOURCES

### Templates & Boilerplates
- Next.js Portfolio Starter: https://github.com/briancodex/nextjs-portfolio
- Shadcn Portfolio: https://ui.shadcn.com/
- Vercel Examples: https://vercel.com/templates

### Learning
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

### APIs
- GitHub GraphQL: https://docs.github.com/en/graphql
- LeetCode Stats: https://www.npmjs.com/package/leetcode-stats-api

### Hosting
- Vercel: https://vercel.com (Recommended)
- Netlify: https://netlify.com
- GitHub Pages: https://pages.github.com

---

## 🎯 TIMELINE & MILESTONES

```
Week 1:
  Day 1: Setup + Project structure
  Day 2: Hero + Stats components
  Day 3: Projects showcase
  Day 4: GitHub + LeetCode integration
  Day 5: Skills + Experience sections

Week 2:
  Day 1: Awards + Education sections
  Day 2: Contact form + Footer
  Day 3: Styling + Animations
  Day 4: Testing + Optimization
  Day 5: Deploy to Vercel + Custom domain
  Day 6-7: Buffer + Final polish

Total: 7-10 days (depending on your experience)
```

---

**Questions? Start with the portfolio prompt and customize as needed!**
