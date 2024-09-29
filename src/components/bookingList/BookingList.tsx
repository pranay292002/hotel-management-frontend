"use client"

import Image from "next/image";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {bookingType} from "@/types/types"
import { PiDotsThreeBold } from "react-icons/pi";
import styles from './bookingList.module.css'
import Cookies from 'js-cookie'
import UserContext from "@/context/userContext/UserContext";


const fetchBookings = async () => {
    const res = await axios.get('https://active-paradise-796a63f81b.strapiapp.com/api/bookings', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}` 
      }});
  
    return res.data.data;
  
  };


const BookingList = () => {

    const [bookings, setBookings] = useState([]);

    
  
    

    const user = useContext(UserContext);

    useEffect(() => {
        
      if(user.CurrentUser){
        fetchBookings().then((data) => setBookings(data));
      } 
        
        
   }, [user.CurrentUser]);

  return (
    <>
    <div className={`laptop:w-[55vw] w-[93vw] min-w-[355px] rounded-xl flex flex-col gap-6 shadow-lg px-[20px] py-[15px] shadow-grey-950 bg-[#FFFFFF]`}>
        <div className="flex items-end justify-between text-zinc-400 ">
            <h6 className='text-[#24496A] font-bold'>Booking list</h6>
             <PiDotsThreeBold />
        </div>
    <ul className="flex flex-col gap-y-4 overflow-x-scroll">
      {bookings.map((booking:bookingType, key:number ) => (
         <li key={key}  className="flex text-zinc-400 text-[12px] justify-between min-w-[650px]">
          <div className={` text-left py-1 w-6 text-zinc-900`}>{key+1}</div>
          <div className={`text-left py-1 w-36 text-zinc-900` }>{booking.guest_name}</div>
          <div className={` text-left py-1 w-32`}>{booking.phone_number}</div>
          <div className={`text-left py-1 w-24`}>{booking.room_type}</div>
          <div className={` text-left py-1 w-24`}>{booking.check_in}</div>
          <div className={` text-left py-1 w-16`}>{booking.check_out}</div>
          <div className={` text-left flex  place-content-end w-28`}><span className={`text-zinc-100   ${ booking.payment_status === 'Paid' ? 'bg-[#10B982]' : (booking.payment_status === 'Cancelled' && 'bg-[#FFA873]')}  bg-[#0187CE]  w-fit text-center py-1 px-3 rounded-xl`}>{booking.payment_status}</span></div> 
        </li>
      ))}
      
      </ul>
      </div>

    </>
  )
}

export default BookingList
