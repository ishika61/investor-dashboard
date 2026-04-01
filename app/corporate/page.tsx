"use client";

import { motion } from "framer-motion";
import {
  DollarSign, Users, TrendingUp, Target, ArrowUpRight,
  BarChart2, Activity, Zap, Award, Repeat2, Clock,
  ChevronRight, Globe, ShieldCheck,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar,
} from "recharts";

// ─── ANIMATION ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── DATA ────────────────────────────────────────────────────────
const MONTHLY_FUNDING = [
  { month: "Jan", funding: 420000 }, { month: "Feb", funding: 380000 },
  { month: "Mar", funding: 510000 }, { month: "Apr", funding: 470000 },
  { month: "May", funding: 620000 }, { month: "Jun", funding: 580000 },
  { month: "Jul", funding: 700000 }, { month: "Aug", funding: 650000 },
  { month: "Sep", funding: 780000 }, { month: "Oct", funding: 820000 },
  { month: "Nov", funding: 760000 }, { month: "Dec", funding: 950000 },
];

const CONVERSION_DATA = [
  { q: "Q1", rate: 28 }, { q: "Q2", rate: 31 },
  { q: "Q3", rate: 33 }, { q: "Q4 (est.)", rate: 37 },
];

const INVESTOR_GROWTH = [
  { m: "Jan", investors: 4  }, { m: "Feb", investors: 6  }, { m: "Mar", investors: 7  },
  { m: "Apr", investors: 9  }, { m: "May", investors: 11 }, { m: "Jun", investors: 13 },
  { m: "Jul", investors: 14 }, { m: "Aug", investors: 16 }, { m: "Sep", investors: 17 },
  { m: "Oct", investors: 18 }, { m: "Nov", investors: 19 }, { m: "Dec", investors: 20 },
];

const SECTOR_BREAKDOWN = [
  { name: "FinTech",     deals: 8,  fill: "#6366F1" },
  { name: "HealthTech",  deals: 5,  fill: "#06B6D4" },
  { name: "CleanEnergy", deals: 4,  fill: "#22C55E" },
  { name: "EdTech",      deals: 2,  fill: "#F59E0B" },
  { name: "Others",      deals: 1,  fill: "#A855F7" },
];

const RADIAL_DATA = [
  { name: "NPS Score",    value: 72, fill: "#22C55E" },
  { name: "Retention",    value: 40, fill: "#6366F1" },
  { name: "Close Rate",   value: 68, fill: "#06B6D4" },
];

const TOP_DEALS = [
  { company: "PaySwift",  industry: "FinTech",     amount: "₹1.2L", status: "Closed",   roi: 28 },
  { company: "HealthAI",  industry: "HealthTech",  amount: "₹1.8L", status: "Active",   roi: 35 },
  { company: "GreenGrid", industry: "CleanEnergy", amount: "₹0.9L", status: "Active",   roi: 22 },
  { company: "CryptoX",   industry: "FinTech",     amount: "₹2.4L", status: "Pending",  roi: 48 },
  { company: "EduPrime",  industry: "EdTech",      amount: "₹0.6L", status: "Closed",   roi: 19 },
];

const STATUS_META: Record<string, { color: string; bg: string }> = {
  Closed:  { color: "#22C55E", bg: "rgba(34,197,94,0.1)"   },
  Active:  { color: "#6366F1", bg: "rgba(99,102,241,0.1)"  },
  Pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
};

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#111827", border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 12, padding: "8px 14px", fontFamily: "'Sora',sans-serif",
    }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color ?? "#6366F1", fontWeight: 700, fontSize: 12 }}>
          {typeof p.value === "number" && p.value > 999
            ? `₹${(p.value / 100000).toFixed(1)}L`
            : `${p.value}${p.dataKey === "rate" ? "%" : ""}`}
        </p>
      ))}
    </div>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────
function KpiCard({ title, value, sub, icon: Icon, accent, trend = false, delay = 0 }: any) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      whileHover={{ y: -5, scale: 1.015 }}
      className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
      {/* glow blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.18] group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
        style={{ background: accent, filter: "blur(22px)" }} />
      {/* dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "18px 18px" }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            {title}
          </span>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
            <Icon size={15} style={{ color: accent }} />
          </div>
        </div>
        <p style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 6, fontFamily: "'DM Mono',monospace" }}>{value}</p>
        {sub && (
          <div className="flex items-center gap-1">
            {trend && <ArrowUpRight size={11} color="#22C55E" />}
            <span style={{ fontSize: 11, fontWeight: 600, color: trend ? "#22C55E" : "rgba(255,255,255,0.3)" }}>{sub}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Corporate() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse { 0%,100%{opacity:.22} 50%{opacity:.52} }
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: rgba(6,182,212,.35); border-radius: 10px; }
      `}</style>

      {/* ── AMBIENT ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-8%] right-[15%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.14),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 8s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-[8%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12),transparent 65%)", filter: "blur(80px)", animation: "glow-pulse 10s ease-in-out infinite 2s" }} />
        <div className="absolute top-[50%] left-[50%] w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(34,197,94,0.07),transparent 65%)", filter: "blur(80px)", animation: "glow-pulse 13s ease-in-out infinite 4s" }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "55px 55px" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto space-y-5">

        {/* ── HEADER ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 6 }}>
              Corporate
            </p>
            <h1 className="text-3xl font-bold text-white">Corporate Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)", color: "#4ade80", fontSize: 11, fontWeight: 600 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.22)", color: "#67e8f9", fontSize: 11, fontWeight: 700 }}>
              <Award size={12} /> Enterprise
            </div>
          </div>
        </motion.div>

        {/* ── KPI CARDS ── */}
        <motion.div initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard title="Total Funding Raised" value="₹76.4L" sub="+18% YoY"           trend icon={DollarSign} accent="#6366F1" delay={0} />
          <KpiCard title="Total Investors"       value="20"     sub="+5 this quarter"     trend icon={Users}      accent="#22C55E" delay={1} />
          <KpiCard title="Conversion Rate"       value="35%"    sub="+4% vs last quarter" trend icon={TrendingUp} accent="#06B6D4" delay={2} />
          <KpiCard title="Avg Deal Size"         value="₹25K"   sub="Per investor"              icon={Target}     accent="#F59E0B" delay={3} />
        </motion.div>

        {/* ── MAIN CHARTS BENTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Monthly Funding Bar – 2/3 */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="lg:col-span-2 rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}
                  className="flex items-center gap-2">
                  <BarChart2 size={13} color="#818cf8" /> Monthly Funding
                </h2>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>2024 · Full Year</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.28)" }}>Total</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#818cf8", fontFamily: "'DM Mono',monospace" }}>₹76.4L</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={MONTHLY_FUNDING} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#6366F1" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 9 }}  axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.025)" }} />
                <Bar dataKey="funding" fill="url(#barGrad)" radius={[6, 6, 0, 0]}
                  style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.35))" }} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Conversion Rate Line – 1/3 */}
          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible"
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}
              className="flex items-center gap-2">
              <Activity size={13} color="#22d3ee" /> Conversion Rate
            </h2>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={CONVERSION_DATA} margin={{ top: 5, right: 8, bottom: 5, left: -18 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="q" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 9 }}  axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="rate" stroke="url(#lineGrad)" strokeWidth={3}
                    dot={{ fill: "#06B6D4", r: 5, strokeWidth: 2, stroke: "#080C14" }}
                    activeDot={{ r: 7, fill: "#06B6D4", stroke: "#080C14", strokeWidth: 2 }}
                    style={{ filter: "drop-shadow(0 0 7px rgba(6,182,212,0.6))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[["Peak Q4", "37%", "#22C55E"], ["Growth", "+9pts", "#06B6D4"]].map(([lbl, val, c]) => (
                <div key={lbl as string} className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{lbl}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: c as string, fontFamily: "'DM Mono',monospace" }}>{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── SECOND ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Investor Growth Area – 1/3 */}
          <motion.div variants={fadeUp} custom={6} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}
              className="flex items-center gap-2">
              <Users size={13} color="#22C55E" /> Investor Growth
            </h2>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={INVESTOR_GROWTH} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.22)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.22)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, fontFamily: "'Sora',sans-serif" }} />
                <Area type="monotone" dataKey="investors" stroke="#22C55E" strokeWidth={2.5}
                  fill="url(#invGrad)" dot={false}
                  activeDot={{ r: 5, fill: "#22C55E", stroke: "#080C14", strokeWidth: 2 }}
                  style={{ filter: "drop-shadow(0 0 5px rgba(34,197,94,0.5))" }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-4 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Total Investors</span>
              <div className="flex items-center gap-1">
                <ArrowUpRight size={11} color="#22C55E" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#22C55E", fontFamily: "'DM Mono',monospace" }}>20</span>
              </div>
            </div>
          </motion.div>

          {/* Sector Breakdown Bar – 1/3 */}
          <motion.div variants={fadeUp} custom={7} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}
              className="flex items-center gap-2">
              <Globe size={13} color="#A855F7" /> Sector Breakdown
            </h2>
            <div className="space-y-3">
              {SECTOR_BREAKDOWN.map(({ name, deals, fill }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: fill, fontFamily: "'DM Mono',monospace" }}>{deals} deals</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${(deals / 8) * 100}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: `linear-gradient(90deg,${fill},${fill}88)`, boxShadow: `0 0 6px ${fill}60` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Deals Table – 1/3 */}
          <motion.div variants={fadeUp} custom={8} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}
                className="flex items-center gap-2">
                <Zap size={13} color="#F59E0B" /> Top Deals
              </h2>
              <button style={{ fontSize: 11, color: "#818cf8", fontWeight: 600 }}
                className="hover:text-indigo-300 transition-colors">
                View All →
              </button>
            </div>
            <div className="space-y-2.5">
              {TOP_DEALS.map((d, i) => {
                const { color, bg } = STATUS_META[d.status];
                return (
                  <div key={d.company} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${["#6366F1","#06B6D4","#22C55E","#F59E0B","#A855F7"][i % 5]}60,${["#6366F1","#06B6D4","#22C55E","#F59E0B","#A855F7"][i % 5]}30)` }}>
                      {d.company[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{d.company}</p>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{d.industry}</p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono',monospace" }}>{d.amount}</p>
                      <span style={{ fontSize: 9, fontWeight: 700, color, background: bg, border: `1px solid ${color}28`, padding: "1px 6px", borderRadius: 99 }}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── PERFORMANCE METRICS ── */}
        <motion.div variants={fadeUp} custom={9} initial="hidden" animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck size={14} color="#F59E0B" />
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Performance Metrics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "NPS Score",         value: "72",   note: "Industry avg: 45",  color: "#22C55E", icon: Award      },
              { label: "Deal Close Rate",   value: "68%",  note: "+12% vs last yr",   color: "#6366F1", icon: Target     },
              { label: "Avg Time to Close", value: "23d",  note: "–8 days optimised", color: "#06B6D4", icon: Clock      },
              { label: "Repeat Investors",  value: "40%",  note: "Strong retention",  color: "#F59E0B", icon: Repeat2    },
            ].map(({ label, value, note, color, icon: Icon }) => (
              <div key={label} className="rounded-xl p-4 relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}18` }}>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: color, filter: "blur(16px)" }} />
                <div className="flex items-center justify-between mb-3">
                  <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{label}</p>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={12} style={{ color }} />
                  </div>
                </div>
                <p style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>{value}</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight size={10} color="#22C55E" />
                  <p style={{ fontSize: 10, color: "#22C55E", fontWeight: 500 }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM: FUNNEL + QUICK STATS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Deal Funnel */}
          <motion.div variants={fadeUp} custom={10} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}
              className="flex items-center gap-2">
              <TrendingUp size={13} color="#6366F1" /> Deal Funnel
            </h2>
            <div className="space-y-3">
              {[
                { stage: "Leads",      count: 120, color: "#6366F1", pct: 100 },
                { stage: "Screened",   count: 80,  color: "#06B6D4", pct: 67  },
                { stage: "Due Dilig.", count: 45,  color: "#22C55E", pct: 38  },
                { stage: "Term Sheet", count: 28,  color: "#F59E0B", pct: 23  },
                { stage: "Closed",     count: 20,  color: "#A855F7", pct: 17  },
              ].map(({ stage, count, color, pct }) => (
                <div key={stage} className="flex items-center gap-3">
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", width: 80, flexShrink: 0 }}>{stage}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: `linear-gradient(90deg,${color},${color}88)`, boxShadow: `0 0 6px ${color}50` }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "'DM Mono',monospace", width: 24, textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Milestones */}
          <motion.div variants={fadeUp} custom={11} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}
              className="flex items-center gap-2">
              <Award size={13} color="#22d3ee" /> Key Milestones
            </h2>
            <div className="space-y-3">
              {[
                { text: "Crossed ₹50L total funding",                     date: "Oct 2024",  color: "#6366F1" },
                { text: "20th investor onboarded",                         date: "Nov 2024",  color: "#22C55E" },
                { text: "Conversion rate crossed 35%",                     date: "Dec 2024",  color: "#06B6D4" },
                { text: "Series A deal closed — ₹2.4L",                   date: "Dec 2024",  color: "#F59E0B" },
                { text: "NPS score reached all-time high of 72",           date: "Jan 2025",  color: "#A855F7" },
              ].map(({ text, date, color }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  <div className="flex-1">
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{text}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}