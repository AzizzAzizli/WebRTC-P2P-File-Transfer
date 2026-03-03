import Input from "../../components/Input/Input";
import Downloadbox from "../../components/Downloadbox/Downloadbox";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../../components/Progress/ProgressBar";
const pcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
const CHUNK_SIZE = 16384; 
const WS_URL = "ws://localhost:3001";
const Home = () => {
  const [file, setFile] = useState(null);

  const pc = useRef();
  const dc = useRef(null);
  const ws  = useRef(null);

useEffect(()=>{
  ws.current = new WebSocket(WS_URL);




},[])

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 pb-10 pt-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl border border-cyan-500/15 bg-slate-950/80 p-6 shadow-[0_0_50px_rgba(15,23,42,0.9)] backdrop-blur-xl md:flex-row md:items-stretch md:gap-14 md:p-10">
        <div className="flex w-full items-center justify-center md:w-1/2">
          {file ? (
            <Downloadbox link={""} setFile={setFile} file={file} />
          ) : (
            <Input setFile={setFile} />
          )}
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 text-slate-100">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Share files <span className="text-cyan-300">directly</span> from
              your device.
            </h2>
            <p className="text-base font-medium text-slate-300/90 md:text-lg">
              Create a secure link and send any file size peer‑to‑peer. All
              transfers happen in real time between devices — nothing is stored
              on a server.
            </p>
          </div>
          <div className="mt-2 space-y-2 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
            <p className="font-semibold text-cyan-300">Heads up</p>
            <p>
              If you close this page your share will stop. Just keep the tab
              open in the background until your transfer is finished.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
