import React from "react";
import ThemeItem from "../../component/theme-item/ThemeItem";
import { items } from "./themeItems";
import Pagination from "../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";

export default function Theme() {
  const { user, theme } = useParams();
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex items-center">
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </h1>
            <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer "
              onClick={() => navigate(`/dashboard/${user}`)}
            >
              {user}
            </h1>
            <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>

            <h1 className="mt-2 text-[20px] font-semibold">{theme}</h1>
          </div>
          <div className="flex"></div>
        </div>
        <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10"></div>
        <div className="flex justify-center pt-4 mt-auto"></div>
      </div>
    </div>
  );
}
