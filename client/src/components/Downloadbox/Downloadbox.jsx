import { toast } from "react-toastify";

const Downloadbox = ({ file, setFile, link }) => {
  function handleClose() {
    setFile(null);
  }

  async function copyLink() {
    if (!link) {
      toast.error("No link to copy!");
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to copy link!");
    }
  }

  return (
    <div className="h-[260px] w-full max-w-[260px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_0_35px_rgba(15,23,42,0.9)] ring-1 ring-cyan-500/30 sm:max-w-[280px] md:max-w-[320px]">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300/80">
          Ready to share
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#153243]/40 text-[#EEF0EB] transition hover:bg-[#153243]/70"
        >
          <img className="w-4" src="/img/close_icon.svg" alt="close-icon" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <p
            className="truncate text-base font-semibold text-[#F4F9E9]"
            title={file.name}
          >
            {file.name}
          </p>
          <p className="text-sm text-[#EEF0EB]/80">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#EEF0EB]/60">
            Share link
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-[#153243]/60 px-3 py-2">
            <input
              className="flex-1 bg-transparent text-xs font-medium text-[#EEF0EB] outline-none placeholder:text-[#EEF0EB]/50"
              value={link}
              readOnly
              type="text"
              placeholder="Preparing link..."
            />
            <button
              type="button"
              onClick={copyLink}
              className="shrink-0 rounded-full bg-[#FDE68A] px-3 py-1 text-xs font-semibold text-[#0F172A] transition hover:bg-[#FACC15]"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloadbox;
