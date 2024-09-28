"use client"

import React, { useContext, useState } from 'react'
import axios from "axios";
import { errorsType, userContextType, userType } from '@/types/types';
import UserContext from '@/context/userContext/UserContext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'


const Login = () => {

    
    const router = useRouter()
    
    const loginUser = async (email:string, password:string) => {
        const res = await axios.post("https://active-paradise-796a63f81b.strapiapp.com/api/auth/local", {
          identifier: email,
          password: password,
        });
    
        return res.data;
      };
    
      const registerUser   = async (username:string, email:string, password:string, role:number = 1 ) => {

        try{
          const res = await axios.post("https://active-paradise-796a63f81b.strapiapp.com/api/users", {
            username: username,
            email:email,
            password: password,
            role: role,
            
          } 
        
        );
    
          return res.data;
        }
        catch(error){
    
          console.log(error)
    
        }
        
    
        
      };


      const validateForm = (username:string, email:string, password:string, confirmPassword:string) => {

        let errors:errorsType = {} ;

        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length < 4) {
            errors.username = 'Username must be at least 4 characters long';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const user =  useContext<userContextType>(UserContext)
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ Cpassword, setCpassword] = useState("")
    const [ username, setUsername] = useState("")
    const [errors, setErrors] = useState({});
    const [isSignup, setIsSignup] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
  
  
    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {


      
      e.preventDefault();
      setIsLoading(true)
      if(email && password){

        loginUser(email, password )
        .then((data) => {const current :userType |null|undefined = data.user ;
                          user.update(current);
                          Cookies.set('username', data.user.username)
                          Cookies.set('email', data.user.confirmed)
                          Cookies.set('id', data.user.confirmed)
                          Cookies.set('userType', data.user.userType)
                          Cookies.set('jwt' , data.jwt)
                          setIsLoading(false)
                           router.push('/');
                              
                          toast.success("Logged In successfully !")})
         .catch((error)=> {toast.error("Error Invalid Credentials !"); setIsLoading(false)});
      }
      else{
        toast.error("Invalid Credentials !");
        setIsLoading(false)
      }
  
    }
  
    const handleRegister = (e:React.FormEvent<HTMLFormElement>) => {
      
      e.preventDefault();
      setIsLoading(true)

      const newErrors = validateForm(username, email, password, Cpassword);

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            registerUser(username, email, password, 1 )
            .then(() => {toast.success('Form submitted successfully! now you can login.'); setIsLoading(false)})
            .catch(()=> {toast.error('Server Error !!. '); setIsLoading(false)});
        } else {
            
            toast.error('Form submission failed due to validation errors. '+ Object.values(errors));
            setIsLoading(false)
        }

    }


  return (
    <> 
  
     
     <div className="flex flex-col justify-center items-center w-full  rounded-xl h-[400px]">

    <div className="bg-white rounded-xl w-fit p-5 mb-5 shadow-lg  shadow-grey-950"> <span className={`${isSignup ? "bg-gray-800 text-zinc-100": "bg-gray-400 text-zinc-900"} cursor-pointer text-[30px] py-2 px-4 rounded-xl`} onClick={()=>setIsSignup(true)}>Login</span> <span className={`${isSignup ? "bg-gray-400 text-zinc-900 ": "bg-gray-800 text-zinc-100"} cursor-pointer text-[30px] py-2 px-4 rounded-xl`} onClick={()=>setIsSignup(false)}>SignUp</span> </div>

   {isSignup ? <>
    <form className="flex flex-col bg-white text-zinc-800 w-80 h-60 p-5 rounded-xl justify-center gap-3 shadow-lg  shadow-grey-950" onSubmit={(e) => handleLogin(e)}>
      <label htmlFor="email">Email</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="email" 
             name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="password" 
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />

      <input className="bg-gray-500 text-white rounded-md p-1 mt-1 cursor-pointer" type="submit"/>
    </form> 
   </> : <>
   <form className="flex  bg-white text-zinc-800 w-[600px] h-70 p-5 rounded-xl justify-center gap-3 shadow-lg  shadow-grey-950" onSubmit={(e) => handleRegister(e)}>
      <div className="flex flex-col gap-3"> 
      <label htmlFor="name">Username</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="name" 
             name="name"
             value={username}
             onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="email">Email</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="email" 
             name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)} /> 

      <input className="bg-gray-500 text-white rounded-md p-1  cursor-pointer mt-7" type="submit"/>
      </div>
     
     <div className="flex flex-col gap-3">
     <label htmlFor="password">Password</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="password" 
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />

      <label htmlFor="c_password">Confirm Password</label>
      <input className="bg-gray-100 rounded-md p-1"
             type="password" 
             name="c_password"
             value={Cpassword}
             onChange={(e) => setCpassword(e.target.value)} />

    
     </div>
      
    </form> 
   </>
    }
        
        {
            isLoading && "Loading ....."
        }

    </div>
     
    
    
    
    </>
  )
}

export default Login
