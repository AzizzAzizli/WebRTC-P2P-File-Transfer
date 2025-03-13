import React, { useRef } from "react";

const Input = () => {
  
  const inputRef = useRef(null);
  function activeteInpute() {
    inputRef.current.click();
  }

  return (
    <div className="bg-[#284B63] h-[250px] w-[250px] rounded-3xl p-4 cursor-pointer">
      <div className="h-full w-full  border-2 border-dashed border-[#F4F9E9] rounded-2xl flex items-center justify-center flex-col gap-2">
        <div>
          <img onClick={activeteInpute} className="w-[42px]" src="/img/add_icon.svg" alt="add-icon" />
          <input ref={inputRef} className="hidden" type="file" name="file" id="file" />
        </div>
        <div>
          <p className="font-normal text-lg text-[#EEF0EB] text-center">
            Click to browse or drag files here to start sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Input;
