"use client";

import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#6366F1", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs"
      style={{
        background: "#111827",
        border: "1px solid rgba(99,102,241,0.3)",
        color: "#fff",
        fontFamily: "'Sora',sans-serif"
      }}>
      {label && <p className="text-white/40 mb-1 text-[10px]">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color ?? "#6366F1" }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ─── CUSTOM PIE LABEL ─────────────────────────────────────────────
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  if (percent < 0.07) return null;

  return (
    <text
      x={x}
      y={y}
      fill="rgba(255,255,255,0.5)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: 11, fontFamily: "'Sora',sans-serif", fontWeight: 600 }}
    >
      {name} · {(percent * 100).toFixed(0)}%
    </text>
  );
}

// ─── CHARTS ───────────────────────────────────────────────────────
export default function Charts({ industryData, roiData }) {
  const hasPie = Array.isArray(industryData) && industryData.length > 0;
  const hasLine = Array.isArray(roiData) && roiData.length > 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        flexWrap: "wrap",
        alignItems: "flex-start",
        fontFamily: "'Sora', sans-serif",
        width: "100%",
      }}
    >

      {/* ── PIE CHART ── */}
      {hasPie && (
        <div style={{ flex: "1", minWidth: 260 }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 12
          }}>
            Industry Distribution
          </p>

          {/* FIX: FORCE HEIGHT + WIDTH */}
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={45}
                  paddingAngle={3}
                  labelLine={false}
                  label={PieLabel}
                >
                  {industryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── LINE CHART ── */}
      {hasLine && (
        <div style={{ flex: "1.5", minWidth: 280 }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 12
          }}>
            ROI Growth
          </p>

          {/* FIX: FORCE HEIGHT */}
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}