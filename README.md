# 🚀 Investor & Corporate Dashboard (Next.js Assignment)

A highly interactive and data-rich **fintech dashboard** built using **Next.js (App Router)**, designed to simulate real-world investor and corporate analytics **without using any backend APIs**.

This project demonstrates **frontend architecture, data simulation, advanced UI/UX, performance optimization, and scalable design** as required in the assignment.

---

# 🎯 Objective

To build a fully functional investor and corporate dashboard that:

* Simulates backend behavior using frontend logic
* Handles large datasets efficiently
* Demonstrates clean architecture and scalable design
* Provides modern fintech UI/UX experience

---

# 📊 Core Requirements Implementation

## 1. ✅ Data Layer

* Mock datasets created:

  * **60+ deals**
  * **10+ investors**
* Stored in:

```bash
/data/deals.json
/data/investors.json
```

---

## 2. ✅ Service Layer (API Simulation)

Service files:

```bash
/services/dealService.js
/services/investorService.js
```

Features:

* Promise-based API simulation
* Artificial delay (**300–800ms**) using `setTimeout`
* Filtering (industry, risk, ROI)
* Sorting (ROI, investment)
* Pagination support
* Random error simulation

---

## 3. ✅ Architecture (Separation of Concerns)

```bash
/components   → Reusable UI components
/services     → API simulation logic
/hooks        → Custom hooks (debounce)
/utils        → Helper logic (recommendation, storage)
/store        → Redux Toolkit state management
/data         → Mock datasets
/app          → Pages (Next.js App Router)
```

✔ No business logic inside UI components

---

## 4. 📈 Investor Dashboard

* Summary Cards:

  * Total Investments
  * Active Deals
  * ROI Overview
  * Risk Distribution

* Charts:

  * Investment growth (Line chart)
  * Industry distribution (Pie chart)
  * Risk vs ROI (Scatter chart)

---

## 5. 🔍 Deal Explorer

* Debounced search (custom hook)
* Multi-filter:

  * Industry
  * Risk
  * ROI range
* Sorting:

  * ROI
  * Investment size
* Pagination (optimized for large datasets)

---

## 6. 📄 Deal Details Page

* Company information
* Financial metrics
* ROI projections (charts)
* Risk analysis
* Interactive UI:

  * Tabs
  * Accordions

---

## 7. 🤖 Recommendation Engine

Custom scoring algorithm:

* Industry match
* Risk tolerance
* Budget compatibility
* ROI attractiveness

Features:

* Deals sorted by score
* Optimized using `useMemo`

---

## 8. 💼 My Investments

* Save user-selected deals
* Data persistence using `localStorage`

---

## 9. 🏢 Corporate Dashboard

* Analytics:

  * Total funding raised
  * Investor growth
  * Conversion rate
* Visual trend charts

---

## 10. 📊 Data Visualization

* Library used: **Recharts**
* Charts included:

  * Line chart
  * Bar chart
  * Pie chart
  * Scatter chart
* Smooth animations and tooltips

---

## 11. 🧠 State Management

* Implemented using **Redux Toolkit**
* Handles:

  * Loading states
  * Error states
  * Data caching
  * Async data fetching (`createAsyncThunk`)

---

## 12. ⚡ Performance Optimization

* Debounced search (custom hook)
* Memoization:

  * `useMemo`
  * `useCallback`
* Pagination for large datasets
* Simulated async API behavior
* Clean re-render control

---

## 13. 🎨 UI/UX Design

* Modern fintech dashboard design
* Clean layout with proper spacing
* Consistent typography and color system
* Dark theme
* Micro-interactions and animations (Framer Motion)
* Glassmorphism + gradient aesthetics

---

# ⚙️ Tech Stack

* **Next.js (App Router)**
* **Redux Toolkit**
* **Tailwind CSS**
* **Recharts**
* **Framer Motion**

---

# 🔄 Data Flow Design

```bash
UI Components
   ↓
Redux Store (State Management)
   ↓
Service Layer (API Simulation)
   ↓
JSON Data (Mock Database)
   ↓
Redux Store
   ↓
UI Update
```

---

# 📁 Folder Structure

```bash
/app
/components
/services
/hooks
/utils
/store
/data
```

---

# 🌐 Deployment

Live Demo: *(Add your Vercel link here)*

---

# 📸 Screenshots

(Add screenshots of all major pages here)

---

# 🛠 Installation

```bash
git clone https://github.com/ishika61/investor-dashboard.git
cd investor-dashboard
npm install
npm run dev
```

---

# 📦 Submission Checklist

* ✅ GitHub Repository
* ✅ README (Architecture + Data Flow + Optimization)
* ⏳ Vercel Deployment
* ⏳ Screenshots / Screen Recording

---

# 👩‍💻 Author

**Ishika Savita**

---

# 🏁 Conclusion

This project successfully fulfills all assignment requirements by combining:

* Strong frontend architecture
* Realistic data simulation
* High-performance UI
* Scalable and maintainable code design
