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
     <div className='px-2 md:px-6 mt-4 md:mt-6 flex gap-3'>
        <Menubar />
        <Feed />
        <Widgets />
     </div>
    </section>
  )
}

export default Home