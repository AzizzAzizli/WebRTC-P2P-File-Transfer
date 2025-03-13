import React from "react";
import Input from "../../components/Input/Input";
import Downloadbox from "../../components/Downloadbox/Downloadbox";

const Home = () => {
  return (
    <div className="bg-[#F4F9E9] h-screen">
      <div className="h-1/2 flex items-center justify-around p-10 md:flex-row flex-col md:gap-0 gap-4">
        <div>
          <Input />
          <Downloadbox />
        </div>
        <div className="lg:w-1/3 md:w-3/4 w-full flex flex-col gap-2">
          <div>
            <h2 className="font-bold text-4xl text-[#284B63]">
              Share files directly from your device to anywhere
            </h2>
            <h2 className="font-bold text-4xl text-[#284B63]">
              Now sharing your files directly from your device
            </h2>
          </div>
          <div>
            <p className="font-medium text-lg text-[#153243]">
              Send files of any size directly from your device without ever
              storing anything online.
            </p>
            <p className="font-medium text-lg text-[#153243]">
              Please note: Closing this page means you stop sharing! Simply keep
              this page open in the background to keep sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
