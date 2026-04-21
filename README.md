# Parth Rainchwar — Portfolio

> **Software Engineer & Research Enthusiast**
> 
> I build systems and study people. The work sits where backend engineering meets behavioral research, usually around data and decision-making.

---

## About

I work on systems that run under real constraints: **scale, ambiguity, and time**. Most of my engineering has been in financial services where the cost of getting it wrong is visible.

My experience spans **backend engineering and product consulting**, building and maintaining things in production for global institutions and private banks.

On the research side I study **behavioral patterns** — how people decide, consume, and respond to systems. That work led to published papers and shapes how I build.

**📧 Email:** parthrainchwar@gmail.com  
**💼 LinkedIn:** https://linkedin.com/in/parth-rainchwar  
**💻 GitHub:** https://github.com/rainchwarparth

---

## Work Experience

### Synpulse (4 yrs 1 mo total)

#### **Senior Analyst** *(Dec 2024 — Present | Remote)*
- Backend and infrastructure engineer across **3 projects** simultaneously — transaction systems, client-facing platforms, and core banking services for global banks and private wealth clients
- Built system frameworks for **wealth management products** that required both technical delivery and understanding of how the client actually uses the system
- Working across multiple interface levels in the same engagement — architecture, implementation, and client-side consulting

**Tech Stack:** Microservices, Avaloq, Java, Spring Boot, Wealth Management, Financial Systems, Angular, PostgreSQL, Python, Core Banking, API Design

---

#### **Analyst** *(Sep 2023 — Dec 2024 | Remote)*
- Institutional client consulting for a global bank — **ICM systems design** and front-office automated system implementation
- Moved to a Southeast Asian core banking project as a **backend and infrastructure engineer**, working on migration and stabilization of systems that run live transactions
- Remote engagement across time zones, managing parallel client communication and technical delivery

**Tech Stack:** Java, Microservices, Spring Boot, Angular, SQL, Institutional Banking, Core Banking

---

#### **Trainee Analyst** *(Aug 2022 — Aug 2023 | Pune, India)*
- Designed a **mutual fund system** for one of India's leading private banks — awarded **"Pat on the Back"**
- Built data pipeline and UI for the Syninformation platform — recognized as **Star Performer** that quarter
- Selected as 1 of 6 employees across India for Synpulse's internal **data visualization and analytics certification**

**Tech Stack:** Investment Banking, Microservices, Java, Spring Boot, Angular, SQL, System Design

---

## Builder Projects

### 🧠 **TraceAI** *(Apr 2026 — Active)*
A research tool that maps what you know as a **graph rather than a document**. Concepts, hypotheses, evidence, and issues all connect. Every AI response is grounded in what's already in the graph, so it can't drift.

- **Impact:** Ontology graph · Per-node AI threads · Voice input · Undo/redo
- **Tech Stack:** Langchain, OWL, Zustand, Next.js 15, TypeScript
- **Repository:** https://github.com/rainchwarparth/TraceAI-Public

---

### 🗳️ **Sansad — Indian Election Strategy Game** *(Dec 2025 — Active)*
A strategy game built around the **2024 Indian General Election**. Pick a party, manage alliances, place candidates across all 543 Lok Sabha seats, and fight to 272. An AI advisor watches every move and comments on your strategy.

- **Impact:** 543 constituencies · 5,000+ candidates · AI advisor · 7-turn campaign
- **Tech Stack:** React, TypeScript, Game Design, AI Advisor
- **Repository:** https://github.com/rainchwarparth/Sansad-Game

---

### 🏔️ **Trek Recommendation System** *(Apr 2022 — Complete)*
Recommendation system for trekking destinations in India — put in a trek you know, get 10 similar ones back. Built for a client in 2022, open-sourced in 2024 after the NDA expired.

- **Impact:** 208+ treks · 10 recommendations · <1s response · REST API
- **Tech Stack:** Flask, scikit-learn, Python, Bootstrap
- **Repository:** https://github.com/rainchwarparth/Treck-Recommendation-System-2022

---

## Research Case Studies

### 📊 **Internet of Behavior — Consumer Data Analysis**
How do people make decisions online? Built and analyzed a **30-question consumer behavior survey** capturing platform usage, purchase frequencies, and brand interaction patterns. The data spans **psychology, commerce, and technology**.

- **Key Insight:** Adult males show 31.07% uninfluenced direct purchase intent (brand-loyalty driven), while adult females show 30.20% platform-influenced behavior
- **Outcome:** Published research paper + actionable e-commerce intelligence

### 🎨 **E-Commerce Intelligence from Behavioral Research**
Derived from the same consumer behavior dataset but applied to commercial use. Segments high-value customer categories by demographic and purchase behavior.

- **Actionable Segments:** Targeted ad campaigns, performance ads, discovery-based targeting
- **Impact:** Bridged behavioral research with business strategy

### 🎯 **Haar Cascade & Computer Vision**
Research into **face detection and computer vision** using Haar Cascade classifiers. Explores the technical foundations of visual recognition systems.

### 🇮🇳 **ONDC — Open Network for Digital Commerce**
Analysis of India's **open digital commerce ecosystem**. Understanding how decentralized networks shape buyer-seller interactions and market dynamics.

---

## Technical Stack

**Languages:**  
Python, Java, TypeScript

**Frameworks & Libraries:**  
FastAPI, Spring Boot, Flask, React, Next.js, Angular, LangChain

**Databases & Storage:**  
MongoDB, PostgreSQL, Redis

**DevOps & Cloud:**  
Docker, AWS

**ML & Data Science:**  
scikit-learn, NLP

**APIs & Architecture:**  
REST API, Microservices, System Design

---

## Website Features

### 🎯 **Portfolio Showcase**
- **Interactive Hero Section** with dynamic animations
- **Work Experience Timeline** — track career progression with detailed role descriptions
- **Unified Timeline** — integrated view of work, research, and education
- **Scroll Spy Navigation** — active section highlighting as you scroll

### 📚 **Research & Case Studies**
- **Case Study Pages** with detailed timelines, linked technologies, and research papers
- **Paper Integration** — citations, DOI links, and document attachments
- **Certificate & Credential Display** — professional recognitions and achievements

### 🎨 **Design System**
- **Dark Theme Support** — Tailwind CSS with shadcn/ui components
- **Responsive Layout** — Mobile-first, works across all devices
- **Smooth Animations** — Framer Motion for polished interactions
- **Accessibility** — ARIA labels, semantic HTML, keyboard navigation

### 🔍 **SEO & Performance**
- **Static Export** — Built for Vercel with optimized output
- **Metadata** — Dynamic Open Graph and Twitter Card generation
- **Sitemap** — Comprehensive navigation map for crawlers

---

## Setup & Development

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/rainchwarparth/portfolioParthRainchwar.git
cd portfolioParthRainchwar

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **`http://localhost:3000`**

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
dual-nature-portfolio-next/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page
│   ├── case/[slug]/page.tsx      # Dynamic case study pages
│   ├── project/[slug]/page.tsx   # Dynamic project pages
│   ├── certificates/page.tsx     # Credentials showcase
│   └── sitemap/page.tsx          # Navigation map
├── components/portfolio/          # Reusable components
│   ├── Navbar.tsx                # Navigation with logo
│   ├── InteractiveHero.tsx       # Hero section
│   ├── UnifiedTimeline.tsx       # Career timeline
│   ├── CaseStudyLayout.tsx       # Research case study layout
│   └── ...
├── data/                         # Structured data
│   ├── profile/                  # Personal info, tech stack
│   ├── case-studies/             # Research papers & timelines
│   └── projects/                 # Project details
├── lib/                          # Utilities & helpers
├── public/                       # Static assets & favicon
└── styles/                       # Global CSS & Tailwind config
```

---

## Key Pages

| Page | Description |
|------|-------------|
| `/` | Home — Hero, about, work experience, projects, case studies |
| `/case/[slug]` | Research case studies with papers, timelines, and evidence |
| `/project/[slug]` | Builder projects with descriptions, tech stack, and repos |
| `/certificates` | All credentials, certifications, and professional achievements |
| `/workex` | Detailed work experience with skills per role |
| `/sitemap` | Interactive site navigation |

---

## Technologies Used

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **UI Components:** Radix UI, Lucide Icons
- **Language:** TypeScript
- **Deployment:** Vercel

---

## Release

**Current Version:** `PROD-1.0.0-preBeta`  
**Status:** Pre-Beta Production Release  
**Last Updated:** April 21, 2026

---

## License

This portfolio is open source and available under the MIT License. Feel free to fork, modify, and use for your own projects.

---

## Connect

📧 **Email:** parthrainchwar@gmail.com  
💼 **LinkedIn:** https://linkedin.com/in/parth-rainchwar  
💻 **GitHub:** https://github.com/rainchwarparth  
🌐 **Portfolio:** https://parthrainchwar.vercel.app

---

**Built with ❤️ by Parth Rainchwar**
