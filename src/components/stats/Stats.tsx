"use client"

import { IoEnter } from "react-icons/io5";
import styles from "./stats.module.css";
import { FaBed } from "react-icons/fa";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {statType} from "@/types/types"
import Cookies from 'js-cookie'
import UserContext from "@/context/userContext/UserContext";


const fetchStats = async () => {
    const res = await axios.get('https://active-paradise-796a63f81b.strapiapp.com/api/Booking-stat', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}` 
      }});

    
  
    return res.data.data;
  
  };




    

const Stats = () => {

  const [stat, setStat] = useState<statType>({total_arrived : 0, total_booked : 0, total_check_in : 0})

    const user = useContext(UserContext);

    useEffect(() => {
        
      if(user.CurrentUser){
        fetchStats().then((data: statType) => setStat(data));
      } 
        
        
   }, [user.CurrentUser]);

    

  return (
    <>
      <div className="flex laptop:w-[55vw] w-[93vw] justify-center tablet:justify-between laptop:justify-center lgLaptop:justify-between my-3 flex-wrap gap-5">
        <div className="flex w-48 justify-center rounded-xl gap-2 bg-white shadow-lg  shadow-grey-200 py-2 px-4">
          <div className="p-2 bg-[#10B982] rounded-lg content-center">
            <IoEnter
              className="text-[40px] text-zinc-100 "
              style={{
                transform: "rotateY(125deg)",
                transformStyle: "preserve-3d",
                
              }}
            />
          </div>

          <div className="grid content-center">
            <p className="text-zinc-500 text-sm ">Total Arrived</p>
            <p className="text-[#24496A] font-extrabold text-xl ">{stat.total_arrived}</p>
          </div>
        </div>


        <div className="flex w-48 justify-center rounded-xl gap-2 bg-white shadow-lg  shadow-grey-950 py-2 px-4">
          <div className="p-2 bg-[#FFA873] rounded-lg content-center">
            <FaBed
              className="text-[40px] text-zinc-100 "
            
            />
          </div>

          <div className="grid content-center">
            <p className="text-zinc-500 text-sm ">Total Booked</p>
            <p className="text-[#24496A] font-extrabold text-xl ">{stat.total_booked}</p>
          </div>
        </div>


        <div className="flex w-48 justify-center rounded-xl gap-2 bg-white shadow-lg  shadow-grey-950 py-2 px-4">
          <div className="p-2 bg-[#0187CE] rounded-lg content-center">
            <IoEnter
              className="text-[40px] text-zinc-100 "
              style={{
                transform: "rotateY(55deg)",
                transformStyle: "preserve-3d",
              }}
            />
          </div>

          <div className="grid content-center">
            <p className="text-zinc-500 text-sm ">Total Check in</p>
            <p className="text-[#24496A] font-extrabold text-xl ">{stat.total_check_in}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
