"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, TrendingUp, Shield, AlertTriangle, CheckCircle,
  ChevronDown, Bookmark, BookmarkCheck, ExternalLink, BarChart2, Activity, Target, Info,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── MOCK DEAL DATA ───────────────────────────────────────────────
const DEAL = {
  id: 4,
  company: "HealthAI",
  tagline: "AI-powered diagnostics for tier-2 & tier-3 cities",
  industry: "HealthTech",
  stage: "Series A",
  founded: "2021",
  team: 42,
  roi: 35,
  risk: "Medium" as const,
  investment: 75000,
  score: 88,
  description: "HealthAI is building an accessible AI diagnostics platform targeting underserved urban and rural populations. Their proprietary ML models achieve 94% diagnostic accuracy across 200+ conditions.",
  highlights: ["94% diagnostic accuracy", "3.2M patients served", "12 hospital partnerships", "ISO 27001 certified"],
};

const ROI_PROJECTIONS = [
  { year: "Y1", conservative: 12, expected: 22, optimistic: 35 },
  { year: "Y2", conservative: 18, expected: 35, optimistic: 52 },
  { year: "Y3", conservative: 24, expected: 48, optimistic: 75 },
  { year: "Y4", conservative: 30, expected: 62, optimistic: 98 },
  { year: "Y5", conservative: 38, expected: 78, optimistic: 130 },
];

const REVENUE_DATA = [
  { q: "Q1 '22", revenue: 12 }, { q: "Q2 '22", revenue: 18 }, { q: "Q3 '22", revenue: 24 },
  { q: "Q4 '22", revenue: 32 }, { q: "Q1 '23", revenue: 45 }, { q: "Q2 '23", revenue: 58 },
  { q: "Q3 '23", revenue: 74 }, { q: "Q4 '23", revenue: 96 }, { q: "Q1 '24", revenue: 118 },
];

const RISK_FACTORS = [
  { factor: "Market Risk", level: 35, desc: "Growing TAM in HealthTech. Government push for digital health reduces market uncertainty." },
  { factor: "Technical Risk", level: 20, desc: "Proven ML stack with 2 years production history. Core IP protected by 4 patents." },
  { factor: "Regulatory Risk", level: 55, desc: "CDSCO approval pending for 3 new diagnostic modules. Timeline uncertain." },
  { factor: "Competition Risk", level: 45, desc: "2 well-funded competitors in the space. HealthAI differentiates on rural access and pricing." },
  { factor: "Team Risk", level: 15, desc: "Strong founding team with ex-Practo and ex-Google backgrounds. Low attrition." },
];

const TABS = ["Overview", "Financials", "ROI Projections", "Risk Analysis"];

const ACCORD_ITEMS = [
  { title: "Business Model", content: "HealthAI operates a B2B2C SaaS model — selling to hospitals and diagnostic centers who serve patients. Monthly subscription per facility ranges from ₹8K–₹45K depending on modules." },
  { title: "Traction & Milestones", content: "Crossed ₹1.2Cr MRR in Q4 2023. Signed 3 government hospital partnerships in Maharashtra. App rated 4.7/5 on Play Store with 500K+ downloads." },
  { title: "Use of Funds", content: "40% product R&D, 30% sales & marketing expansion into 5 new states, 20% regulatory compliance team, 10% infrastructure scaling." },
  { title: "Exit Strategy", content: "Primary exit: Strategic acquisition by global health networks (Fortis, Apollo, Aster) within 5–7 years. Secondary: IPO track if growth sustains 80%+ YoY." },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs"
      style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)", color: "#fff", fontFamily: "'Sora',sans-serif" }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color ?? "#6366F1" }} className="font-bold">{p.name}: {p.value}%</p>
      ))}
    </div>
  );
}

function Accordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-white/75 hover:text-white transition-colors text-left"
        style={{ background: "rgba(255,255,255,0.025)" }}>
        {title}
        <ChevronDown size={15} className={`text-white/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <p className="px-5 py-4 text-sm text-white/45 leading-relaxed"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DealDetails() {
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);

  const riskColor = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" }[DEAL.risk];

  return (
    <div className="min-h-screen" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        *{box-sizing:border-box}
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-[25%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.14),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 9s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-xl mx-auto">

        {/* BACK + ACTIONS */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft size={15} /> Back to Deals
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setSaved(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: saved ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${saved ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, color: saved ? "#a5b4fc" : "rgba(255,255,255,0.5)" }}>
              {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              {saved ? "Saved" : "Save Deal"}
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}>
              Invest Now <ExternalLink size={13} />
            </button>
          </div>
        </motion.div>

        {/* HERO SECTION */}
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible"
          className="rounded-2xl p-6 md:p-8 mb-5"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo + info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.6),rgba(6,182,212,0.5))", boxShadow: "0 8px 32px rgba(99,102,241,0.3)" }}>
                {DEAL.company[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{DEAL.company}</h1>
                  <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>
                    {DEAL.stage}
                  </span>
                </div>
                <p className="text-sm text-white/45 mb-3">{DEAL.tagline}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white/50"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {DEAL.industry}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                    style={{ background: `${riskColor}14`, color: riskColor, border: `1px solid ${riskColor}2a` }}>
                    {DEAL.risk} Risk
                  </span>
                  <span className="text-[11px] text-white/30">Founded {DEAL.founded} · {DEAL.team} employees</span>
                </div>
              </div>
            </div>

            {/* Score ring */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                style={{ background: "conic-gradient(#6366F1 0deg,#6366F1 316deg,rgba(255,255,255,0.06) 316deg)", boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}>
                <div className="w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center"
                  style={{ background: "#0d1120" }}>
                  <span className="text-xl font-black text-white" style={{ fontFamily: "'DM Mono',monospace" }}>{DEAL.score}</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-wider">Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {DEAL.highlights.map(h => (
              <div key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#86efac" }}>
                <CheckCircle size={11} /> {h}
              </div>
            ))}
          </div>
        </motion.div>

        {/* QUICK METRICS */}
        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible"
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
          {[
            { label: "Min. Invest", val: `₹${(DEAL.investment / 1000).toFixed(0)}K`, color: "#6366F1" },
            { label: "Expected ROI", val: `${DEAL.roi}%`, color: "#22C55E" },
            { label: "Est. Returns", val: `+₹${((DEAL.roi / 100) * DEAL.investment / 1000).toFixed(0)}K`, color: "#06B6D4" },
            { label: "Match Score", val: `${DEAL.score}/100`, color: "#F59E0B" },
            { label: "Risk Level", val: DEAL.risk, color: riskColor },
            { label: "Stage", val: DEAL.stage, color: "#A855F7" },
          ].map(({ label, val, color }) => (
            <div key={label} className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${color}15` }}>
              <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{label}</p>
              <p className="text-sm font-bold" style={{ color, fontFamily: "'DM Mono',monospace" }}>{val}</p>
            </div>
          ))}
        </motion.div>

        {/* TABS */}
        <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible">
          <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  background: activeTab === i ? "rgba(99,102,241,0.2)" : "transparent",
                  color: activeTab === i ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                  border: activeTab === i ? "1px solid rgba(99,102,241,0.35)" : "1px solid transparent",
                }}>
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

              {/* TAB 0: OVERVIEW */}
              {activeTab === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <h3 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2"><Info size={14} className="text-indigo-400" />About</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{DEAL.description}</p>
                    </div>
                    <div className="space-y-2">
                      {ACCORD_ITEMS.map(item => <Accordion key={item.title} {...item} />)}
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 h-fit" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2"><Activity size={14} className="text-cyan-400" />Revenue Growth</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                        <XAxis dataKey="q" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2.5} fill="url(#revGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* TAB 1: FINANCIALS */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Revenue (TTM)", val: "₹1.44Cr", sub: "+134% YoY", color: "#22C55E" },
                    { label: "Burn Rate", val: "₹28L/mo", sub: "18mo runway", color: "#F59E0B" },
                    { label: "Gross Margin", val: "68%", sub: "Industry avg: 55%", color: "#6366F1" },
                    { label: "Valuation", val: "₹42Cr", sub: "Pre-money", color: "#06B6D4" },
                    { label: "CAC", val: "₹1,200", sub: "Per hospital", color: "#A855F7" },
                    { label: "LTV", val: "₹4.8L", sub: "3yr avg. customer", color: "#EF4444" },
                  ].map(({ label, val, sub, color }) => (
                    <div key={label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${color}15` }}>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{label}</p>
                      <p className="text-2xl font-bold mb-1" style={{ color, fontFamily: "'DM Mono',monospace" }}>{val}</p>
                      <p className="text-[11px] text-white/35">{sub}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ROI PROJECTIONS */}
              {activeTab === 2 && (
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-4 mb-5">
                    <h3 className="text-sm font-bold text-white/80 flex items-center gap-2">
                      <BarChart2 size={14} className="text-indigo-400" />5-Year ROI Projections
                    </h3>
                    <div className="flex gap-4 text-[10px]">
                      {[["Conservative", "#F59E0B"], ["Expected", "#6366F1"], ["Optimistic", "#22C55E"]].map(([l, c]) => (
                        <div key={l} className="flex items-center gap-1.5">
                          <div className="w-3 h-0.5 rounded" style={{ background: c as string }} />
                          <span className="text-white/40">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={ROI_PROJECTIONS} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                      <Bar dataKey="conservative" fill="#F59E0B" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Conservative" />
                      <Bar dataKey="expected" fill="#6366F1" fillOpacity={0.85} radius={[4, 4, 0, 0]} name="Expected" />
                      <Bar dataKey="optimistic" fill="#22C55E" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Optimistic" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* TAB 3: RISK ANALYSIS */}
              {activeTab === 3 && (
                <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 className="text-sm font-bold text-white/80 flex items-center gap-2 mb-5">
                    <Shield size={14} className="text-amber-400" />Risk Factor Breakdown
                  </h3>
                  {RISK_FACTORS.map(({ factor, level, desc }) => {
                    const rColor = level < 30 ? "#22C55E" : level < 55 ? "#F59E0B" : "#EF4444";
                    return (
                      <div key={factor}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-white/75">{factor}</span>
                          <span className="text-xs font-bold" style={{ color: rColor, fontFamily: "'DM Mono',monospace" }}>{level}/100</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <motion.div className="h-full rounded-full"
                            initial={{ width: 0 }} animate={{ width: `${level}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{ background: `linear-gradient(90deg,${rColor},${rColor}bb)`, boxShadow: `0 0 8px ${rColor}60` }} />
                        </div>
                        <p className="text-[11px] text-white/35 leading-relaxed">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}