"use client";

import { motion } from "framer-motion";
import {
  DollarSign, Users, TrendingUp, Target, ArrowUpRight,
  BarChart2, Activity, Zap, Award,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── ANIMATION ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22,1,0.36,1] } }),
};

// ─── CHART DATA ────────────────────────────────────────────────────
const fundingData = [
  { month: "Jan", funding: 420000 },
  { month: "Feb", funding: 380000 },
  { month: "Mar", funding: 510000 },
  { month: "Apr", funding: 470000 },
  { month: "May", funding: 620000 },
  { month: "Jun", funding: 580000 },
  { month: "Jul", funding: 700000 },
  { month: "Aug", funding: 650000 },
  { month: "Sep", funding: 780000 },
  { month: "Oct", funding: 820000 },
  { month: "Nov", funding: 760000 },
  { month: "Dec", funding: 950000 },
];

const conversionData = [
  { q: "Q1", rate: 28 },
  { q: "Q2", rate: 31 },
  { q: "Q3", rate: 33 },
  { q: "Q4 (est.)", rate: 37 },
];

const SECTOR_COLORS = ["#6366F1", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs"
      style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)", color: "#fff" }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color ?? "#6366F1" }} className="font-bold">
          {typeof p.value === "number" && p.value > 1000
            ? `₹${(p.value / 100000).toFixed(1)}L`
            : `${p.value}%`}
        </p>
      ))}
    </div>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────
function KpiCard({ title, value, sub, icon: Icon, accent, trend, delay = 0 }: any) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      whileHover={{ y: -4, scale: 1.012 }}
      className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
      style={{
        background: "rgba(255,255,255,0.035)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: accent, filter: "blur(20px)" }} />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/35">{title}</span>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
            <Icon size={16} style={{ color: accent }} />
          </div>
        </div>
        <p className="text-[1.75rem] font-bold text-white leading-none mb-1.5" style={{ fontFamily: "'DM Mono',monospace" }}>{value}</p>
        {sub && (
          <div className="flex items-center gap-1">
            {trend === "up" && <ArrowUpRight size={12} className="text-emerald-400" />}
            <span className={`text-[11px] font-semibold ${trend === "up" ? "text-emerald-400" : "text-white/35"}`}>{sub}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Corporate() {
  return (
    <div className="min-h-screen" style={{ background: "#0B0F19", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.3}50%{opacity:.65}}
        *{box-sizing:border-box}
      `}</style>

      {/* ── AMBIENT ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.12),transparent 70%)", filter: "blur(80px)", animation: "glow-pulse 8s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)", filter: "blur(80px)", animation: "glow-pulse 10s ease-in-out infinite 2s" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-1.5">Corporate</p>
            <h1 className="text-3xl font-bold text-white">Corporate Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-cyan-300"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
            <Award size={13} />Enterprise
          </div>
        </motion.div>

        {/* ── KPI CARDS ── */}
        <motion.div initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard title="Total Funding" value="₹5L" sub="+18% YoY" trend="up" icon={DollarSign} accent="#6366F1" delay={0} />
          <KpiCard title="Total Investors" value="20" sub="+5 this quarter" trend="up" icon={Users} accent="#22C55E" delay={1} />
          <KpiCard title="Conversion Rate" value="35%" sub="+4% vs last qtr" trend="up" icon={TrendingUp} accent="#06B6D4" delay={2} />
          <KpiCard title="Avg Deal Size" value="₹25K" sub="Per investor" icon={Target} accent="#F59E0B" delay={3} />
        </motion.div>

        {/* ── CHARTS BENTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Bar Chart - Funding by Month - 2/3 */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="lg:col-span-2 rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <BarChart2 size={14} className="text-indigo-400" />Monthly Funding
                </h2>
                <p className="text-xs text-white/30 mt-0.5">2024 · Full Year</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Total</p>
                <p className="text-sm font-bold text-indigo-300" style={{ fontFamily: "'DM Mono',monospace" }}>₹76.4L</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={fundingData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="funding" fill="url(#barGrad)" radius={[6,6,0,0]}
                  style={{ filter: "drop-shadow(0 0 4px rgba(99,102,241,0.3))" }} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Conversion Rate Line - 1/3 */}
          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible"
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Activity size={14} className="text-cyan-400" />
              <h2 className="text-sm font-semibold text-white/80">Conversion Rate</h2>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={conversionData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="q" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="rate" stroke="url(#lineGrad)" strokeWidth={3}
                    dot={{ fill: "#06B6D4", r: 5, strokeWidth: 2, stroke: "#0B0F19" }}
                    activeDot={{ r: 7, fill: "#06B6D4", stroke: "#0B0F19", strokeWidth: 2 }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(6,182,212,0.5))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* highlights */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[["Peak Q4", "37%", "#22C55E"],["Growth", "+9pts", "#06B6D4"]].map(([label, val, color]) => (
                <div key={label} className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-[9px] uppercase tracking-widest text-white/25 mb-1">{label}</p>
                  <p className="text-sm font-bold" style={{ color, fontFamily: "'DM Mono',monospace" }}>{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: PERFORMANCE METRICS ── */}
        <motion.div variants={fadeUp} custom={6} initial="hidden" animate="visible"
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Zap size={14} className="text-amber-400" />
            <h2 className="text-sm font-semibold text-white/80">Performance Metrics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "NPS Score",       value: "72",    note: "Industry avg: 45",  color: "#22C55E" },
              { label: "Deal Close Rate", value: "68%",   note: "+12% vs last yr",   color: "#6366F1" },
              { label: "Avg Time to Close","value":"23d", note: "-8 days optimized",  color: "#06B6D4" },
              { label: "Repeat Investors","value":"40%",  note: "Strong retention",   color: "#F59E0B" },
            ].map(({ label, value, note, color }) => (
              <div key={label} className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}18` }}>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{label}</p>
                <p className="text-2xl font-bold mb-1" style={{ color, fontFamily: "'DM Mono',monospace" }}>{value}</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight size={11} className="text-emerald-400" />
                  <p className="text-[10px] text-emerald-400 font-medium">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}