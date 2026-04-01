"use client";
 
import { getDealsFromStorage } from "../../utils/storage";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, AlertTriangle, CheckCircle, Wallet,
  PlusCircle, ArrowUpRight, BarChart2, Activity,
} from "lucide-react";
 
// ─── ANIMATION ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.48, delay: i * 0.07, ease: [0.22,1,0.36,1] } }),
};
 
// ─── HELPERS ──────────────────────────────────────────────────────
function RiskBadge({ risk }: { risk: string }) {
  const m: Record<string, { color: string; Icon: any }> = {
    Low:    { color: "#22C55E", Icon: CheckCircle },
    Medium: { color: "#F59E0B", Icon: Shield },
    High:   { color: "#EF4444", Icon: AlertTriangle },
  };
  const { color, Icon } = m[risk] ?? m.Medium;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: `${color}14`, color, border: `1px solid ${color}2a` }}>
      <Icon size={9} />{risk}
    </span>
  );
}
 
// ─── INVESTMENT CARD ──────────────────────────────────────────────
function InvestmentCard({ d, index }: { d: any; index: number }) {
  const roiColor = d.roi >= 20 ? "#22C55E" : d.roi >= 10 ? "#F59E0B" : "#EF4444";
  return (
    <motion.div
      variants={fadeUp} custom={index}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative rounded-2xl p-5 overflow-hidden group cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.035)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(6,182,212,0.04))" }} />
 
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.5),rgba(6,182,212,0.5))" }}>
              {d.company?.[0] ?? "?"}
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">{d.company}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{d.industry}</p>
            </div>
          </div>
          <RiskBadge risk={d.risk} />
        </div>
 
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(34,197,94,0.07)", border: `1px solid ${roiColor}18` }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">ROI</p>
            <p className="text-sm font-bold" style={{ color: roiColor, fontFamily: "'DM Mono',monospace" }}>{d.roi}%</p>
          </div>
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">Invest</p>
            <p className="text-xs font-bold text-white/65" style={{ fontFamily: "'DM Mono',monospace" }}>
              {d.investment ? `₹${(d.investment/1000).toFixed(0)}K` : "—"}
            </p>
          </div>
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">Status</p>
            <p className="text-[10px] font-bold text-indigo-300">Active</p>
          </div>
        </div>
 
        {/* returns indicator */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] text-white/30">Est. Returns</span>
          <div className="flex items-center gap-1">
            <ArrowUpRight size={11} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400" style={{ fontFamily: "'DM Mono',monospace" }}>
              +{((d.roi / 100) * (d.investment ?? 50000) / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>
 
      {/* hover bottom line */}
      <div className="absolute bottom-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }} />
    </motion.div>
  );
}
 
// ─── EMPTY STATE ──────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* animated wallet icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto"
          style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(6,182,212,0.1))", border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 0 40px rgba(99,102,241,0.15)" }}>
          <Wallet size={44} className="text-indigo-400" style={{ filter: "drop-shadow(0 0 8px rgba(99,102,241,0.6))" }} />
        </div>
        {/* floating dots */}
        {[
          { top: "-8px", right: "0", color: "#22C55E", delay: "0s" },
          { top: "0", left: "-12px", color: "#6366F1", delay: "0.3s" },
          { bottom: "-4px", right: "-8px", color: "#06B6D4", delay: "0.6s" },
        ].map((dot, i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full"
            style={{ ...dot, animation: `float 3s ease-in-out infinite`, animationDelay: dot.delay, background: dot.color, boxShadow: `0 0 8px ${dot.color}` }} />
        ))}
      </motion.div>
 
      <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible">
        <h2 className="text-2xl font-bold text-white mb-2">No Saved Investments</h2>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed mb-8">
          You haven't saved any deals yet. Explore the Deal Explorer and add investments to your portfolio.
        </p>
      </motion.div>
 
      <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}>
          <PlusCircle size={15} />Explore Deals
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white/60 transition-all duration-200 hover:text-white/80"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <BarChart2 size={15} />View Dashboard
        </button>
      </motion.div>
 
      {/* tips */}
      <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg">
        {[
          { icon: Activity,   color: "#6366F1", text: "Browse AI-ranked deals" },
          { icon: TrendingUp, color: "#22C55E", text: "Filter by ROI & risk" },
          { icon: Wallet,     color: "#06B6D4", text: "Save to your portfolio" },
        ].map(({ icon: Icon, color, text }, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
              <Icon size={14} style={{ color }} />
            </div>
            <p className="text-[11px] text-white/40 font-medium">{text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
 
// ─── PAGE ─────────────────────────────────────────────────────────
export default function Investments() {
  const data = getDealsFromStorage();
 
  return (
    <div className="min-h-screen" style={{ background: "#0B0F19", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.3}50%{opacity:.65}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        *{box-sizing:border-box}
      `}</style>
 
      {/* ── AMBIENT ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)", filter: "blur(80px)", animation: "glow-pulse 9s ease-in-out infinite" }} />
      </div>
 
      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto">
 
        {/* ── HEADER ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-1.5">Portfolio</p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">My Investments</h1>
            {data.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-300"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <Wallet size={12} />
                {data.length} saved
              </div>
            )}
          </div>
        </motion.div>
 
        {/* 🟡 EMPTY STATE */}
        {!data.length ? (
          <EmptyState />
        ) : (
          <>
            {/* summary bar */}
            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Saved", value: `${data.length}`, color: "#6366F1" },
                { label: "Avg ROI", value: `${(data.reduce((s: number, d: any) => s + (d.roi || 0), 0) / data.length).toFixed(1)}%`, color: "#22C55E" },
                { label: "Est. Returns", value: "₹2.4L", color: "#06B6D4" },
                { label: "Portfolio Health", value: "Good", color: "#F59E0B" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{label}</p>
                  <p className="text-xl font-bold" style={{ color, fontFamily: "'DM Mono',monospace" }}>{value}</p>
                </div>
              ))}
            </motion.div>
 
            {/* cards grid */}
            <motion.div initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.map((d: any, i: number) => (
                <InvestmentCard key={d.id} d={d} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}