"use client";

import react, { useContext, useState } from "react";
import styles from "./sidebar.module.css";
import { RxDashboard } from "react-icons/rx";
import { BsFillGridFill } from "react-icons/bs";
import { BsFillFileTextFill } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";
import { VscPieChart } from "react-icons/vsc";
import { TbChartPieFilled } from "react-icons/tb";

import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { BsCalendar4 } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";

import { GoMail } from "react-icons/go";
import Link from "next/link";
import UserContext from "@/context/userContext/UserContext";
import Cookies from "js-cookie";
import {useRouter} from 'next/navigation'

const Sidebar = () => {
  const user = useContext(UserContext);
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("home");

  const handleLogout = () => {
    user.update(null);
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("id");
    Cookies.remove("jwt");

    router.push('/login')
    
  };

  return (
    <>
      <div className="w-full laptop:w-[5%] bg-white opacity-100 laptop:h-[100vh] h-12 tablet:sticky fixed bottom-0  tablet:top-0   flex laptop:flex-col laptop:justify-around justify-between place-items-center py-4 z-[100] px-6 laptop:px-0 text-zinc-600 ">
        <div className={styles.logo}>
          <div>
            <div></div>
          </div>
        </div>

        <ul className="flex laptop:flex-col laptop:gap-8  tablet:gap-10 gap-3 laptop:mb-16 text-[18px]">
          <li className="group relative shrink">
            <Link href="/" onClick={() => setActiveTab("home")} className="tooltip">
              {activeTab === "home" ? <BsFillGridFill /> : <RxDashboard />}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Dashboard</span>
          </li>
          <li className="group relative shrink">
            <Link href="/statistics" onClick={() => setActiveTab("statistics")}>
             
              {activeTab === "statistics" ? (
                <TbChartPieFilled />
              ) : (
                <VscPieChart />
              )}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible  top-[-5px] left-[115%]">Statistics</span>
          </li>
          <li className="group relative shrink">
            <Link href="/feedbacks" onClick={() => setActiveTab("feedbacks")}>
            
              {activeTab === "feedbacks" ? <BsHeartFill /> : <BsHeart />}{" "}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Feedbacks</span>
          </li>
          <li className="group relative shrink">
            <Link href="/bills" onClick={() => setActiveTab("bills")}>
          
              {activeTab === "bills" ? (
                <BsFillFileTextFill />
              ) : (
                <BsFileText />
              )}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Bills</span>
          </li>
          <li className="group relative shrink">
            <Link href="/calender" onClick={() => setActiveTab("calender")}>
             
              {activeTab === "calender" ? (
                <BsCalendarFill />
              ) : (
                <BsCalendar4 />
              )}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Calender</span>
          </li>
          <li className="group relative shrink">
            <Link href="/mails" onClick={() => setActiveTab("mails")}>
             
              {activeTab === "mails" ? <IoMailSharp /> : <GoMail />}
            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Mails</span>
          </li>
          <li className="group relative shrink">
            <Link href="/settings" onClick={() => setActiveTab("settings")}>
           
              {activeTab === "settings" ? (
                <IoSettings />
              ) : (
                <IoSettingsOutline />
              )}

            </Link>
            <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Settings</span>
          </li>
        </ul>

        <div>
          {user.CurrentUser && (
            <span onClick={handleLogout} className="cursor-pointer group relative">
              <FiLogOut />
              <span className="invisible w-[80px] text-sm bg-gray-600 text-white text-center p-1.5 rounded-lg absolute z-40 group-hover:visible top-[-5px] left-[115%]">Logout</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
