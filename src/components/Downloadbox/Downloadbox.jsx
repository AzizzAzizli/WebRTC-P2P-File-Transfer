import React from "react";

const Downloadbox = () => {
  return (
    <div className="bg-[#284B63]  min-w-[250px] max-w-[300px] rounded-3xl p-6 ">
      <div className="flex justify-end cursor-pointer ">
        <img className="w-6" src="/img/close_icon.svg" alt="close-icon" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-normal text-lg text-[#EEF0EB]">
            android-studio-2024.3.1.13-windows.exe
          </p>
          <p className="font-normal text-lg text-[#EEF0EB]">1312.59 MB</p>
        </div>
        <div>
          <input
            className="border-b-2 border-b-[#B4B8AB] border-0  text-[#EEF0EB] font-medium px-1 "
            value={"https://toffeesha.re/c/jXAXncQrTd"}
            readOnly
            type="text"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Downloadbox;
