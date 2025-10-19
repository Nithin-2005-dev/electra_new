// app/loading.tsx
"use client";

export default function Loading() {
  return (
    <div id="electra-loading-overlay" className="em-overlay" role="status" aria-live="polite" aria-label="Electra is loading">
      <style jsx global>{`
        /* Ensure root elements can host fixed overlays properly */
        html, body, #__next, #root {
          min-height: 100%;
          height: auto;
        }
      `}</style>

      <style jsx>{`
        :root { --c1:#14f7ff; --c2:#00b8d9; --panel:#0b1420; }

        /* Full-viewport, hardened dimensions */
        .em-overlay {
          position: fixed;
          left: 0; top: 0; right: 0; bottom: 0;   /* avoid rounding from inset on some browsers */
          width: 100vw !important;
          height: 100vh !important;               /* fallback */
          height: 100svh !important;              /* small viewport */
          height: 100dvh !important;              /* dynamic viewport */
          z-index: 2147483646;                    /* just below max for safety */
          display: grid;
          align-items: center;
          justify-items: center;
          background: transparent;
          pointer-events: auto;
          isolation: isolate;                     /* own stacking context */
          /* Guard against parent transforms/clipping */
          transform: none !important;
          contain: layout paint size;             /* avoid accidental overflow influence */
        }

        /* Explicit stacking fix: push footer below overlay if it has high z-index */
        :global(footer), :global([data-role="footer"]) {
          z-index: 1 !important;
        }

        .stage {
          position: relative;
          width: clamp(160px, 28vw, 360px);
          aspect-ratio: 1;
          filter: drop-shadow(0 0 22px rgba(20,247,255,.35));
          z-index: 2;
        }

        .halo { position:absolute; inset:-18%; border-radius:50%;
          background:
            radial-gradient(45% 45% at 50% 50%, rgba(20,247,255,.14), transparent 60%),
            radial-gradient(70% 70% at 50% 70%, rgba(0,184,217,.10), transparent 70%);
          filter: blur(28px); animation: haloPulse 3.6s ease-in-out infinite; pointer-events:none; }

        .stator { position:absolute; inset:0; border-radius:50%;
          background:
            radial-gradient(closest-side, rgba(20,247,255,.18), transparent 68%),
            conic-gradient(from 0deg,
              rgba(20,247,255,.22) 0 20deg, transparent 20deg 40deg,
              rgba(0,184,217,.22) 40deg 60deg, transparent 60deg 80deg,
              rgba(20,247,255,.22) 80deg 100deg, transparent 100deg 120deg,
              rgba(0,184,217,.22) 120deg 140deg, transparent 140deg 160deg,
              rgba(20,247,255,.22) 160deg 180deg, transparent 180deg 200deg,
              rgba(0,184,217,.22) 200deg 220deg, transparent 220deg 240deg,
              rgba(20,247,255,.22) 240deg 260deg, transparent 260deg 280deg,
              rgba(0,184,217,.22) 280deg 300deg, transparent 300deg 320deg,
              rgba(20,247,255,.22) 320deg 340deg, transparent 340deg 360deg);
          mask: radial-gradient(farthest-side, transparent 48%, #000 49%);
          animation: ripple 2.6s ease-in-out infinite; }

        .plasma { position:absolute; inset:8%; border-radius:50%;
          background:
            conic-gradient(from 0deg,
              rgba(20,247,255,0) 0 20%,
              rgba(20,247,255,.25) 21% 23%,
              rgba(0,184,217,.18) 24% 26%,
              rgba(20,247,255,0) 27% 100%);
          filter: blur(8px); animation: slowSpin 6s linear infinite reverse; opacity:.85; pointer-events:none; }

        .dots, .dots2 { position:absolute; inset:0; border-radius:50%;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.35), transparent 60%),
            radial-gradient(2px 2px at 70% 60%, rgba(255,255,255,.25), transparent 60%),
            radial-gradient(2px 2px at 45% 80%, rgba(255,255,255,.2), transparent 60%),
            radial-gradient(2px 2px at 85% 25%, rgba(255,255,255,.25), transparent 60%);
          mask: radial-gradient(farthest-side, transparent 30%, #000 31%);
          opacity:.25; animation: drift 7s ease-in-out infinite alternate; pointer-events:none; }
        .dots2 { animation-duration: 9s; opacity:.18; }

        .rotor { position:absolute; inset:0; margin:auto; width:56%; height:56%; border-radius:50%;
          background:
            radial-gradient(75% 75% at 50% 40%, rgba(255,255,255,.14), rgba(20,247,255,.18) 58%, var(--panel) 92%),
            radial-gradient(60% 60% at 50% 70%, rgba(0,184,217,.12), transparent 70%);
          border:1px solid rgba(141,255,255,.4); box-shadow: inset 0 0 32px rgba(0,255,255,.18);
          animation: spinup 1100ms cubic-bezier(.65,0,.35,1) 0s 1, spin 1.05s linear infinite 1.1s; }

        .teeth { position:absolute; inset:0; border-radius:50%;
          background: conic-gradient(from 0deg, rgba(255,255,255,.24) 0 6deg, transparent 6deg 12deg);
          mask: radial-gradient(farthest-side, transparent 38%, #000 39%);
          animation: spin 1.05s linear infinite 1.1s; }

        .arc, .arcAfter { position:absolute; inset:0; border-radius:50%;
          mask: radial-gradient(farthest-side, transparent 62%, #000 63%); opacity:0; }
        .arc { background: conic-gradient(from 90deg, transparent 0 78%, var(--c1) 78% 82%, transparent 82% 100%);
          filter: blur(1px); animation: arcFlash 1200ms ease-out 180ms 1, arcPulse 3.2s ease-in-out 1.6s infinite; }
        .arcAfter { background: conic-gradient(from 90deg, transparent 0 78%, rgba(20,247,255,.28) 78% 82%, transparent 82% 100%);
          filter: blur(6px); animation: arcAfter 1400ms ease-out 240ms 1, arcPulseSoft 4.2s ease-in-out 1.8s infinite; }

        .orbit { position:absolute; inset:0; border-radius:50%; pointer-events:none; }
        .orbit .e { position:absolute; top:50%; left:50%; width:8px; height:8px; border-radius:50%;
          background: radial-gradient(circle, #ffffff 0 40%, var(--c1) 60%, transparent 100%);
          box-shadow: 0 0 10px var(--c1), 0 0 18px var(--c2);
          transform: translate(-50%, -50%) rotate(0deg) translateX(var(--r)); }
        .o1 { animation: orbit 3.6s linear infinite; } .o1 .e { --r:34%; }
        .o2 { animation: orbit 5.2s linear infinite reverse; } .o2 .e { --r:44%; }
        .o3 { animation: orbit 7.3s linear infinite; } .o3 .e { --r:52%; }

        .sheen { position:absolute; inset:-10% -40%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,.22) 45%, transparent 90%);
          transform: skewX(-12deg); filter: blur(2px);
          animation: sweep 1600ms ease-out 420ms forwards, sweepLoop 6.6s ease-in-out 2.4s infinite; opacity:0; }

        .brand { margin-top: clamp(10px, 2.2vh, 18px); text-align:center; font-weight:900; letter-spacing:.18em;
          text-transform:uppercase; font-size:clamp(12px, 1.9vw, 14px);
          background: linear-gradient(90deg, #a6faff, #eaffff, #a6faff);
          -webkit-background-clip:text; background-clip:text; color:transparent;
          background-size:200% 100%; animation: shine 2.6s ease-in-out infinite;
          text-shadow:0 0 18px rgba(20,247,255,.35); z-index:2; }

        /* Keyframes (same as before) */
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slowSpin { to { transform: rotate(360deg); } }
        @keyframes spinup { 0% { transform: scale(.84) rotate(0deg); } 100% { transform: scale(1) rotate(360deg); } }
        @keyframes ripple { 0%,100% { opacity:.55; } 50% { opacity:.92; } }
        @keyframes haloPulse { 0%,100% { opacity:.18; transform:scale(1); } 50% { opacity:.28; transform:scale(1.04); } }
        @keyframes drift { 0% { transform: rotate(0deg) scale(1); } 100% { transform: rotate(12deg) scale(1.04); } }
        @keyframes arcFlash { 0% { opacity:0; } 22% { opacity:1; } 100% { opacity:0; } }
        @keyframes arcAfter { 0% { opacity:0; } 26% { opacity:.7; } 100% { opacity:0; } }
        @keyframes arcPulse { 0%,100% { opacity:.14; } 50% { opacity:.30; } }
        @keyframes arcPulseSoft { 0%,100% { opacity:.08; } 50% { opacity:.18; } }
        @keyframes orbit { to { transform: rotate(360deg); } }
        @keyframes sweep { 0% { opacity:0; transform: skewX(-12deg) translateX(-60%); } 60% { opacity:.6; } 100% { opacity:0; transform: skewX(-12deg) translateX(60%); } }
        @keyframes sweepLoop { 0% { opacity:0; transform: skewX(-12deg) translateX(-60%); } 50% { opacity:.4; } 100% { opacity:0; transform: skewX(-12deg) translateX(60%); } }
        @keyframes shine { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }

        @media (prefers-reduced-motion: reduce) {
          .halo, .stator, .plasma, .dots, .dots2, .rotor, .teeth, .arc, .arcAfter, .orbit, .sheen, .brand { animation: none !important; }
        }
      `}</style>

      <div>
        <div className="stage" aria-hidden>
          <span className="halo" />
          <span className="stator" />
          <span className="plasma" />
          <span className="dots" />
          <span className="dots2" />
          <span className="rotor" />
          <span className="teeth" />
          <span className="arc" />
          <span className="arcAfter" />
          <span className="orbit o1"><span className="e" /></span>
          <span className="orbit o2"><span className="e" /></span>
          <span className="orbit o3"><span className="e" /></span>
          <span className="sheen" />
        </div>
        <div className="brand">Electra • Loading</div>
      </div>
    </div>
  );
}
