// app/loading.tsx
"use client"
export default function loading() {
  return (
    <div className="e-loading" role="status" aria-live="polite" aria-label="Loading Electra">
      <style jsx>{`
        .e-loading {
          min-height: 60vh;
          display: grid;
          place-items: center;
          padding: 48px 16px;
        }
        .ring {
          position: relative;
          width: 96px; height: 96px; border-radius: 50%;
          background:
            conic-gradient(from 0deg, #14f7ff, rgba(0,184,217,.65), rgba(20,247,255,.35), transparent 88%);
          -webkit-mask: radial-gradient(farthest-side, transparent 64%, #000 65%);
                  mask: radial-gradient(farthest-side, transparent 64%, #000 65%);
          animation: spin 1.05s linear infinite;
          filter: drop-shadow(0 0 16px rgba(20,247,255,.45));
        }
        .pulse {
          margin-top: 18px;
          color: #dffbff; font-weight: 900; letter-spacing: .18em; text-transform: uppercase;
          text-shadow: 0 0 18px rgba(20,247,255,.35);
          animation: throb 1.8s ease-in-out infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes throb { 0%, 100% { opacity: .7; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .ring { animation: none; }
          .pulse { animation: none; }
        }
      `}</style>

      <div>
        <div className="ring" />
        <div className="pulse">Electra • Loading</div>
      </div>
    </div>
  );
}
