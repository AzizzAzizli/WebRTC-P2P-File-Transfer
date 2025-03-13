import React from "react";

const Receive = () => {
  return (
    <div className="bg-[#284B63]  min-w-[250px] max-w-[300px] rounded-3xl p-6 ">
      <div className="flex justify-end cursor-pointer ">
        <img className="w-6" src="/img/close_icon.svg" alt="close-icon" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-normal text-lg text-[#EEF0EB]">
            android-studio-2024.3.1.13-windows.exe
          </p>
          <p className="font-normal text-lg text-[#EEF0EB]">1312.59 MB</p>
        </div>
        <div>
          <div className="flex gap-2 bg-[#F4F9E9] rounded-3xl justify-center py-1 cursor-pointer">
            <span className="font-medium text-lg text-[#284B63]">Download</span>
            <div>
              <img className="w-7" src="/img/download_icon.svg" alt="download-icon" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Receive;
