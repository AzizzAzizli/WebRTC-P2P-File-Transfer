import React from "react";

const clamp = (value) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
};

const ProgressBar = ({ value = 0, label, className = "" }) => {
  const safeValue = clamp(value);

  return (
    <div className={`space-y-1 w-1/2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      )}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-900/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_16px_rgba(56,189,248,0.7)] transition-[width] duration-200 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

