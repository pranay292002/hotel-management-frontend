"use client"
import React, { useContext, useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { campaignType } from '@/types/types';
import styles from "./overview.module.css"
import Cookies from 'js-cookie';
import { PieChart } from '@mui/x-charts';
import { DatasetType } from '@mui/x-charts/internals';
import UserContext from '@/context/userContext/UserContext';

const fetchCampaign = async () => {

 
  
    const res = await axios.get("https://active-paradise-796a63f81b.strapiapp.com/api/campaign-overviews", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`  
      }});

    
  
    return res.data.data;
  
  };


const Overview = () => {

  

    const [campaign, setCampaign] = useState([])
    const user = useContext(UserContext);

    useEffect(() => {
        
      if(user.CurrentUser){
        fetchCampaign().then((data) => setCampaign(data));
      } 
        
        
   }, [user.CurrentUser]);

  


   const valueFormatter = (value: string) => value.slice(0,3);
  

   

   const [selectedMonth , setSelectedMonth] = useState<string | number>("This Year")

   const onOptionChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSelectedMonth(event.target.value);
    
   }

    const getCampaign= (id:number): campaignType => campaign[id];

    const monthOrder = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];

    const sortedData = campaign.sort((a:campaignType, b:campaignType) => {
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    const roomVisited = sortedData.map((item: campaignType ) => item.room_visited)
   const roomBooked = sortedData.map((item: campaignType) => item.room_booked)

   
 
  return (
    <>
    <div className='w-[55vw] bg-white py-5 rounded-xl my-5 shadow-lg  shadow-grey-950'>
    <div className="flex justify-between my-3">
    <h6 className='text-[#24496A] font-bold mx-5'>Campaign Overview</h6>
    <select onChange={onOptionChangeHandler} className={styles.select}>
     <option value={"This Year"}>This Year</option>
     {campaign.map((item: campaignType, key) => <option key={key} value={key}>{item.month}</option>)}
    </select>
    </div>

    {selectedMonth === "This Year" ? 
    <LineChart
      
      dataset={sortedData}
      xAxis={[{ scaleType: 'point', dataKey: 'month' , valueFormatter, }]}
      series={[
        
        { curve: "monotoneX", data: roomVisited , label: (location) => location === 'tooltip' ? 'Visited' : 'Room Visited', color: "#FFA872", showMark: ({ index }) => index  === 50, },
        { curve: "monotoneX", data: roomBooked, label: (location) => location === 'tooltip' ? 'Booked' : 'Room Booked', color:"#0086CE" ,showMark: ({ index }) => index  === 50,},
        
      ]}
      experimentalMarkRendering = {true}
      yAxis={[{tickSize:0 }]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'left' },
          padding: {left:23, bottom:20},
          labelStyle:{
            fontSize:10,
          },
          itemMarkHeight: 10,
          itemMarkWidth: 10
          
        },}}
        
      width={700}
      height={300}
      
    /> : <> 

 
    
    <PieChart
   
    series={[
      {
        data: [{value: getCampaign(Number(selectedMonth)).room_booked, label:'Room Booked' },
               {value: getCampaign(Number(selectedMonth)).room_visited, label:'Room Visited' }]
      },
    ]}
    slotProps={{
      legend: {
        
        position: { vertical: 'top', horizontal: 'left' },
        padding: {left:23, bottom:20},
        labelStyle:{
          fontSize:10,
        },
        itemMarkHeight: 10,
        itemMarkWidth: 10
        
      },}}
    width={400}
    height={200}
    margin={{right:-200}}
    
  /></> }


    </div>
    </>
  )
}

export default Overview
