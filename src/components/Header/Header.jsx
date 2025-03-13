import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#EEF0EB] px-4  py-4 sticky top-0 left-0 flex">
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-bold italic text-[#153243]">PeerDrop</h1>
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <ul>
          <li>
            <Link
              className="text-xl font-medium hover:text-[#284B63] italic"
             target="_blank"
              to={"https://github.com/AzizzAzizli/WebRTC-P2P-File-Transfer"}
            >
              GitHub
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
