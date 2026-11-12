import React, { useState } from 'react';
import type { InteractiveDiagramId } from '../types/study';
import { MathBlock } from './MathMarkdown';

export const InteractiveEngineeringDiagram: React.FC<{
  diagramId: InteractiveDiagramId;
}> = ({ diagramId }) => {
  if (diagramId === 'none') return null;

  switch (diagramId) {
    case 'mohr-circle-2d':
      return <MohrCircleLab />;
    case 'brayton-rankine-ts':
      return <BraytonRegenLab />;
    case 'laval-nozzle-mach':
      return <LavalNozzleLab />;
    case 'pump-npsh-curve':
      return <PumpNpshLab />;
    case 'fe-c-phase-diagram':
      return <FeCarbonLab />;
    case 'vibration-transmissibility':
      return <VibrationLab />;
    case 'three-phase-phasor':
      return <PowerFactorLab />;
    case 'mit-kloss-torque':
      return <KlossTorqueLab />;
    case 'bode-margins':
      return <BodeMarginsLab />;
    case 'buck-boost-pwm':
      return <BuckBoostLab />;
    case 'fortescue-faults':
      return <FortescueFaultLab />;
    default:
      return null;
  }
};

const MohrCircleLab: React.FC = () => {
  const [sx, setSx] = useState(200);
  const [sy, setSy] = useState(100);
  const [txy, setTxy] = useState(50);
  const [syYield, setSyYield] = useState(360);

  const avg = (sx + sy) / 2;
  const radius = Math.sqrt(Math.pow((sx - sy) / 2, 2) + txy * txy);
  const s1 = avg + radius;
  const s2 = avg - radius;
  const s3 = 0; // Plane stress out-of-plane principal stress
  const principals = [s1, s2, s3].sort((a, b) => b - a);
  const tauAbsMax = (principals[0] - principals[2]) / 2;
  const vonMises = Math.sqrt(sx * sx - sx * sy + sy * sy + 3 * txy * txy);
  const sfMises = syYield / Math.max(vonMises, 0.1);
  const sfTresca = syYield / Math.max(principals[0] - principals[2], 0.1);

  // Map stresses [-200..400] onto SVG [20..300]
  const mapX = (s: number) => 110 + (s / 320) * 140;
  const mapY = (t: number) => 110 - (t / 320) * 140;
  const cx = mapX(avg);
  const cy = 110;
  const rPx = (radius / 320) * 140;

  return (
    <div className="dream-card-soft p-5 my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFE4EA] text-[#1E1B4B]">
            Laboratório Interativo — Círculo de Mohr & Falha
          </span>
          <h4 className="font-display font-bold text-lg mt-1">
            Estado Plano de Tensões + Critérios von Mises e Tresca
          </h4>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            sfMises >= 1.2
              ? 'bg-[#86EFAC] text-[#1E1B4B]'
              : sfMises >= 1.0
                ? 'bg-[#FDE047] text-[#1E1B4B]'
                : 'bg-[#F87171] text-white'
          }`}
        >
          n (von Mises) = {sfMises.toFixed(2)} | n (Tresca) = {sfTresca.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 320 220" className="w-full bg-white rounded-xl border border-[#FFB7C5]">
          <line x1="15" y1="110" x2="305" y2="110" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="110" y1="15" x2="110" y2="205" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="290" y="104" fontSize="10" fill="#1E1B4B" fontWeight="700">σ</text>
          <text x="114" y="24" fontSize="10" fill="#1E1B4B" fontWeight="700">τ</text>

          {/* Mohr Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={Math.max(2, rPx)}
            fill="rgba(255, 183, 197, 0.25)"
            stroke="#E86A8D"
            strokeWidth="2.5"
          />
          {/* Diameter line from (sx, -txy) to (sy, +txy) */}
          <line
            x1={mapX(sx)}
            y1={mapY(-txy)}
            x2={mapX(sy)}
            y2={mapY(txy)}
            stroke="#1E1B4B"
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />
          <circle cx={mapX(sx)} cy={mapY(-txy)} r="4" fill="#1D4ED8" />
          <circle cx={mapX(sy)} cy={mapY(txy)} r="4" fill="#15803D" />
          <circle cx={mapX(s1)} cy={cy} r="4.5" fill="#F87171" />
          <circle cx={mapX(s2)} cy={cy} r="4.5" fill="#F87171" />
          <text x={mapX(s1) + 4} y={cy - 6} fontSize="10" fill="#1E1B4B" fontWeight="700">
            σ₁={s1.toFixed(0)}
          </text>
          <text x={mapX(s2) - 24} y={cy + 14} fontSize="10" fill="#1E1B4B" fontWeight="700">
            σ₂={s2.toFixed(0)}
          </text>
        </svg>

        <div className="space-y-3 text-sm">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Tensão σₓ (MPa)</span>
              <span className="font-mono">{sx} MPa</span>
            </label>
            <input type="range" min={-100} max={300} value={sx} onChange={(e) => setSx(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Tensão σᵧ (MPa)</span>
              <span className="font-mono">{sy} MPa</span>
            </label>
            <input type="range" min={-100} max={300} value={sy} onChange={(e) => setSy(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Cisalhamento τₓᵧ (MPa)</span>
              <span className="font-mono">{txy} MPa</span>
            </label>
            <input type="range" min={-150} max={150} value={txy} onChange={(e) => setTxy(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Limite Escoamento Sᵧ (MPa)</span>
              <span className="font-mono">{syYield} MPa</span>
            </label>
            <input type="range" min={200} max={550} step={10} value={syYield} onChange={(e) => setSyYield(Number(e.target.value))} className="w-full accent-[#1E1B4B]" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono bg-white p-2.5 rounded-xl border border-[#FFB7C5]">
            <div>σ_v (von Mises): <b>{vonMises.toFixed(1)} MPa</b></div>
            <div>τ_max,abs (3D): <b>{tauAbsMax.toFixed(1)} MPa</b></div>
            <div>σ₁: <b>{s1.toFixed(1)} MPa</b></div>
            <div>σ₂: <b>{s2.toFixed(1)} MPa</b></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BraytonRegenLab: React.FC = () => {
  const [rp, setRp] = useState(8);
  const [t3, setT3] = useState(1200);
  const t1 = 300;
  const k = 1.4;
  const exp = (k - 1) / k;

  const etaSimple = 1 - 1 / Math.pow(rp, exp);
  const etaRegen = 1 - (t1 / t3) * Math.pow(rp, exp);
  const rpCrit = Math.pow(t3 / t1, k / (2 * (k - 1)));
  const t2 = t1 * Math.pow(rp, exp);
  const t4 = t3 / Math.pow(rp, exp);
  const regenHelpful = rp < rpCrit;

  // Build curve points for rp = 2..24
  const pointsSimple: string[] = [];
  const pointsRegen: string[] = [];
  for (let r = 2; r <= 24; r += 1) {
    const x = 35 + ((r - 2) / 22) * 260;
    const eS = 1 - 1 / Math.pow(r, exp);
    const eR = 1 - (t1 / t3) * Math.pow(r, exp);
    pointsSimple.push(`${x.toFixed(1)},${(190 - eS * 180).toFixed(1)}`);
    pointsRegen.push(`${x.toFixed(1)},${(190 - Math.max(0, eR) * 180).toFixed(1)}`);
  }

  return (
    <div className="dream-card-soft p-5 my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFE4EA]">
            Laboratório Interativo — Ciclo Brayton
          </span>
          <h4 className="font-display font-bold text-lg mt-1">
            Eficiência Térmica: Simples vs. Regenerativo (Critério Cebraspe)
          </h4>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${regenHelpful ? 'bg-[#86EFAC]' : 'bg-[#F87171] text-white'}`}>
          {regenHelpful ? 'Regenerador AUMENTA eficiência' : 'Regenerador PREJUDICA (T₂ > T₄)'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 320 210" className="w-full bg-white rounded-xl border border-[#FFB7C5]">
          <line x1="35" y1="15" x2="35" y2="190" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="35" y1="190" x2="300" y2="190" stroke="#94A3B8" strokeWidth="1.5" />
          <polyline fill="none" stroke="#1D4ED8" strokeWidth="2.5" points={pointsSimple.join(' ')} />
          <polyline fill="none" stroke="#E86A8D" strokeWidth="2.5" points={pointsRegen.join(' ')} />
          <line
            x1={35 + ((rp - 2) / 22) * 260}
            y1="15"
            x2={35 + ((rp - 2) / 22) * 260}
            y2="190"
            stroke="#1E1B4B"
            strokeDasharray="4 3"
          />
          <text x="45" y="25" fontSize="10" fill="#1D4ED8" fontWeight="700">━ Simples</text>
          <text x="115" y="25" fontSize="10" fill="#E86A8D" fontWeight="700">━ Regenerativo</text>
          <text x="240" y="203" fontSize="10" fill="#1E1B4B">r_p (2 → 24)</text>
        </svg>

        <div className="space-y-3 text-sm">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Razão de Pressões (rₚ)</span>
              <span className="font-mono">{rp}</span>
            </label>
            <input type="range" min={2} max={24} step={1} value={rp} onChange={(e) => setRp(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Temp. Máxima Turbina T₃ (K)</span>
              <span className="font-mono">{t3} K</span>
            </label>
            <input type="range" min={900} max={1600} step={50} value={t3} onChange={(e) => setT3(Number(e.target.value))} className="w-full accent-[#1D4ED8]" />
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#FFB7C5] font-mono text-xs space-y-1">
            <div>η_simples = <b>{(etaSimple * 100).toFixed(1)}%</b> | η_regen = <b>{(etaRegen * 100).toFixed(1)}%</b></div>
            <div>r_p crítico = <b>{rpCrit.toFixed(2)}</b> (T₁ = 300 K, k = 1,4)</div>
            <div>T₂ (saída comp.) = <b>{t2.toFixed(0)} K</b> | T₄ (exaustão turb.) = <b>{t4.toFixed(0)} K</b></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LavalNozzleLab: React.FC = () => {
  const [pbRatio, setPbRatio] = useState(0.42);
  const choked = pbRatio <= 0.85;
  const hasNormalShock = pbRatio > 0.25 && pbRatio < 0.85;
  const shockPos = hasNormalShock ? 52 + ((0.85 - pbRatio) / 0.6) * 35 : 92;

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E0F2FE]">
        Laboratório Interativo — Bocal Convergente-Divergente de Laval
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Bloqueio Sônico (P*/P₀ ≈ 0,528) e Onda de Choque Normal
      </h4>
      <svg viewBox="0 0 360 130" className="w-full bg-white rounded-xl border border-[#93C5FD] mb-3">
        {/* Nozzle wall */}
        <path d="M 20 15 Q 110 42 150 45 L 340 20" stroke="#1E1B4B" strokeWidth="3" fill="none" />
        <path d="M 20 115 Q 110 88 150 85 L 340 110" stroke="#1E1B4B" strokeWidth="3" fill="none" />
        {/* Throat */}
        <line x1="150" y1="45" x2="150" y2="85" stroke="#94A3B8" strokeDasharray="3 3" />
        <text x="132" y="102" fontSize="9" fill="#1E1B4B" fontWeight="700">
          Garganta {choked ? '(M=1)' : '(M<1)'}
        </text>
        {/* Shock wave line */}
        {hasNormalShock && (
          <g>
            <line
              x1={150 + ((shockPos - 45) / 55) * 185}
              y1="30"
              x2={150 + ((shockPos - 45) / 55) * 185}
              y2="100"
              stroke="#F87171"
              strokeWidth="3.5"
            />
            <text
              x={155 + ((shockPos - 45) / 55) * 185}
              y="26"
              fontSize="9"
              fill="#B91C1C"
              fontWeight="700"
            >
              Choque Normal (M₁&gt;1 → M₂&lt;1)
            </text>
          </g>
        )}
        <text x="25" y="68" fontSize="10" fill="#1D4ED8" fontWeight="700">Subsônico (M&lt;1)</text>
        <text x="175" y="68" fontSize="10" fill={choked ? '#15803D' : '#64748B'} fontWeight="700">
          {pbRatio <= 0.25 ? 'Supersônico Puro (M>1)' : hasNormalShock ? 'Supersônico → Choque → Subsônico' : 'Subsônico Venturi'}
        </text>
      </svg>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
        <div className="flex-1">
          <label className="flex justify-between font-semibold">
            <span>Razão de Contrapressão (P_b / P₀)</span>
            <span className="font-mono">{pbRatio.toFixed(2)}</span>
          </label>
          <input type="range" min={0.10} max={0.95} step={0.01} value={pbRatio} onChange={(e) => setPbRatio(Number(e.target.value))} className="w-full accent-[#1D4ED8]" />
        </div>
        <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#93C5FD]">
          Para ar (k=1,4): P*/P₀ = 0,528. No choque normal: P₂&gt;P₁, T₂&gt;T₁ e P₀₂&lt;P₀₁ (↑entropia).
        </div>
      </div>
    </div>
  );
};

const PumpNpshLab: React.FC = () => {
  const [zs, setZs] = useState(2.5);
  const [tempC, setTempC] = useState(40);
  const pvKpa = 0.611 * Math.exp((17.27 * tempC) / (tempC + 237.3));
  const rhoG = 9.75; // kN/m^3 approx
  const patmKpa = 101.3;
  const hfSucc = 1.2;
  const npshReq = 3.8;
  const npshDisp = (patmKpa - pvKpa) / rhoG - zs - hfSucc;
  const cavitating = npshDisp < npshReq + 0.5;

  return (
    <div className="dream-card-soft p-5 my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DCFCE7]">
            Laboratório Interativo — Máquinas de Fluxo & API 610
          </span>
          <h4 className="font-display font-bold text-lg mt-1">
            Monitor de Cavitação: NPSH Disponível vs. Requerido
          </h4>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${cavitating ? 'bg-[#F87171] text-white' : 'bg-[#86EFAC]'}`}>
          {cavitating ? 'ALERTA: Risco de Cavitação!' : 'Operação Segura sem Cavitação'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Altura de Sucção Negativa zₛ (m)</span>
              <span className="font-mono">{zs.toFixed(1)} m</span>
            </label>
            <input type="range" min={-3} max={7} step={0.2} value={zs} onChange={(e) => setZs(Number(e.target.value))} className="w-full accent-[#15803D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Temperatura da Água (°C)</span>
              <span className="font-mono">{tempC} °C (Pᵥ = {pvKpa.toFixed(1)} kPa)</span>
            </label>
            <input type="range" min={15} max={95} step={5} value={tempC} onChange={(e) => setTempC(Number(e.target.value))} className="w-full accent-[#F87171]" />
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#86EFAC] font-mono text-xs space-y-1.5">
          <div>NPSH_disp = <b>{npshDisp.toFixed(2)} m</b></div>
          <div>NPSH_req (bomba) = <b>{npshReq.toFixed(2)} m</b> (+ 0,5 m margem API)</div>
          <div className="text-[#1E1B4B] opacity-80">
            Margem real: <b>{(npshDisp - npshReq).toFixed(2)} m</b>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeCarbonLab: React.FC = () => {
  const [carbon, setCarbon] = useState(0.77);
  const [temp, setTemp] = useState(750);

  let micro = 'Ferrita (α) + Perlita (hipoeutetóide)';
  if (temp >= 912) micro = 'Austenita (γ — estrutura CFC)';
  else if (temp >= 727 && carbon <= 1.2) micro = 'Região Bifásica γ + α ou γ + Fe₃C (Austenitização parcial)';
  else if (Math.abs(carbon - 0.77) < 0.05 && temp < 727) micro = '100% Perlita Lamelar (α + Fe₃C — Eutetóide)';
  else if (carbon > 0.77 && carbon <= 2.11 && temp < 727) micro = 'Perlita + Cementita Proeutetóide (hipereutetóide)';
  else if (carbon > 2.11) micro = 'Ferro Fundido (Ledeburita / Grafita + Matriz)';

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FEF3C7]">
        Laboratório Interativo — Diagrama Fe-Fe₃C
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Explorador de Fases em Equilíbrio (Ponto Eutetóide: 0,77% C a 727 °C)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Teor de Carbono (%C)</span>
              <span className="font-mono">{carbon.toFixed(2)}% C</span>
            </label>
            <input type="range" min={0.05} max={4.3} step={0.02} value={carbon} onChange={(e) => setCarbon(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Temperatura (°C)</span>
              <span className="font-mono">{temp} °C</span>
            </label>
            <input type="range" min={400} max={1200} step={5} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full accent-[#F87171]" />
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#FFB7C5] space-y-1.5">
          <div className="text-xs font-bold uppercase text-[#64748B]">Microestrutura Predominante</div>
          <div className="font-display font-bold text-base text-[#1E1B4B]">{micro}</div>
          <div className="text-xs text-[#475569]">
            Resfriamento rápido além da curva crítica CCT suprime difusão e gera <b>Martensita (TCC)</b>.
          </div>
        </div>
      </div>
    </div>
  );
};

const VibrationLab: React.FC = () => {
  const [zeta, setZeta] = useState(0.2);
  const pts: string[] = [];
  for (let i = 1; i <= 60; i++) {
    const r = (i / 60) * 3.0;
    const num = Math.sqrt(1 + Math.pow(2 * zeta * r, 2));
    const den = Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * zeta * r, 2));
    const tr = Math.min(4.0, num / Math.max(den, 0.05));
    const x = 35 + (r / 3.0) * 265;
    const y = 185 - (tr / 4.0) * 165;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const sqrt2X = 35 + (Math.SQRT2 / 3.0) * 265;
  const tr1Y = 185 - (1 / 4.0) * 165;

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFE4EA]">
        Laboratório Interativo — Vibrações & Isolamento
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Transmissibilidade Tᵣ vs. Razão de Frequências (ω / ωₙ)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 320 205" className="w-full bg-white rounded-xl border border-[#FFB7C5]">
          <line x1="35" y1="15" x2="35" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="35" y1="185" x2="305" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="35" y1={tr1Y} x2="305" y2={tr1Y} stroke="#15803D" strokeDasharray="4 3" />
          <line x1={sqrt2X} y1="15" x2={sqrt2X} y2="185" stroke="#F87171" strokeDasharray="4 3" />
          <polyline fill="none" stroke="#1E1B4B" strokeWidth="2.5" points={pts.join(' ')} />
          <text x={sqrt2X + 4} y="26" fontSize="9" fill="#B91C1C" fontWeight="700">√2 ≈ 1,414</text>
          <text x="40" y={tr1Y - 4} fontSize="9" fill="#15803D" fontWeight="700">Tᵣ = 1 (Isolamento abaixo)</text>
        </svg>
        <div className="space-y-3 text-sm">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Fator de Amortecimento (ζ)</span>
              <span className="font-mono">{zeta.toFixed(2)}</span>
            </label>
            <input type="range" min={0.05} max={1.0} step={0.05} value={zeta} onChange={(e) => setZeta(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <p className="text-xs leading-relaxed bg-white p-3 rounded-xl border border-[#FFB7C5]">
            <b>Regra de Ouro Petrobras/Cesgranrio:</b> todas as curvas passam exatamente pelo ponto <code className="font-mono">(ω/ωₙ = √2, Tᵣ = 1)</code>.
            Para isolar vibrações (<code className="font-mono">Tᵣ &lt; 1</code>), opere com <code className="font-mono">ω/ωₙ &gt; √2</code> — e note que aumentar ζ <b>piora</b> o isolamento nessa região!
          </p>
        </div>
      </div>
    </div>
  );
};

const PowerFactorLab: React.FC = () => {
  const [pKw, setPKw] = useState(1200);
  const [fp1, setFp1] = useState(0.60);
  const [fp2, setFp2] = useState(0.92);

  const th1 = Math.acos(fp1);
  const th2 = Math.acos(fp2);
  const q1 = pKw * Math.tan(th1);
  const q2 = pKw * Math.tan(th2);
  const qc = Math.max(0, q1 - q2);

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DBEAFE]">
        Laboratório Interativo — Triângulo de Potências
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Dimensionamento de Banco de Capacitores: Q_C = P(tan θ₁ − tan θ₂)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Potência Ativa P (kW)</span>
              <span className="font-mono">{pKw} kW</span>
            </label>
            <input type="range" min={200} max={2500} step={50} value={pKw} onChange={(e) => setPKw(Number(e.target.value))} className="w-full accent-[#1D4ED8]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>FP Inicial (cos θ₁)</span>
              <span className="font-mono">{fp1.toFixed(2)}</span>
            </label>
            <input type="range" min={0.5} max={0.90} step={0.02} value={fp1} onChange={(e) => setFp1(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>FP Desejado (cos θ₂)</span>
              <span className="font-mono">{fp2.toFixed(2)}</span>
            </label>
            <input type="range" min={0.85} max={0.99} step={0.01} value={fp2} onChange={(e) => setFp2(Number(e.target.value))} className="w-full accent-[#15803D]" />
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#93C5FD] font-mono text-xs space-y-1.5">
          <div>Q₁ (original) = <b>{q1.toFixed(1)} kVAr</b></div>
          <div>Q₂ (final) = <b>{q2.toFixed(1)} kVAr</b></div>
          <div className="text-sm text-[#1D4ED8] pt-1">Banco Q_C = <b>{qc.toFixed(1)} kVAr</b></div>
          <div>Redução de S: <b>{(pKw / fp1).toFixed(0)} → {(pKw / fp2).toFixed(0)} kVA</b></div>
        </div>
      </div>
    </div>
  );
};

const KlossTorqueLab: React.FC = () => {
  const [r2Scale, setR2Scale] = useState(1.0);
  const rth = 0.25;
  const xTotal = 1.6;
  const r2Base = 0.28 * r2Scale;

  const pts: string[] = [];
  for (let i = 1; i <= 50; i++) {
    const s = 1.0 - (i / 50) * 0.99; // 1 down to 0.01
    const torque = (r2Base / s) / (Math.pow(rth + r2Base / s, 2) + xTotal * xTotal);
    const normT = torque * 4.2;
    const x = 30 + (1 - s) * 260;
    const y = 185 - Math.min(165, normT * 145);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const sMax = r2Base / Math.sqrt(rth * rth + xTotal * xTotal);

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DBEAFE]">
        Laboratório Interativo — Motor de Indução Trifásico
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Curva Conjugado × Velocidade (Equação de Kloss)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 310 205" className="w-full bg-white rounded-xl border border-[#93C5FD]">
          <line x1="30" y1="15" x2="30" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="30" y1="185" x2="295" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
          <polyline fill="none" stroke="#1D4ED8" strokeWidth="2.8" points={pts.join(' ')} />
          <text x="35" y="198" fontSize="9" fill="#1E1B4B">s=1 (Partida)</text>
          <text x="245" y="198" fontSize="9" fill="#1E1B4B">s=0 (Síncrona)</text>
        </svg>
        <div className="space-y-3 text-sm">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Resistência Rotórica R'₂ (fator)</span>
              <span className="font-mono">{r2Scale.toFixed(2)}×</span>
            </label>
            <input type="range" min={0.5} max={4.0} step={0.1} value={r2Scale} onChange={(e) => setR2Scale(Number(e.target.value))} className="w-full accent-[#1D4ED8]" />
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#93C5FD] text-xs font-mono space-y-1">
            <div>s_max (conjugado máximo): <b>{(sMax * 100).toFixed(1)}%</b></div>
            <div className="font-sans text-[#334155]">
              Observe que aumentar R'₂ desloca <b>s_max</b> para a esquerda (elevando o torque de partida), mantendo <b>T_max invariante</b>!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BodeMarginsLab: React.FC = () => {
  const [gainK, setGainK] = useState(4.0);
  // G(s) = K / (s(s+1)(s+4)) => phase = -90 - atan(w) - atan(w/4)
  // w_pi: atan(w) + atan(w/4) = 90 -> w^2 = 4 -> w_pi = 2 rad/s; |G(j2)| = K / (2 * sqrt(5) * sqrt(20)) = K / 20
  const magAtWpi = gainK / 20;
  const gmDb = -20 * Math.log10(magAtWpi);
  const stable = gainK < 20;

  return (
    <div className="dream-card-soft p-5 my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EDE9FE]">
            Laboratório Interativo — Estabilidade em Frequência
          </span>
          <h4 className="font-display font-bold text-lg mt-1">
            Margem de Ganho (MG) para G(s) = K / [s(s+1)(s+4)]
          </h4>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${stable ? 'bg-[#86EFAC]' : 'bg-[#F87171] text-white'}`}>
          {stable ? 'Malha Fechada Estável (MG > 0 dB)' : 'INSTÁVEL (K ≥ 20)'}
        </span>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <label className="flex justify-between font-semibold">
            <span>Ganho Proporcional K</span>
            <span className="font-mono">K = {gainK.toFixed(1)}</span>
          </label>
          <input type="range" min={1} max={30} step={0.5} value={gainK} onChange={(e) => setGainK(Number(e.target.value))} className="w-full accent-[#1E1B4B]" />
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#FFB7C5] font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>ω_π (fase −180°): <b>2,00 rad/s</b></div>
          <div>|G(jω_π)|: <b>{magAtWpi.toFixed(3)}</b></div>
          <div>Margem Ganho: <b>{gmDb.toFixed(2)} dB</b></div>
        </div>
      </div>
    </div>
  );
};

const BuckBoostLab: React.FC = () => {
  const [duty, setDuty] = useState(0.4);
  const [vin, setVin] = useState(24);
  const vBuck = duty * vin;
  const vBoost = vin / (1 - duty);
  const vBuckBoost = -(duty / (1 - duty)) * vin;

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DBEAFE]">
        Laboratório Interativo — Conversores CC-CC em CCM
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Modulação PWM (Razão Cíclica D = t_on / T_s)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3">
          <div>
            <label className="flex justify-between font-semibold">
              <span>Duty Cycle (D)</span>
              <span className="font-mono">{(duty * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min={0.1} max={0.85} step={0.05} value={duty} onChange={(e) => setDuty(Number(e.target.value))} className="w-full accent-[#1D4ED8]" />
          </div>
          <div>
            <label className="flex justify-between font-semibold">
              <span>Tensão Entrada V_in (V)</span>
              <span className="font-mono">{vin} V</span>
            </label>
            <input type="range" min={12} max={120} step={12} value={vin} onChange={(e) => setVin(Number(e.target.value))} className="w-full accent-[#E86A8D]" />
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#93C5FD] font-mono text-xs space-y-1.5">
          <div>Buck (V = D·V_in): <b>{vBuck.toFixed(1)} V</b></div>
          <div>Boost (V = V_in/(1−D)): <b>{vBoost.toFixed(1)} V</b></div>
          <div>Buck-Boost (V = −D·V_in/(1−D)): <b>{vBuckBoost.toFixed(1)} V</b></div>
        </div>
      </div>
    </div>
  );
};

const FortescueFaultLab: React.FC = () => {
  const [fault, setFault] = useState<'3ph' | '1ph' | '2ph' | '2phg'>('1ph');
  const z1 = 0.2;
  const z2 = 0.2;
  const z0 = 0.1;
  const vf = 1.0;

  const icc3 = vf / z1; // 5.0 pu
  const icc1 = (3 * vf) / (z1 + z2 + z0); // 6.0 pu
  const icc2 = (Math.sqrt(3) * vf) / (z1 + z2); // 4.33 pu
  const zPar = (z2 * z0) / (z2 + z0);
  const ia1_2g = vf / (z1 + zPar);

  const infoMap = {
    '3ph': {
      title: 'Curto Trifásico Simétrico (3φ)',
      topology: 'Apenas rede de Sequência Positiva excitada (I_a2 = I_a0 = 0).',
      formula: String.raw`I_{cc,3\phi} = \frac{V_f}{Z_1} = ${icc3.toFixed(2)}\text{ p.u.}`,
    },
    '1ph': {
      title: 'Curto Monofásico Fase-Terra (a-g)',
      topology: 'Redes Positiva, Negativa e Zero conectadas em SÉRIE (I_a1 = I_a2 = I_a0).',
      formula: String.raw`I_{cc,1\phi} = \frac{3 V_f}{Z_1 + Z_2 + Z_0} = ${icc1.toFixed(2)}\text{ p.u. (> } I_{cc,3\phi}\text{ quando } Z_0 < Z_1\text{)}`,
    },
    '2ph': {
      title: 'Curto Bifásico Isolado (b-c)',
      topology: 'Redes Positiva e Negativa em PARALELO; Sequência Zero aberta (I_a0 = 0).',
      formula: String.raw`I_{cc,2\phi} = \frac{\sqrt{3} V_f}{Z_1 + Z_2} = ${icc2.toFixed(2)}\text{ p.u.}`,
    },
    '2phg': {
      title: 'Curto Bifásico-Terra (b-c-g)',
      topology: 'Três redes conectadas em PARALELO pleno nos terminais de falta.',
      formula: String.raw`I_{a1} = \frac{V_f}{Z_1 + (Z_2 \parallel Z_0)} = ${ia1_2g.toFixed(2)}\text{ p.u.}`,
    },
  };

  const active = infoMap[fault];

  return (
    <div className="dream-card-soft p-5 my-4">
      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DBEAFE]">
        Laboratório Interativo — Componentes Simétricas (Fortescue)
      </span>
      <h4 className="font-display font-bold text-lg mt-1 mb-3">
        Topologia das Redes de Sequência por Tipo de Falta (Z₁=j0,20; Z₂=j0,20; Z₀=j0,10 p.u.)
      </h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {(['3ph', '1ph', '2ph', '2phg'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFault(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              fault === f
                ? 'bg-[#1E1B4B] text-white'
                : 'bg-white border border-[#93C5FD] text-[#1E1B4B] hover:bg-[#EFF6FF]'
            }`}
          >
            {infoMap[f].title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded-xl border border-[#93C5FD] space-y-2 text-sm">
        <div className="font-bold text-[#1E1B4B]">{active.topology}</div>
        <MathBlock latex={active.formula} />
      </div>
    </div>
  );
};
