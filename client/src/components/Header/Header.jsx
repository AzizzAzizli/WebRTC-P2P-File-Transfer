import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-20 w-full border-b border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={"/"}>
          <h1 className="flex items-center gap-2 text-xl font-semibold tracking-[0.25em] text-cyan-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/80 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.6)]">
              PD
            </span>
            <span className="font-mono uppercase">PeerDrop</span>
          </h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-3">
            <li>
              <Link
                className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.6)] transition hover:-translate-y-[1px] hover:border-cyan-300 hover:bg-cyan-400/20"
                target="_blank"
                to={"https://github.com/AzizzAzizli/WebRTC-P2P-File-Transfer"}
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
