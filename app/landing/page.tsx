"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";



import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap, BarChart2, ChevronRight, Star, Globe, Lock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

const STATS = [
  { value: "₹2.4Cr", label: "Total Capital Deployed" },
  { value: "340+", label: "Active Deals" },
  { value: "28.4%", label: "Avg. Investor ROI" },
  { value: "98%", label: "Portfolio Uptime" },
];

const FEATURES = [
  { icon: TrendingUp, color: "#6366F1", title: "AI Deal Scoring", desc: "Our engine ranks every deal by ROI potential, risk match, and industry fit — personalized for your profile." },
  { icon: Shield, color: "#22C55E", title: "Risk Analysis", desc: "Deep risk profiling with Low / Medium / High classification backed by live financial data." },
  { icon: BarChart2, color: "#06B6D4", title: "Live Dashboards", desc: "Real-time charts, portfolio health, and growth projections in one clean view." },
  { icon: Zap, color: "#F59E0B", title: "Instant Matching", desc: "Budget-aware deal recommendations delivered in milliseconds using memoized scoring." },
  { icon: Globe, color: "#A855F7", title: "Industry Coverage", desc: "From SaaS to FinTech, HealthTech to CleanEnergy — explore deals across every sector." },
  { icon: Lock, color: "#EF4444", title: "Secure Portfolio", desc: "Your investment data is encrypted and persisted locally — fully private by design." },
];

const TESTIMONIALS = [
  { name: "Aryan Shah", role: "Angel Investor", text: "The deal scoring engine is unlike anything I've used. Found 3 unicorn-potential startups in a week.", rating: 5 },
  { name: "Priya Mehta", role: "VC Partner", text: "Clean UI, fast filters, incredible charts. This is fintech done right.", rating: 5 },
  { name: "Ravi Kumar", role: "Startup Founder", text: "Got matched with 12 qualified investors within 48 hours. The platform just works.", rating: 5 },
];

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#080C14", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes glow-pulse { 0%,100%{opacity:.25} 50%{opacity:.55} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .shimmer-text {
          background: linear-gradient(90deg, #6366F1, #06B6D4, #22C55E, #6366F1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#080C14}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.4);border-radius:10px}
      `}</style>

      {/* ── AMBIENT ORBS ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.18),transparent 65%)", filter: "blur(90px)", animation: "glow-pulse 8s ease-in-out infinite" }} />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.14),transparent 65%)", filter: "blur(80px)", animation: "glow-pulse 10s ease-in-out infinite 2s" }} />
        <div className="absolute bottom-[-5%] left-[10%] w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(34,197,94,0.1),transparent 65%)", filter: "blur(80px)", animation: "glow-pulse 12s ease-in-out infinite 4s" }} />
        {/* grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── NAV ── */}
<nav className="relative z-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-5 gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", background: "rgba(8,12,20,0.7)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)" }}>
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">DealFlow<span className="text-indigo-400">.</span></span>
        </div>

   <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-medium text-white/50 md:flex-row">   
       {[
  { name: "Dashboard", path: "/dashboard" },
  { name: "Deals", path: "/deals" },
  { name: "Portfolio", path: "/investments" },
  { name: "Corporate", path: "/corporate" },
].map(item => (
  <Link
    key={item.name}
    href={item.path}
    className="hover:text-white/90 transition-colors duration-200"
  >
    {item.name}
  </Link>
))}
        </div>

        <div className="flex items-center gap-3">
           <button className="block text-[13px] font-semibold text-white/60 -white transition-colors px-4 py-2">Sign In</button>
          <button className="flex items-center gap-1.5 text-[13px] font-bold text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
            Get Started <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="px-6 md:px-10 pt-20 pb-24 max-w-screen-xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>

            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold mb-8"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                AI-Powered Investment Platform · Now Live
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Invest Smarter.<br />
              <span className="shimmer-text">Grow Faster.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10">
              DealFlow matches investors with high-potential startups using AI-driven scoring,
              real-time analytics, and frictionless portfolio management.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
  onClick={() => router.push("/deals")}
  className="flex items-center gap-2 text-base font-bold text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
  style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
>
  Explore Deals <ArrowRight size={16} />
</button>

<button
  onClick={() => router.push("/dashboard")}
  className="flex items-center gap-2 text-base font-semibold text-white/60 hover:text-white/90 px-8 py-4 rounded-2xl transition-all duration-200"
  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
>
  View Dashboard <ChevronRight size={16} />
</button>
            </motion.div>
          </motion.div>

          {/* ── HERO CARD PREVIEW ── */}
          <motion.div initial={{ opacity: 0, y: 60, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 mx-auto max-w-4xl rounded-3xl p-1"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(6,182,212,0.2),rgba(34,197,94,0.1))", boxShadow: "0 40px 120px rgba(99,102,241,0.25)" }}>
            <div className="rounded-[22px] p-6 md:p-8"
              style={{ background: "rgba(11,15,25,0.95)", backdropFilter: "blur(40px)" }}>

              {/* mini dashboard preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Portfolio Value", val: "₹12.4L", color: "#6366F1", up: true },
                  { label: "Active Deals", val: "24", color: "#22C55E", up: true },
                  { label: "Avg ROI", val: "31.2%", color: "#06B6D4", up: true },
                  { label: "Risk Score", val: "Low", color: "#F59E0B", up: false },
                ].map(({ label, val, color, up }) => (
                  <div key={label} className="rounded-xl p-3 text-left"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[9px] uppercase tracking-widest text-white/25 mb-1.5">{label}</p>
                    <p className="text-lg font-bold" style={{ color, fontFamily: "'DM Mono',monospace" }}>{val}</p>
                    {up && <div className="flex items-center gap-1 mt-1">
                      <div className="w-8 h-0.5 rounded" style={{ background: `${color}60` }} />
                      <div className="w-6 h-0.5 rounded" style={{ background: `${color}40` }} />
                      <div className="w-10 h-0.5 rounded" style={{ background: color }} />
                    </div>}
                  </div>
                ))}
              </div>

              {/* fake chart bars */}
              <div className="flex items-end gap-1.5 h-20 px-2">
                {[40, 55, 48, 70, 62, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      background: i === 11
                        ? "linear-gradient(180deg,#6366F1,#06B6D4)"
                        : `rgba(99,102,241,${0.15 + i * 0.05})`,
                      boxShadow: i === 11 ? "0 0 12px rgba(99,102,241,0.6)" : "none"
                    }} />
                ))}
              </div>
              <p className="text-[10px] text-white/20 mt-2 tracking-widest uppercase text-center">Investment Growth · 2024</p>
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="px-6 md:px-10 py-12 max-w-screen-xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i}
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'DM Mono',monospace" }}>{value}</p>
                <p className="text-[11px] text-white/35 font-medium uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section className="px-6 md:px-10 py-16 max-w-screen-xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">Platform Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Everything you need<br />
              <span className="text-white/30">to invest intelligently.</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl p-6 cursor-default relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left,${color}10,transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="px-6 md:px-10 py-16 max-w-screen-xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">Testimonials</p>
            <h2 className="text-4xl font-black text-white">Trusted by investors<br /><span className="text-white/30">across India.</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(({ name, role, text, rating }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array(rating).fill(0).map((_, j) => (
                    <Star key={j} size={12} fill="#F59E0B" stroke="none" />
                  ))}
                </div>
                <p className="text-[13px] text-white/60 leading-relaxed mb-5">"{text}"</p>
             <div className="flex items-center gap-3 justify-center">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.5),rgba(6,182,212,0.5))" }}>
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-[11px] text-white/35">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 md:px-10 py-20 max-w-screen-xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl p-1"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.4),rgba(6,182,212,0.3),rgba(34,197,94,0.15))" }}>
            <div className="rounded-[22px] py-16 px-8 text-center relative overflow-hidden"
              style={{ background: "rgba(10,14,24,0.9)" }}>
              <div className="absolute inset-0"
                style={{ backgroundImage: "radial-gradient(circle at 50% 0%,rgba(99,102,241,0.2),transparent 60%)" }} />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to grow<br />your portfolio?</h2>
                <p className="text-white/40 mb-8 max-w-md mx-auto text-base">Join thousands of smart investors using DealFlow to discover and track high-growth opportunities.</p>
                <button className="flex items-center gap-2 mx-auto text-base font-bold text-white px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", boxShadow: "0 8px 40px rgba(99,102,241,0.5)" }}>
                  Start Investing Free <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-6 md:px-10 py-8 max-w-screen-xl mx-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)" }}>
                <TrendingUp size={12} className="text-white" />
              </div>
              <span className="text-white/60 text-sm font-semibold">DealFlow</span>
            </div>
            <p className="text-[12px] text-white/25">© 2024 DealFlow. Built with precision for smart investors.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}