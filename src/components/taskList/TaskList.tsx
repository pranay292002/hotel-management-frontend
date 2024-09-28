"use client"

import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { taskType } from '@/types/types';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import axios from 'axios';
import Cookies from 'js-cookie'

 const TaskList = ( props: taskType) => {

 const {task_status , department , staffName, task , task_id, createdAt } = props;

  const fetchAvatar= async()=>{
    const res = await axios.get('https://active-paradise-796a63f81b.strapiapp.com/api/upload/files/1', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}` 
      }});
  
    return res.data;
  }
 
  
 let time= '11:11 pm';
 let Today= false;
 let Tomorrow= false;
 let Yesterday= false;

 const[avatarUrl, setAvatarUrl] = useState()

  if(createdAt){
    const date = new Date(createdAt);
    time = format(date, 'h:mm a')
    if(isToday(date)){
      Today = true;
    }
    else{
      if(isTomorrow(date)){
        Tomorrow=true;
      }
      else{
        if(isYesterday(date)){
          Yesterday= true
        }}
    }

  }

  useEffect(() => {
        
      fetchAvatar().then((data) => setAvatarUrl(data.url));
      
      
 }, []);

  
  return (
    <>
      <div className='mt-6 mx-3 pl-12 relative z-10'>
 
        <div className="absolute w-2 h-full border-l-2 border-dashed border-gray-400 top-14 left-3 z-0"></div>

        <div className="flex justify-between mb-2">
          <span className={`text-white  text-xs rounded-xl py-1 px-3 ${ department === 'Front office'? 'bg-[#0187CE]': (department === 'Kitchen' ? 'bg-[#FFA975]' : 'bg-[#12B983]')}`}>{ department }</span>
          <div className='text-xs text-gray-500 py-1'>{Today && 'Today,'} {Tomorrow && 'Tomorrow,'} {Yesterday && 'Yesterday,'}<span>{time}</span></div>
        </div>
        <div className="flex relative">
            <div className='rounded-full overflow-hidden w-fit absolute left-[-60px]'>
            <img src={avatarUrl} width={50} height={50} alt='avatar'/>
            </div>
            
          <h3 className={'text-[#24496A] font-semibold'}>{staffName} <span className='text-gray-500 font-medium'>{ task_status === 'Task completed'?  'completed all task' :(task_status === 'In Progress'? 'doing the task' : 'get new task') }</span> {task_id}</h3>
        </div>

        <div className='w-full h-28 rounded-xl border border-gray-300 py-5 px-4'>
            <div className="text-[#24496A] font-semibold">{task}  <span className="text-gray-400 font-medium">{task_id}</span></div>
            <div className={`flex  w-fit px-4 text-xs rounded-xl mt-2 py-1 ${ task_status === 'Task completed'? 'bg-[#EDFFF3] text-[#329D7E]': 'bg-[#FFEBC6] text-[#FFBA32]'}`}><span className='mr-2'> { task_status === 'Task completed'? <FaCheckCircle/>: <FaFlag/>}</span>  {task_status}</div>
        </div>
        

      </div>





    </>
  )
}

export default TaskList

