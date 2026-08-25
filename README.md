# Aditya Singla — Personal Portfolio Website

An industry-standard, high-performance personal engineering portfolio website for **Aditya Singla** (Software Engineer & Data Engineer).

Built with modern vanilla web standards (HTML5, CSS3, ES6 JavaScript) for zero-dependency deployment, sub-second load times, and native compatibility with **GitHub Pages**.

---

## 🚀 Live Demo & Domain
- **GitHub Pages Domain**: [https://aditya-singla.github.io/](https://aditya-singla.github.io/)

---

## 🛠️ Tech Stack & Key Features
- **Design System**: Deep Obsidian, Electric Cyan, Neon Emerald & Glassmorphic interfaces.
- **Interactive Unix CLI Terminal**: Embedded terminal emulator with commands (`about`, `experience`, `skills`, `projects`, `contact`, `pipeline`, `clear`).
- **Interactive System Architecture Visualizer**: Live inspectable data pipeline flow (Raw Ingestion → Dagster Orchestration → ClickHouse Analytical Core → Redis Cache → AI RAG & Dashboards).
- **Dynamic Particle Network**: Real-time canvas rendering representing distributed data mesh nodes.
- **Responsive Experience Timeline**: Complete milestone records with metrics and tech tags.
- **Filterable Skill Matrix**: Instant categorised filtering across Data Engineering, AI/ML, Cloud & Infra, Languages, and Backend.
- **One-Click Quick Actions**: Instant clipboard copy with animated toast notifications.

---

## 📦 How to Deploy to GitHub Pages (`aditya-singla.github.io`)

Follow these step-by-step instructions to deploy your portfolio directly to GitHub Pages:

### Step 1: Commit and Push your Changes

Open your terminal in this repository (`/Users/adityasingla/Documents/Code/Aditya-Singla`) and run:

```bash
git add .
git commit -m "feat: complete industry-standard portfolio website"
git push origin main
```

---

### Step 2: Configure GitHub Pages

#### Option A: If your repository is named `aditya-singla.github.io` (User/Organization Site)
1. Go to your GitHub repository: `https://github.com/imavi-5/Aditya-Singla` (or rename it to `aditya-singla.github.io` in **Settings** → **General** → **Repository name**).
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
4. GitHub Pages will build and deploy your site automatically within ~1 minute!

#### Option B: If deploying under custom domain `aditya-singla.github.io` from `Aditya-Singla` repo
1. Go to **Settings** → **Pages**.
2. Under **Custom domain**, enter: `aditya-singla.github.io`.
3. Click **Save** and check **Enforce HTTPS**.

---

### Step 3: Verify Your Deployment
Once the GitHub Actions workflow finishes:
- Visit **`https://aditya-singla.github.io`**
- All assets (`style.css`, `script.js`, fonts, icons) are linked via relative paths, ensuring 100% flawless rendering on any custom domain or root GitHub Pages URL!

---

## 💻 Local Testing & Preview

To preview the website locally on your computer:

### Using Python built-in server:
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Using Node / npx:
```bash
npx serve .
```

---

## 📬 Contact Details
- **Email**: [adityasingla505@gmail.com](mailto:adityasingla505@gmail.com)
- **Phone**: +91-8146536653
- **Location**: Delhi NCR, India
