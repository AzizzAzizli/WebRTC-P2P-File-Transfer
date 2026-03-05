import { formatBytes } from "../../shared/utils";

const Receive = ({ file ,url }) => {

  return (
    <div className="h-[260px] w-full max-w-[260px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_0_35px_rgba(15,23,42,0.9)] ring-1 ring-cyan-500/30 sm:max-w-[280px] md:max-w-[320px]">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300/80">
          File ready
        </p>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#153243]/30 text-[#EEF0EB]">
          <img className="w-4" src="/img/download_icon.svg" alt="download-icon" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <p
            className="truncate text-base font-semibold text-[#F4F9E9]"
            title={file?.name || "unknown file"}
          >
            {file?.name || "unknown file"}
          </p>
          <p className="text-sm text-[#EEF0EB]/80">
            {file.size ? `${formatBytes(file?.size)} bytes` : "unknown size"}
          </p>
        </div>
        <div>
          <a
            href={url}
            download={file?.name || "unknown_file"}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#F4F9E9] px-4 py-2 text-sm font-semibold text-[#284B63] shadow-sm transition hover:-translate-y-[1px] hover:bg-white hover:shadow-md"
          >
            Download
            <img
              className="w-5"
              src="/img/download_icon.svg"
              alt="download-icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Receive;
