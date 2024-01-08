import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
export default function ThemeItem({ name, decription, user }) {
  const navigate = useNavigate();

  function userClick(event) {
    event.stopPropagation();
    navigate(`/dashboard/${user}`);
  }
  return (
    <div
      className="group p-2 rounded-xl bg-[#eff7f9] flex flex-col cursor-pointer relative overflow-hidden h-[120px]
            after:content-[''] after:absolute after:h-1 after:w-full after:bg-black after:left-0 after:bottom-0 after:opacity-0 after:transition-all
            hover:after:opacity-100"
      onClick={() => navigate(`/dashboard/${user}/${name}`)}
    >
      <p className="font-semibold group-hover:text-[#286575]">{name}</p>
      <p className="text-[14px] mt-1 limited-lines">{decription}</p>
      <p className="mt-auto hover:text-[#286575]" onClick={userClick}>
        @{user}
      </p>
    </div>
  );
}
