
# 🚀 Investor & Corporate Dashboard (Next.js Assignment)

## 📌 Overview
A highly interactive and data-rich **fintech dashboard** built using **Next.js (App Router)** that simulates real-world investor and corporate analytics without any backend APIs.
This project demonstrates **frontend architecture, data simulation, advanced UI/UX, and performance optimization** aligned with real industry standards.

---
## 🎯 Key Features
### 🧠 Data Simulation Layer

* 50–100 mock deals
* 10–20 investors
* Stored locally (JSON / JS files)
* Fully frontend-driven data system

---
### ⚙️ Service Layer (API Simulation)
* Custom service files (`dealService`, `investorService`)
* Simulated API calls using Promises
* Artificial delay (300–800ms)
* Supports:
  * Filtering
  * Sorting
  * Pagination
  * Error simulation

---
### 🏗️ Architecture
The project follows a **feature-based scalable architecture**:
```
app/
components/
services/
hooks/
utils/
store/
```

* Separation of concerns (UI vs logic)
* Reusable and modular components
* Clean and maintainable codebase
* No business logic inside UI components

---
### 📊 Investor Dashboard
Includes:
* Summary KPIs:
  * Total Investments
  * Active Deals
  * ROI Overview
  * Risk Distribution

* Data Visualizations:
  * Investment growth (Line chart)
  * Industry distribution (Pie chart)
  * Risk vs ROI analysis

---

### 🔍 Deal Explorer
Advanced features:
* 🔎 Debounced search
* 🎯 Multi-filter:
  * ROI
  * Risk
  * Industry
  * Investment range
* ↕ Sorting
* 📄 Pagination
* Optimized for large datasets

---

### 📄 Deal Details Page
* Company overview
* Financial metrics
* ROI projections (charts)
* Risk analysis
* Interactive UI:

  * Tabs
  * Accordions

---

### 🤖 Recommendation Engine
Frontend-based scoring system:

* Risk match
* Industry match
* Budget compatibility
* ROI attractiveness

➡️ Deals ranked using computed score
➡️ Optimized using memoization

---

### 💼 My Investments
* Track user-selected deals
* Managed using state
* Optional persistence via `localStorage`

---

### 🏢 Corporate Dashboard

Analytics includes:

* Total funding raised
* Investor count
* Conversion metrics
* Trend-based visualizations

---

### 📈 Data Visualization

* Built using chart libraries (Recharts / Chart.js)
* Includes:

  * Line charts
  * Bar charts
  * Pie charts
* Smooth animations & tooltips

---

## 🔄 Data Flow Design
1. Mock data is stored locally
2. Service layer simulates API behavior
3. Components fetch data via services
4. Redux Toolkit manages global state
5. UI updates dynamically based on state changes

---

## ⚡ Optimization Strategies
* ✅ Memoization (`useMemo`, `useCallback`)
* ✅ Debounced search for performance
* ✅ Lazy loading of components
* ✅ Efficient filtering & sorting
* ✅ Reduced unnecessary re-renders
* ✅ Optimized animations (Framer Motion)

---

## 🧠 State Management
* Implemented using **Redux Toolkit**
* Handles:
  * Loading states
  * Error states
  * Data caching
  * UI state management

---

## 🎨 UI/UX Highlights
* Modern fintech dashboard design
* Clean layout & spacing
* Consistent typography & color system
* Smooth micro-interactions
* Fully responsive design
* Dark theme support

---

## 🛠️ Tech Stack
* Next.js (App Router)
* React.js
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* Chart Library (Recharts / Chart.js)

---

## 🌐 Live Demo
👉 https://profound-duckanoo-b387bd.netlify.app

> ⚠️ Note: Deployed on Netlify due to temporary Vercel server issue. Fully compatible with Vercel.

---
## 📸 Screenshots
## 🏠 Landing Page 
<img width="1920" height="4692" alt="screencapture-profound-duckanoo-b387bd-netlify-app-landing-2026-04-01-13_02_17" src="https://github.com/user-attachments/assets/bdaf33c6-d848-41a4-935b-0d813c03fbbd" />

---


## 📊 Investor Dashboard (`/dashboard`)
![Dashboard](./screenshots/dashboard.png)

---

## 🏢 Corporate Dashboard (`/corporate`)
![Corporate](./screenshots/corporate.png)

---

## 🔍 Deal Explorer (`/deals`)
![Deals](./screenshots/deals.png)

---

## 🎯 Filtered Deals (Search + Filters)
![Filtered Deals](./screenshots/deals-filter.png)

---

## 📄 Deal Details Page
![Deal Details](./screenshots/deal-details.png)

---

## 💼 My Investments (`/portfolio`)
![Portfolio](./screenshots/portfolio.png)

---

## 📱 Responsive View (Mobile)
![Responsive](./screenshots/mobile.png)



---

## 🎥 Demo Video

(Add screen recording link here)

---

## 📂 GitHub Repository
👉 https://github.com/ishika61/investor-dashboard

---

## 🏁 Conclusion

This project demonstrates strong capabilities in:

* Frontend architecture design
* Data simulation without backend
* Performance optimization
* Scalable UI development

It reflects real-world fintech dashboard design and development practices.

---
