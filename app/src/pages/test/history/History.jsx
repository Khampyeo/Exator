import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
export default function History() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getThemes = async () => {
      const url = `${process.env.REACT_APP_URL}/history/attempts?username=nice`;
      const response = await axios.get(url);

      const data = response.data;
      setTopics(data);
    };
    getThemes();
    return () => {};
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 relative">
        <div className="flex justify-between h-[70px] bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">History</h1>
          </div>
          <div className=""></div>
        </div>
        <div className="bg-white h-[60px]"></div>
        <div className="flex h-[calc(100%-140px)] flex-col px-4 overflow-y-auto">
          <table className="fixTableHead w-full relative">
            <thead className="">
              <tr className="text-center">
                <th className="">Topic</th>
                <th className="">Owner</th>
                <th className="">Date</th>
                <th className="">Time Complete</th>
                <th className="">Score</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {topics.map((topic) => (
                <tr>
                  <td
                    className="hover:text-[#95b3bb] cursor-pointer transition-all"
                    onClick={() =>
                      navigate(`/dashboard/${topic.owner}/${topic.topic}`)
                    }
                  >
                    {topic.topic}
                  </td>
                  <td>{topic.owner}</td>
                  <td>{topic.submit_time}</td>
                  <td>{topic.complete_time}</td>
                  <td>{topic.score}</td>
                  <td>Mexico</td>
                </tr>
              ))}
              {topics.map((topic) => (
                <tr>
                  <td
                    className="hover:text-[#95b3bb] cursor-pointer transition-all"
                    onClick={() =>
                      navigate(`/dashboard/${topic.owner}/${topic.topic}`)
                    }
                  >
                    {topic.topic}
                  </td>
                  <td>{topic.owner}</td>
                  <td>{topic.submit_time}</td>
                  <td>{topic.complete_time}</td>
                  <td>{topic.score}</td>
                  <td>Mexico</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}