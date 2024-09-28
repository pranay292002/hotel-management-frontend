"use client"
import { userType } from '@/types/types';
import UserContext from './UserContext';

import React, { useState } from 'react'

const UserState = (props: { children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => {

 const [CurrentUser, setCurrentUser] = useState<userType|null|undefined>(null);

 const update = (data:userType|null|undefined)=>{
  setCurrentUser(data)
 }

  return (

    <UserContext.Provider value ={{CurrentUser, update}} >
      {props.children}
    </UserContext.Provider>

  )
}

export default UserState
