"use client"

import { userContextType } from "@/types/types";
import {createContext} from "react";

const UserContext = createContext<userContextType>({
    CurrentUser: undefined,
    update: ()=>{}
});

export default  UserContext;

