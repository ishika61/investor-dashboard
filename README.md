
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
👉https://profound-duckanoo-b387bd.netlify.app/landing
> ⚠️ Note: Deployed on Netlify due to temporary Vercel server issue. Fully compatible with Vercel.

---
## 📸 Screenshots
## 🏠 Landing Page 
<img width="1920" height="4692" alt="screencapture-profound-duckanoo-b387bd-netlify-app-landing-2026-04-01-13_02_17" src="https://github.com/user-attachments/assets/bdaf33c6-d848-41a4-935b-0d813c03fbbd" />

---
## 📊 Investor Dashboard 
<img width="1920" height="1692" alt="screencapture-profound-duckanoo-b387bd-netlify-app-dashboard-2026-04-01-13_03_20" src="https://github.com/user-attachments/assets/caeb155d-9cb6-4f31-86d8-51fa61861593" />

---

## 🏢 Corporate Dashboard

<img width="1920" height="2419" alt="screencapture-profound-duckanoo-b387bd-netlify-app-corporate-2026-04-01-13_06_07" src="https://github.com/user-attachments/assets/e056c07a-f3e1-4194-b249-ba4ae3e18129" />

---

## 🔍 Deal Explorer

<img width="1920" height="1594" alt="screencapture-profound-duckanoo-b387bd-netlify-app-deals-2026-04-01-13_07_03" src="https://github.com/user-attachments/assets/1f6a6940-7fb9-4299-b0f3-57aaa56fd483" />

---

## 🎯 Filtered Deals (Search + Filters)
<img width="1920" height="1903" alt="screencapture-profound-duckanoo-b387bd-netlify-app-deals2-2026-04-01-13_09_05" src="https://github.com/user-attachments/assets/77a61da4-d437-4659-9826-37c7d5dafddc" />

---

## 📄 Deal Details Page
<img width="1920" height="1935" alt="screencapture-profound-duckanoo-b387bd-netlify-app-deals-1-2026-04-01-13_12_39" src="https://github.com/user-attachments/assets/08b7c8ee-5157-4ace-9569-d7fd47bf7275" />


---

## 💼 My Investments 
<img width="1920" height="1303" alt="screencapture-profound-duckanoo-b387bd-netlify-app-investments-2026-04-01-13_05_26" src="https://github.com/user-attachments/assets/2d238c80-abec-413c-bfcc-7ffb07da6b9b" />

---


## 📱 Responsive View (Mobile)
<img width="772" height="442" alt="Screenshot 2026-04-01 132154" src="https://github.com/user-attachments/assets/035d3224-ff0e-4ffa-9a64-805f0edec72e" />


---
## 🎥 Demo Video

https://drive.google.com/file/d/1Mkh6ioO0hgvJp-pWAigZOQXeWvlgCIgb/view?usp=drivesdk



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
