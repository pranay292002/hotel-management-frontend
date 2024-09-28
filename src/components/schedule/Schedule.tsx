"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import TaskList from "../taskList/TaskList";
import axios from "axios";
import { taskType } from "@/types/types";
import Cookies from 'js-cookie'
import Link from "next/link";
import { addDays, format, isToday, isTomorrow, isYesterday } from 'date-fns';
import UserContext from "@/context/userContext/UserContext";



const fetchSchedule = async () => {
  const res = await axios.get('https://active-paradise-796a63f81b.strapiapp.com/api/staff-schedules', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt')}` 
    }});

  

  return res.data.data;

};

const Schedule = () => {

  const [ScheduleData, setScheduleData] = useState([])

   const user = useContext(UserContext);

    useEffect(() => {
        
      if(user.CurrentUser){
        fetchSchedule().then((data) => setScheduleData(data));
      } 
        
        
   }, [user.CurrentUser]);

   const now = new Date();
 const [date , setDate]= useState<Date>(now)

 const [selectedDay, setSelectedDay] = useState(Number(format(date, 'e')));
 const formattedDate = format(date, 'd MMMM');
 

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [1, 2, 3, 4, 5, 6, 7];



const filteredSchedule = ScheduleData.filter((item:taskType)=> { 
  if (item.createdAt) {
  const createdAtDate = new Date(item.createdAt); 
  return createdAtDate.toDateString() === date.toDateString(); 
}
return false;});


const handleDatChange = (day:number) => {
        setSelectedDay(day) ;
        setDate(addDays(date, (day-selectedDay)));
}

const decrementDate = () => {

 
  setDate(addDays(date,-1));

  if(selectedDay<=1){
    setSelectedDay(7);
  }
  else{
    setSelectedDay(selectedDay -1);
  }
  
  
};

const incrementDate = () => {

  setDate(addDays(date,+1));


  if(selectedDay>=7){
    setSelectedDay(1);
  }
  else{
    setSelectedDay(selectedDay + 1);
  }
  
  
};

  return (
    <>
      <div className="w-[33vw] min-h-[480px] bg-white mt-3 rounded-xl ml-6 py-3 px-4 shadow-lg  shadow-grey-200 overflow-hidden pb-5">
        <div className="flex justify-between mb-4">
          <h6 className="text-[#24496A] font-bold">Staff Schedule</h6>
          <p className="text-sm text-zinc-500" ><Link href={"/calender"}>see all</Link></p>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-[#24496A] font-semibold text-[13px]">
            {isToday(date) && 'Today,'} {isTomorrow(date) && 'Tomorrow,'} {isYesterday(date) && 'Yesterday,'}
            <span className="text-zinc-700 font-normal">  {formattedDate}</span>
          </p>
          <div className="flex text-xl text-zinc-600 ">
            <IoIosArrowBack className="cursor-pointer" onClick={()=>decrementDate()}/>
            <IoIosArrowForward className="cursor-pointer" onClick={()=>incrementDate()} />
          </div>
        </div>

        <ul className="flex space-x-7 justify-between text-sm relative">
          {days.map((day, index) => (
            <li
              key={index}
              className="flex flex-col items-center cursor-pointer relative"
              onClick={() => handleDatChange(day)}
            >
              <span className="text-gray-500">{daysOfWeek[index]}</span>
              <span
                className={`mt-3 px-3 py-[6px] rounded-full ${
                  selectedDay === day
                    ? "bg-[#23496B] text-white font-bold"
                    : "text-gray-500"
                }`}
              >
                {day}
              </span>

              {selectedDay === day && (
                <>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#23496B] mt-1 absolute bottom-[-13px] z-30 " />
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white   absolute bottom-[-15px] z-20 " />
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-gray-300  absolute bottom-[-17px] z-10 " />
                </>
              )}
            </li>
          ))}

          <div className="h-0.5 bg-gray-300 w-[750px] absolute top-[69px] transform -translate-x-12 " />
        </ul>
        
        <div className="mt-10 ">

          

        { filteredSchedule.map((item:taskType, key)=> 
          <TaskList 
           key = {key}
           
          task_status = {item.task_status }
          department={item.department}  
          staffName={item.staffName} 
          task={item.task}  
          task_id={item.task_id}
          createdAt={item.createdAt}
          staff_id={item.staff_id}
          id={item.id}/>
         
        )}
        
        </div>
        
       
      </div>
    </>
  );
};

export default Schedule;
