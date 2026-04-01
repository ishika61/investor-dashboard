"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, ArrowUpRight, ChevronDown,
  ChevronLeft, ChevronRight, X, TrendingUp, Shield, AlertTriangle, CheckCircle, Bookmark, BookmarkCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── GENERATE LARGE DATASET ──────────────────────────────────────
const INDUSTRIES = ["SaaS", "FinTech", "HealthTech", "CleanEnergy", "EdTech", "AgriTech", "Logistics", "Cybersecurity"];
const COMPANIES = [
  "PaySwift", "HealthAI", "GreenGrid", "EduPrime", "AgriBot", "DroneLogix", "SafeVault", "CryptoX",
  "MediTrack", "SolarNova", "LearnPath", "SupplyAI", "BioSync", "QuickPay", "DataShield", "CloudFarm",
  "NeuroPay", "EcoFinance", "SkillUp", "FreightAI", "GenomicsX", "SolarPeak", "TalentBridge", "SecureNet",
  "AquaTech", "NanoHealth", "EduBot", "TradeFlow", "GreenBuild", "MobilePay",
];

function seed(n: number) { return (Math.sin(n * 9301 + 49297) * 233280) % 1; }

const ALL_DEALS = COMPANIES.map((company, i) => ({
  id: i + 1,
  company,
  industry: INDUSTRIES[Math.floor(seed(i) * INDUSTRIES.length)],
  roi: Math.round(8 + seed(i * 2) * 52),
  risk: (["Low", "Medium", "High"] as const)[Math.floor(seed(i * 3) * 3)],
  investment: Math.round((50 + seed(i * 4) * 450) * 1000),
  score: Math.round(55 + seed(i * 5) * 45),
  stage: (["Seed", "Series A", "Series B", "Pre-IPO"] as const)[Math.floor(seed(i * 6) * 4)],
}));

const PAGE_SIZE = 9;
const RISK_COLORS: Record<string, string> = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" };
const RISK_ICONS: Record<string, any> = { Low: CheckCircle, Medium: Shield, High: AlertTriangle };

// ─── HOOK: DEBOUNCE ───────────────────────────────────────────────
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

// ─── DEAL CARD ────────────────────────────────────────────────────
function DealCard({ d, saved, onSave, index }: { d: typeof ALL_DEALS[0]; saved: boolean; onSave: () => void; index: number }) {
  const router = useRouter();
const RiskIcon = RISK_ICONS[d.risk] || CheckCircle;
  const color = RISK_COLORS[d.risk];
  const roiColor = d.roi >= 30 ? "#22C55E" : d.roi >= 15 ? "#F59E0B" : "#EF4444";

  return (
 <motion.div
 onClick={() => router.push(`/deals/${d.id}`)}
  whileHover={{ y: -6, scale: 1.015 }}
  className="relative rounded-2xl p-5 overflow-hidden group cursor-pointer"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(6,182,212,0.03))" }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.5),rgba(6,182,212,0.4))" }}>
              {d.company[0]}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{d.company}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{d.industry} · {d.stage}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: `${color}14`, color, border: `1px solid ${color}2a` }}>
              <RiskIcon size={9} />{d.risk}
            </span>
            <button
                 onClick={(e)=>{
                  e.stopPropagation();
                  onSave();
                 }}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: saved ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${saved ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}` }}>
              {saved ? <BookmarkCheck size={12} className="text-indigo-400" /> : <Bookmark size={12} className="text-white/40" />}
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-xl p-2.5 text-center" style={{ background: `${roiColor}0f`, border: `1px solid ${roiColor}20` }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">ROI</p>
            <p className="text-sm font-bold" style={{ color: roiColor, fontFamily: "'DM Mono',monospace" }}>{d.roi}%</p>
          </div>
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.025)" }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">Min.</p>
            <p className="text-xs font-bold text-white/65" style={{ fontFamily: "'DM Mono',monospace" }}>₹{(d.investment / 1000).toFixed(0)}K</p>
          </div>
          <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">Score</p>
            <p className="text-sm font-bold text-indigo-300" style={{ fontFamily: "'DM Mono',monospace" }}>{d.score}</p>
          </div>
        </div>

        {/* Score bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] text-white/30 uppercase tracking-widest">Match Score</span>
            <span className="text-[9px] font-bold text-indigo-300">{d.score}/100</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${d.score}%`, background: "linear-gradient(90deg,#6366F1,#06B6D4)" }} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] text-white/30">Est. Returns</span>
          <div className="flex items-center gap-1">
            <ArrowUpRight size={11} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400" style={{ fontFamily: "'DM Mono',monospace" }}>
              +₹{((d.roi / 100) * d.investment / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }} />
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function DealExplorer() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 280);
  const [industryFilter, setIndustryFilter] = useState<string[]>([]);
  const [riskFilter, setRiskFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"roi" | "score" | "investment">("score");
  const [roiMin, setRoiMin] = useState(0);
  const [invMax, setInvMax] = useState(500);
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = useCallback((id: number) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let r = ALL_DEALS;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      r = r.filter(d => d.company.toLowerCase().includes(q) || d.industry.toLowerCase().includes(q));
    }
    if (industryFilter.length) r = r.filter(d => industryFilter.includes(d.industry));
    if (riskFilter.length) r = r.filter(d => riskFilter.includes(d.risk));
    r = r.filter(d => d.roi >= roiMin && d.investment / 1000 <= invMax);
    return [...r].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [debouncedQuery, industryFilter, riskFilter, roiMin, invMax, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [debouncedQuery, industryFilter, riskFilter, roiMin, invMax, sortBy]);

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  return (
    <div className="min-h-screen" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse{0%,100%{opacity:.25}50%{opacity:.55}}
        *{box-sizing:border-box}
        input[type=range]{accent-color:#6366F1}
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 9s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="relative z-10 p-6 md:p-8 max-w-screen-2xl mx-auto">

        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-1">Discover</p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Deal Explorer</h1>
            <div className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-white/50"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {filtered.length} deals found
            </div>
          </div>
        </motion.div>

        {/* SEARCH + CONTROLS */}
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="flex flex-col md:flex-row gap-3 mb-5">
       
        {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by company or industry…"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Sora',sans-serif" }}
              onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl text-sm text-white/70 outline-none cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Sora',sans-serif" }}>
              <option value="score">Sort: Match Score</option>
              <option value="roi">Sort: ROI</option>
              <option value="investment">Sort: Investment</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>

          {/* Filters toggle */}
          <button onClick={() => setShowFilters(v => !v)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: showFilters ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${showFilters ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: showFilters ? "#a5b4fc" : "rgba(255,255,255,0.6)"
            }}>
            <SlidersHorizontal size={14} /> Filters
            {(industryFilter.length + riskFilter.length) > 0 && (
              <span className="w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                style={{ background: "#6366F1" }}>{industryFilter.length + riskFilter.length}</span>
            )}
          </button>
        </motion.div>

        {/* FILTER PANEL */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-5">
              <div className="rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-5"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>

                {/* Industry */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map(ind => (
                      <button key={ind} onClick={() => toggleArr(industryFilter, ind, setIndustryFilter)}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-150"
                        style={{
                          background: industryFilter.includes(ind) ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${industryFilter.includes(ind) ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: industryFilter.includes(ind) ? "#a5b4fc" : "rgba(255,255,255,0.45)"
                        }}>
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Risk Level</p>
                  <div className="flex flex-col gap-2">
                    {(["Low", "Medium", "High"] as const).map(r => (
                      <button key={r} onClick={() => toggleArr(riskFilter, r, setRiskFilter)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all duration-150 text-left"
                        style={{
                          background: riskFilter.includes(r) ? `${RISK_COLORS[r]}18` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${riskFilter.includes(r) ? `${RISK_COLORS[r]}40` : "rgba(255,255,255,0.08)"}`,
                          color: riskFilter.includes(r) ? RISK_COLORS[r] : "rgba(255,255,255,0.45)"
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: RISK_COLORS[r] }} />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ROI Range */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
                    Min ROI: <span className="text-indigo-400">{roiMin}%</span>
                  </p>
                  <input type="range" min={0} max={50} value={roiMin} onChange={e => setRoiMin(+e.target.value)}
                    className="w-full" />
                  <div className="flex justify-between text-[10px] text-white/25 mt-1">
                    <span>0%</span><span>50%</span>
                  </div>
                </div>

                {/* Investment Range */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
                    Max Investment: <span className="text-cyan-400">₹{invMax}K</span>
                  </p>
                  <input type="range" min={50} max={500} step={10} value={invMax} onChange={e => setInvMax(+e.target.value)}
                    className="w-full" />
                  <div className="flex justify-between text-[10px] text-white/25 mt-1">
                    <span>₹50K</span><span>₹500K</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DEALS GRID */}
        {paginated.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/30 text-lg font-semibold">No deals match your filters</p>
            <button onClick={() => { setQuery(""); setIndustryFilter([]); setRiskFilter([]); setRoiMin(0); setInvMax(500); }}
              className="mt-4 px-6 py-3 rounded-xl text-sm font-bold text-indigo-400 transition-colors hover:text-indigo-300"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div key={page} initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {paginated.map((d, i) => (
              <DealCard key={d.id} d={d} saved={saved.has(d.id)} onSave={() => toggleSave(d.id)} index={i} />
            ))}
          </motion.div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ChevronLeft size={15} className="text-white/60" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200"
                style={{
                  background: p === page ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p === page ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: p === page ? "#a5b4fc" : "rgba(255,255,255,0.4)"
                }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ChevronRight size={15} className="text-white/60" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}