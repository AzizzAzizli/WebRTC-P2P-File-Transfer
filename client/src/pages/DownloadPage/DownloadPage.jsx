import { useState } from "react";
import Receive from "../../components/ReceiveBox/Receive";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DownloadPage = () => {
  const { roomId } = useParams(); // eslint-disable-line no-unused-vars
  const [downloadUrl] = useState("");
  const [fileName] = useState("");
  const [fileSize] = useState("");

  const handleGetFiles = () => {
    if (!downloadUrl) {
      toast.info("Waiting for the sender to start sharing...");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      toast.error("Could not start download.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 pb-10 pt-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl border border-cyan-500/15 bg-slate-950/80 p-6 shadow-[0_0_50px_rgba(15,23,42,0.9)] backdrop-blur-xl md:flex-row md:items-stretch md:gap-14 md:p-10">
        <div className="flex w-full justify-center items-center md:w-1/2">
          {downloadUrl ? (
            <Receive fileName={fileName} fileSize={fileSize} url={downloadUrl} />
          ) : (
            <div className="flex h-[260px] w-full max-w-[260px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-cyan-500/40 bg-slate-900/80 px-4 text-center text-slate-50 sm:max-w-[280px] md:max-w-[320px]">
              <p className="text-sm font-semibold text-cyan-200">
                Waiting for the sender to start sharing...
              </p>
              <p className="text-xs text-slate-100/80">
                Keep this page open; once the connection is ready your files
                will appear here automatically.
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 text-slate-100">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Receive files securely, in real time.
            </h2>
            <p className="text-base font-medium text-slate-300/90 md:text-lg">
              When the sender starts sharing, the file is streamed directly to
              your browser. Nothing is stored on a server — the transfer is
              strictly peer‑to‑peer.
            </p>
          </div>
          <div className="mt-3 space-y-2 rounded-2xl border border-cyan-500/25 bg-slate-900/80 p-4 text-sm">
            <div className="mb-1 flex items-center justify-between text-xs font-mono uppercase tracking-[0.22em] text-cyan-300">
              <span>Status</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.9)] ${
                  downloadUrl ? "bg-emerald-400" : "bg-yellow-300"
                }`}
              />
            </div>
            <p className="text-slate-100">
              {downloadUrl
                ? "File is ready. You can safely download it now."
                : "Waiting for the sender to connect and start sharing the file."}
            </p>
            <p className="text-xs text-slate-400">
              Keep this tab open. The connection between you and the sender is
              established directly using WebRTC.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGetFiles}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[#284B63] px-5 py-2.5 text-sm font-semibold text-[#F4F9E9] shadow-sm transition hover:-translate-y-[1px] hover:bg-[#1f3b4d] hover:shadow-md"
          >
            Get files
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
