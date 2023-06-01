"use client";

import Feed from "@components/Feed"
import Menubar from "@components/Menubar"
import Navbar from "@components/Navbar"
import Widgets from "@components/Widgets"

import { useSession } from "next-auth/react";


const Home = () => {

  const {data: session} = useSession({
    required: true,
  });

  return (
    <section className="relative">
     <Navbar session={session}/>
     <div className='px-[1.2rem] mt-[1.5rem] flex gap-3'>
        <Menubar />
        <Feed />
        <Widgets />
     </div>
    </section>
  )
}

export default Home