"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Zap, TrendingUp, Shield, AlertTriangle, CheckCircle,
  Settings2, ArrowUpRight, Star, RefreshCw,
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── DEAL POOL ─────────────────────────────────────────────────────
const DEALS = [
  { id: 1, company: "PaySwift", industry: "FinTech", roi: 28, risk: "Low", investment: 50000, trend: "up" },
  { id: 2, company: "HealthAI", industry: "HealthTech", roi: 35, risk: "Medium", investment: 75000, trend: "up" },
  { id: 3, company: "GreenGrid", industry: "CleanEnergy", roi: 22, risk: "Low", investment: 30000, trend: "stable" },
  { id: 4, company: "CryptoX", industry: "FinTech", roi: 48, risk: "High", investment: 100000, trend: "up" },
  { id: 5, company: "EduPrime", industry: "EdTech", roi: 19, risk: "Low", investment: 25000, trend: "stable" },
  { id: 6, company: "AgriBot", industry: "AgriTech", roi: 31, risk: "Medium", investment: 60000, trend: "up" },
  { id: 7, company: "DroneLogix", industry: "Logistics", roi: 38, risk: "Medium", investment: 80000, trend: "up" },
  { id: 8, company: "SafeVault", industry: "Cybersecurity", roi: 24, risk: "Low", investment: 40000, trend: "stable" },
  { id: 9, company: "NeuroPay", industry: "FinTech", roi: 42, risk: "High", investment: 120000, trend: "up" },
  { id: 10, company: "SolarNova", industry: "CleanEnergy", roi: 26, risk: "Low", investment: 55000, trend: "up" },
  { id: 11, company: "LearnPath", industry: "EdTech", roi: 21, risk: "Low", investment: 20000, trend: "stable" },
  { id: 12, company: "SupplyAI", industry: "Logistics", roi: 33, risk: "Medium", investment: 70000, trend: "up" },
];

const INDUSTRIES = ["Any", "FinTech", "HealthTech", "CleanEnergy", "EdTech", "AgriTech", "Logistics", "Cybersecurity"];
const RISK_LEVELS = ["Low", "Medium", "High"];
const RISK_SCORE: Record<string, number> = { Low: 100, Medium: 65, High: 30 };
const RISK_COLORS: Record<string, string> = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" };

// ─── SCORING ENGINE ───────────────────────────────────────────────
const scoreCache = new Map<string, number>();

function computeScore(
  deal: typeof DEALS[0],
  prefs: { risk: string; industry: string; budget: number; minRoi: number }
): number {
  const key = `${deal.id}-${prefs.risk}-${prefs.industry}-${prefs.budget}-${prefs.minRoi}`;
  if (scoreCache.has(key)) return scoreCache.get(key)!;

  const riskMatch = deal.risk === prefs.risk ? 100 : Math.abs(RISK_SCORE[deal.risk] - RISK_SCORE[prefs.risk]) < 35 ? 60 : 20;
  const industryMatch = prefs.industry === "Any" || deal.industry === prefs.industry ? 100 : 25;
  const budgetFit = deal.investment <= prefs.budget ? 100 : Math.max(0, 100 - ((deal.investment - prefs.budget) / prefs.budget) * 100);
  const roiScore = deal.roi >= prefs.minRoi ? Math.min(100, ((deal.roi - prefs.minRoi) / 30) * 100 + 50) : 0;
  const trendBonus = deal.trend === "up" ? 10 : 0;

  const score = Math.round(riskMatch * 0.3 + industryMatch * 0.25 + budgetFit * 0.2 + roiScore * 0.25 + trendBonus);
  scoreCache.set(key, score);
  return score;
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444";
  const deg = (score / 100) * 360;
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: `conic-gradient(${color} 0deg,${color} ${deg}deg,rgba(255,255,255,0.07) ${deg}deg)` }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#0d1120" }}>
          <span className="text-[11px] font-black" style={{ color, fontFamily: "'DM Mono',monospace" }}>{score}</span>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationEngine() {
  const [prefs, setPrefs] = useState({ risk: "Low", industry: "Any", budget: 100000, minRoi: 15 });
  const [animKey, setAnimKey] = useState(0);

  const scored = useMemo(() => {
    return DEALS
      .map(d => ({ ...d, matchScore: computeScore(d, prefs) }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [prefs]);

  const top3 = scored.slice(0, 3);
  const rest = scored.slice(3);

  const refresh = useCallback(() => { setAnimKey(k => k + 1); }, []);

  const radarData = top3[0] ? [
    { subject: "Risk Match", value: top3[0].risk === prefs.risk ? 100 : 50 },
    { subject: "Industry", value: prefs.industry === "Any" || top3[0].industry === prefs.industry ? 100 : 25 },
    { subject: "Budget Fit", value: Math.min(100, (prefs.budget / top3[0].investment) * 100) },
    { subject: "ROI Score", value: Math.min(100, (top3[0].roi / 50) * 100) },
    { subject: "Momentum", value: top3[0].trend === "up" ? 90 : 60 },
  ] : [];

  return (
    <div className="min-h-screen" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        *{box-sizing:border-box}
        input[type=range]{accent-color:#6366F1}
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[10%] left-[30%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.15),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 9s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto">

        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-1">AI Engine</p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap size={26} className="text-indigo-400" style={{ filter: "drop-shadow(0 0 8px rgba(99,102,241,0.8))" }} />
              Recommendation Engine
            </h1>
            <button onClick={refresh}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <RefreshCw size={13} /> Rescore
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">

          {/* PREFERENCE PANEL */}
          <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="xl:col-span-1 rounded-2xl p-5 h-fit"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-sm font-bold text-white/80 mb-5 flex items-center gap-2">
              <Settings2 size={14} className="text-indigo-400" />Your Preferences
            </h2>

            {/* Risk */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Risk Tolerance</p>
              <div className="flex flex-col gap-2">
                {RISK_LEVELS.map(r => (
                  <button key={r} onClick={() => setPrefs(p => ({ ...p, risk: r }))}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-left transition-all duration-200"
                    style={{
                      background: prefs.risk === r ? `${RISK_COLORS[r]}15` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${prefs.risk === r ? `${RISK_COLORS[r]}40` : "rgba(255,255,255,0.07)"}`,
                      color: prefs.risk === r ? RISK_COLORS[r] : "rgba(255,255,255,0.45)"
                    }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: RISK_COLORS[r] }} />
                    {r} Risk
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Industry Focus</p>
              <div className="flex flex-wrap gap-1.5">
                {INDUSTRIES.map(ind => (
                  <button key={ind} onClick={() => setPrefs(p => ({ ...p, industry: ind }))}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all duration-150"
                    style={{
                      background: prefs.industry === ind ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${prefs.industry === ind ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.07)"}`,
                      color: prefs.industry === ind ? "#a5b4fc" : "rgba(255,255,255,0.4)"
                    }}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">
                Budget: <span className="text-indigo-400">₹{(prefs.budget / 1000).toFixed(0)}K</span>
              </p>
              <input type="range" min={20000} max={200000} step={5000} value={prefs.budget}
                onChange={e => setPrefs(p => ({ ...p, budget: +e.target.value }))} className="w-full" />
              <div className="flex justify-between text-[9px] text-white/25 mt-1"><span>₹20K</span><span>₹2L</span></div>
            </div>

            {/* Min ROI */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">
                Min ROI: <span className="text-cyan-400">{prefs.minRoi}%</span>
              </p>
              <input type="range" min={5} max={45} value={prefs.minRoi}
                onChange={e => setPrefs(p => ({ ...p, minRoi: +e.target.value }))} className="w-full" />
              <div className="flex justify-between text-[9px] text-white/25 mt-1"><span>5%</span><span>45%</span></div>
            </div>
          </motion.div>

          {/* RESULTS */}
          <div className="xl:col-span-3 space-y-5">

            {/* TOP 3 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-amber-400" fill="#F59E0B" />
                <p className="text-sm font-bold text-white/70">Top Matches</p>
              </div>
              <motion.div key={`top-${animKey}`} initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {top3.map((d, i) => (
                  <motion.div key={d.id} variants={fadeUp} custom={i}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative rounded-2xl p-5 overflow-hidden group"
                    style={{
                      background: i === 0 ? "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(6,182,212,0.06))" : "rgba(255,255,255,0.03)",
                      border: i === 0 ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.07)",
                      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)"
                    }}>
                    {i === 0 && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black"
                        style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.4)" }}>
                        BEST MATCH
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <ScoreRing score={d.matchScore} />
                      <div>
                        <p className="font-bold text-white text-sm">{d.company}</p>
                        <p className="text-[10px] text-white/40">{d.industry}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-[9px] text-white/30 mb-0.5">ROI</p>
                        <p className="text-xs font-bold text-emerald-400">{d.roi}%</p>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-[9px] text-white/30 mb-0.5">Risk</p>
                        <p className="text-xs font-bold" style={{ color: RISK_COLORS[d.risk] }}>{d.risk}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RADAR CHART for top match */}
            {top3[0] && (
              <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible"
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white/80">
                    Match Analysis — <span className="text-indigo-400">{top3[0].company}</span>
                  </h3>
                  <div className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-400"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                    Score: {top3[0].matchScore}/100
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.07)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
                    <Radar name="Score" dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", color: "#fff" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* ALL RANKED */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">All Ranked Deals</p>
              <div className="space-y-2">
                {scored.map((d, i) => (
                  <motion.div key={d.id} variants={fadeUp} custom={i} initial="hidden" animate="visible"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="w-5 text-[11px] font-black text-white/25 flex-shrink-0"
                      style={{ fontFamily: "'DM Mono',monospace" }}>#{i + 1}</span>
                    <ScoreRing score={d.matchScore} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{d.company}</p>
                      <p className="text-[10px] text-white/35">{d.industry}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-[11px]">
                      <span className="font-bold text-emerald-400">ROI {d.roi}%</span>
                      <span className="font-semibold" style={{ color: RISK_COLORS[d.risk] }}>{d.risk}</span>
                      <span className="text-white/35">₹{(d.investment / 1000).toFixed(0)}K min.</span>
                    </div>
                    <div className="w-24 h-1.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${d.matchScore}%`, background: "linear-gradient(90deg,#6366F1,#06B6D4)" }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}