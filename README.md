# PC Builder AI – Build Compatible PCs with Real Components from Tecnomega

This is a portfolio project that allows users to create **custom PC builds** using real components obtained via **manual scraping** from [Tecnomegastore.ec](https://tecnomegastore.ec). It uses **artificial intelligence** to verify the **compatibility** between selected parts, helping users avoid common mistakes like socket mismatches or insufficient power supply.

> 🗒️ Note: The app's interface is in **Spanish**, since it's tailored for a local audience in Ecuador. However, the codebase and this documentation are in English to align with international development standards.

---

## 🚀 Features

- **Real component catalog**, scraped from Tecnomega (local hardware store).
- **AI-powered compatibility check** (e.g., CPU and motherboard socket match, PSU wattage, etc.).
- **Build suggestions** based on user goals (gaming, rendering, office, etc.).
- Save and manage builds.
---

## 🧩 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** – utility-first styling
- **MongoDB** – database for components and builds
- **Puppeteer + Axios** – manual scraping workflow
- **OpenAI API** – AI validation for component compatibility
- **Clerk** – authentication and user management
- **Zustand** – global state management
- **GSAP (GreenSock Animation Platform)** – UI animations

---

## ⚠️ About the Scraper

> To avoid sending excessive requests to Tecnomega's servers, the **scraping is performed manually**, outside the deployed application. The scraped data is cleaned and uploaded to the MongoDB database via scripts.

---

## 🧠 How AI Validation Works

The app uses AI to generate fully compatible PC builds by analyzing the available components, the user's intended use (e.g., gaming, office work), budget, and storage requirements.

This is done through a prompt-based system using OpenAI's API. The AI receives:

- A structured list of available components previously filtered (CPU, GPU, motherboard, RAM, storage, PSU, cooler).
- Constraints such as budget, minimum storage, and whether a dedicated GPU is required.
- Logical compatibility rules (e.g., CPU socket must match the motherboard, PSU wattage must be sufficient).
- Optimization goals like maximizing performance without exceeding the budget.

Based on this, the AI responds with a complete JSON object representing a compatible build. The output is validated against a predefined schema to ensure format integrity and reliability before being displayed to the user.
