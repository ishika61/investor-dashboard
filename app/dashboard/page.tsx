"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Shield, AlertTriangle, DollarSign, Activity,
  BarChart2, PieChart as PieIcon, ArrowUpRight, Zap, Target,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── DATA ────────────────────────────────────────────────────────
const growthData = [
  { month: "Jan", value: 120000 }, { month: "Feb", value: 145000 }, { month: "Mar", value: 138000 },
  { month: "Apr", value: 175000 }, { month: "May", value: 162000 }, { month: "Jun", value: 210000 },
  { month: "Jul", value: 198000 }, { month: "Aug", value: 245000 }, { month: "Sep", value: 280000 },
  { month: "Oct", value: 265000 }, { month: "Nov", value: 310000 }, { month: "Dec", value: 358000 },
];

const industryData = [
  { name: "SaaS", value: 34 }, { name: "FinTech", value: 22 },
  { name: "HealthTech", value: 18 }, { name: "CleanEnergy", value: 14 }, { name: "EdTech", value: 12 },
];

const riskRoiData = [
  { risk: 1, roi: 8, name: "SafeVault", size: 200 }, { risk: 2, roi: 14, name: "PaySwift", size: 300 },
  { risk: 3, roi: 22, name: "GreenGrid", size: 150 }, { risk: 4, roi: 31, name: "HealthAI", size: 400 },
  { risk: 5, roi: 42, name: "CryptoX", size: 250 }, { risk: 2, roi: 18, name: "EduPrime", size: 180 },
  { risk: 3, roi: 28, name: "AgroBot", size: 220 }, { risk: 4, roi: 35, name: "DroneLogix", size: 350 },
];

const COLORS = ["#6366F1", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

const RECENT = [
  { company: "PaySwift", industry: "FinTech", roi: 28, risk: "Low", amount: "₹50K", change: "+4.2%" },
  { company: "HealthAI", industry: "HealthTech", roi: 35, risk: "Medium", amount: "₹75K", change: "+7.8%" },
  { company: "GreenGrid", industry: "CleanEnergy", roi: 22, risk: "Low", amount: "₹30K", change: "+2.1%" },
  { company: "CryptoX", industry: "FinTech", roi: 48, risk: "High", amount: "₹100K", change: "+12.3%" },
];

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs"
      style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)", color: "#fff", fontFamily: "'Sora',sans-serif" }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color ?? "#6366F1" }} className="font-bold">
          {typeof p.value === "number" && p.value > 1000 ? `₹${(p.value / 1000).toFixed(0)}K` : `${p.value}`}
        </p>
      ))}
    </div>
  );
}

// ─── RISK BADGE ──────────────────────────────────────────────────
function RiskBadge({ risk }: { risk: string }) {
  const m: Record<string, { color: string }> = { Low: { color: "#22C55E" }, Medium: { color: "#F59E0B" }, High: { color: "#EF4444" } };
  const { color } = m[risk] ?? m.Medium;
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: `${color}14`, color, border: `1px solid ${color}2a` }}>{risk}</span>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────
export default function InvestorDashboard() {
  const totalInvested = RECENT.reduce((s, d) => s + parseInt(d.amount.replace(/[₹K]/g, "")) * 1000, 0);

  return (
    <div className="min-h-screen" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        *{box-sizing:border-box}
      `}</style>

      {/* AMBIENT */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-[30%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.14),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 9s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-[15%] w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 65%)", filter: "blur(80px)", animation: "glow-pulse 11s ease-in-out infinite 2s" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto space-y-5">

        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-1">Dashboard</p>
            <h1 className="text-3xl font-bold text-white">Investor Overview</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-emerald-300"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Total Investments", value: "₹2.55L", sub: "+18% this quarter", icon: DollarSign, color: "#6366F1", trend: true },
            { title: "Active Deals", value: "24", sub: "4 new this week", icon: Activity, color: "#22C55E", trend: true },
            { title: "Portfolio ROI", value: "31.2%", sub: "+4.5% vs last yr", icon: TrendingUp, color: "#06B6D4", trend: true },
            { title: "Risk Score", value: "Low", sub: "Healthy allocation", icon: Shield, color: "#F59E0B", trend: false },
          ].map(({ title, value, sub, icon: Icon, color, trend }, i) => (
            <motion.div key={title} variants={fadeUp} custom={i}
              whileHover={{ y: -5, scale: 1.015 }}
              className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ background: color, filter: "blur(20px)" }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/35">{title}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "'DM Mono',monospace" }}>{value}</p>
                <div className="flex items-center gap-1">
                  {trend && <ArrowUpRight size={11} className="text-emerald-400" />}
                  <span className={`text-[10px] font-semibold ${trend ? "text-emerald-400" : "text-white/35"}`}>{sub}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MAIN CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Investment Growth - 2/3 */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="lg:col-span-2 rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <TrendingUp size={14} className="text-indigo-400" /> Investment Growth
                </h2>
                <p className="text-xs text-white/30 mt-0.5">2024 · Full Year</p>
              </div>
              <p className="text-sm font-bold text-indigo-300" style={{ fontFamily: "'DM Mono',monospace" }}>₹3.58L peak</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={growthData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="url(#lineGrad)" strokeWidth={3}
                  dot={false} activeDot={{ r: 6, fill: "#6366F1", stroke: "#080C14", strokeWidth: 2 }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(99,102,241,0.6))" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Industry Distribution Pie - 1/3 */}
          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-5">
              <PieIcon size={14} className="text-cyan-400" /> Industry Split
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={industryData} dataKey="value" cx="50%" cy="50%"
                  outerRadius={75} innerRadius={40} paddingAngle={3}
                  strokeWidth={0}>
                  {industryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-3">
              {industryData.map(({ name, value }, i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-[11px] text-white/50">{name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-white/70" style={{ fontFamily: "'DM Mono',monospace" }}>{value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Risk vs ROI Scatter */}
          <motion.div variants={fadeUp} custom={6} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-1">
              <Target size={14} className="text-amber-400" /> Risk vs ROI Analysis
            </h2>
            <p className="text-xs text-white/30 mb-4">Bubble size = investment amount</p>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="risk" name="Risk" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                  axisLine={false} tickLine={false} label={{ value: "Risk Level", position: "insideBottom", fill: "rgba(255,255,255,0.2)", fontSize: 10 }} />
                <YAxis dataKey="roi" name="ROI" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                  axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <ZAxis dataKey="size" range={[60, 200]} />
                <Tooltip cursor={false} content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return (
                    <div className="rounded-xl px-3 py-2 text-xs"
                      style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)" }}>
                      <p className="text-white font-bold">{d.name}</p>
                      <p className="text-indigo-300">ROI: {d.roi}%</p>
                      <p className="text-cyan-300">Risk: {d.risk}/5</p>
                    </div>
                  );
                }} />
                <Scatter data={riskRoiData} fill="#6366F1" fillOpacity={0.75}
                  style={{ filter: "drop-shadow(0 0 4px rgba(99,102,241,0.5))" }} />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Deals */}
          <motion.div variants={fadeUp} custom={7} initial="hidden" animate="visible"
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Zap size={14} className="text-indigo-400" /> Recent Investments
              </h2>
              <button className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">View All →</button>
            </div>
            <div className="space-y-3">
              {RECENT.map((d, i) => (
                <div key={d.company} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
                      style={{ background: `linear-gradient(135deg,${COLORS[i % COLORS.length]}60,${COLORS[(i + 1) % COLORS.length]}40)` }}>
                      {d.company[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{d.company}</p>
                      <p className="text-[10px] text-white/35">{d.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RiskBadge risk={d.risk} />
                    <div className="text-right">
                      <p className="text-xs font-bold text-white" style={{ fontFamily: "'DM Mono',monospace" }}>{d.amount}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">{d.change}</p>
                    </div>
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