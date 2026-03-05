import React, { useRef } from "react";

const Input = ({ handleFile }) => {
  const inputRef = useRef(null);

  function activateInput() {
    inputRef.current?.click();
  }


  return (
    <button
      type="button"
      onClick={activateInput}
      className="group relative h-[260px] w-full max-w-[260px] cursor-pointer rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 p-4 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:max-w-[280px] md:max-w-[320px]"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/40 bg-white/5 px-4 text-center transition group-hover:border-sky-200 group-hover:bg-white/10">
        <div className="flex flex-col items-center gap-3">
          <img className="w-11" src="/img/add_icon.svg" alt="add-icon" />
          <div>
            <p className="text-base font-medium text-[#F4F9E9]">
              Click to choose a file
            </p>
            <p className="mt-1 text-xs text-[#EEF0EB]/80">
              or drag &amp; drop your files into this area
            </p>
          </div>
        </div>
      </div>
      <input
        onChange={handleFile}
        ref={inputRef}
        className="hidden"
        type="file"
        name="file"
        id="file"
      />
    </button>
  );
};

export default Input;
