"use client";

import {AiFillFire} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {BsGithub, BsApple, BsLinkedin} from "react-icons/bs";
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Login = () => {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async() => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  return (
    <div className='grid grid-cols-2 gap-5 max-w-[80%] m-auto mt-[7rem]'>
       <div className='flex items-center justify-center gap-[1px]'>
            <AiFillFire style={{color:'#2962FF', fontSize: '3rem'}}/>
            <h2 className='text-5xl font-bold'>blogspot</h2>
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h2 className='text-[#2962FF] text-4xl font-bold mb-[1rem]'>Sign up / Log in</h2>
          
          {providers &&
            Object.values(providers).map((provider) => (
              <button type="button" className='flex items-center justify-center gap-3 w-[90%] py-[10px] rounded-3xl border-[1.5px] hover:bg-[#f0f5ff]'
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl })}
              >
                <FcGoogle style={{fontSize: '18px'}}/>
                <p>Continue with Google</p>
              </button>
            ))
          }


          {/* dummy login components */}
          <button className='flex items-center justify-center gap-3 w-[90%] py-[10px] rounded-3xl border-[1.5px] hover:bg-[#f0f5ff]'>
            <BsGithub style={{fontSize: '18px'}}/>
            <p>Continue with Github</p>
          </button>
          <button className='flex items-center justify-center gap-3 w-[90%] py-[10px] rounded-3xl border-[1.5px] hover:bg-[#f0f5ff]'>
            <BsLinkedin style={{color: "#2962FF", fontSize: '17px'}}/>
            <p>Continue with LinkedIn</p>
          </button>
          <button className='flex items-center justify-center gap-3 w-[90%] py-[10px] rounded-3xl border-[1.5px] hover:bg-[#f0f5ff]'>
            <BsApple style={{fontSize: '18px'}}/>
            <p>Continue with Apple</p>
          </button>
        </div>
    </div>
  )
}

export default Login