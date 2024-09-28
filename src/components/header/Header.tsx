import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import avatar from "@/assets/IMG_20201116_222127_137_edited.jpg";
import { IoChevronDown } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import UserContext from '@/context/userContext/UserContext';
import { IoClose } from "react-icons/io5";
import {useRouter} from 'next/navigation'
import axios from 'axios';
import Cookies from "js-cookie"

const Header = () => {

  const router = useRouter();

  const user =  useContext(UserContext)
  const [isModal, setIsModal] = useState(false);
  const[avatarUrl, setAvatarUrl] = useState()
    
  const fetchAvatar= async()=>{
    if(user.CurrentUser){
      const res = await axios.get('https://active-paradise-796a63f81b.strapiapp.com/api/upload/files/1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}` 
        }});
    
      return res.data;
    }
   
  }

  const toggleModal = ()=>{
    if(isModal){
      setIsModal(false);
    }
    else{setIsModal(true);}
  }

 


  useEffect(() => {
        
    if(user.CurrentUser){
      fetchAvatar().then((data) => setAvatarUrl(data.url));
    } 
      
      
 }, [user.CurrentUser]);




  return (
    <>
      <div className="flex justify-between w-[90vw]">
        <div>
          <h1 className="text-[#24496A] font-normal pb-2 text-[20px] ">
            Welcome, <span className="font-black">{user.CurrentUser?.username} !</span>
          </h1>
          <p className="text-zinc-500 text-xs mb-8">
            Don't forget to check your activity
          </p>
        </div>

        <div className="flex justify-between w-[300px] ">
          <div className="rounded-full bg-[#FFFFFF] w-fit h-fit p-3 relative cursor-pointer">
            <BsBell  onClick={()=>router.push('/mails')}/>
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-0 right-1"></div>
          </div>

          <div className="w-44 text-end px-2">
            <h6 className="text-[#24496A] font-bold ">{user.CurrentUser?.username}</h6>
            <p className="text-zinc-500 text-xs ">{user.CurrentUser?.userType}</p>
          </div>

          <div className="rounded-full w-fit overflow-hidden">
            <img src={avatarUrl} width={50} height={50} alt="avatar" className='rounded-full' />
          </div>
          
          <div className="pt-3 text-xl text-zinc-600 cursor-pointer " onClick={toggleModal}>  {isModal ? <IoClose/> : <IoChevronDown/>}</div>

          { isModal && <div className={`flex w-80 bg-gray-300 absolute h-40 top-20 z-40 rounded-lg place-items-center  place-content-center` }>
            <form className="flex flex-col p-5 bg-white w-[90%] place-items-center  place-content-center gap-3 rounded-lg">
              <label>Set Profile</label>
              <input type="file" className="text-xs w-[70%] cursor-pointer"/>
              <input type="submit" className="text-sm bg-gray-700 px-3 py-1 rounded-lg cursor-pointer text-zinc-200 "></input>
            </form>
            </div>}

        </div>
      </div>
    </>
  )
}

export default Header
