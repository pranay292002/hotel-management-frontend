"use client";

import react, { useContext, useEffect, useState } from "react";
import BookingList from "@/components/bookingList/BookingList";
import Overview from "@/components/overview/Overview";
import Stats from "@/components/stats/Stats";
import Header from "@/components/header/Header";
import Schedule from "@/components/schedule/Schedule";
import UserContext from "@/context/userContext/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const user = useContext(UserContext);

  if (!user.CurrentUser && Cookies.get("username")) {
    user.update({
      username: Cookies.get("username"),
      id: Cookies.get("id"),
      email: Cookies.get("email"),
      userType: Cookies.get("userType"),
    });
  }

  useEffect(() => {
    if (!user.CurrentUser && !Cookies.get("username")) {
      setIsLoading(false);
      router.push("/login");
    }
    if (user.CurrentUser?.userType === "Owner" || user.CurrentUser?.userType === "Manager") {
      
      setIsAdmin(true);
    }

    setIsLoading(false);
  }, [user.CurrentUser, router]);

  return (
    <>
   <div className=" w-full laptop:pl-5">
   {isLoading ? (
    <div>Loading.....</div>
  ) : (
    <>
      <Header />
      <div className="flex flex-wrap justify-center ">
        {isAdmin ? (
          <>
            <div className=" ">
              <Stats />
              <Overview />
              <BookingList />
            </div>
            <div>
              <Schedule />
            </div>
          </>
        ) : (
          <div>User Dashboard</div>
        )}
      </div>
    </>
  )}
</div>
    </>
  );
}
