"use client";

import {AiFillFire, AiOutlineArrowLeft} from "react-icons/ai"
import {CiSearch} from "react-icons/ci"
import {IoMdNotifications} from "react-icons/io"
import {BsFillMoonFill, BsFillPencilFill} from "react-icons/bs"
import {BiGitBranch} from "react-icons/bi"
import Link from "next/link"
import { signOut } from "next-auth/react"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from "next/navigation";

const Navbar = ({ session, blogPage, creator }) => {

 const router = useRouter();
 const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className={`p-2 flex items-center justify-between border-b-[1px] md:px-[1.5rem] md:py-[15px] left-0 top-0 right-0 z-10`}
    style={{position : blogPage ? '' : 'sticky', backgroundColor: blogPage ? '#2962FF' : 'white', color: blogPage? 'white': 'black'}}
    >
        <div>
            {
                blogPage 
                ? <div className='flex gap-7 items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}>
                        <AiOutlineArrowLeft style={{fontSize: '1.5rem'}}/>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div className='w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-3xl'>
                            <img className='rounded-3xl' src={creator?.image} alt="" />
                        </div>
                        <div>
                            <p className='text-sm md:text-base font-semibold'>{creator?.username}</p>
                            <p className='text-[10px] md:text-xs'>{creator?.email}</p>
                        </div>
                    </div>
                </div>
                : <div className='flex items-center justify-start gap-[1px]'>
                    <AiFillFire style={{color:'#2962FF', fontSize: '2rem'}}/>
                    <h2 className='text-xl md:text-3xl font-black'>blogspot</h2>
                  </div>
            }
        </div>

        {!blogPage ?
            <div className={`hidden md:flex p-[10px] w-[55%] rounded-3xl border-[1.5px] gap-2 items-center`}>
                <CiSearch className='text-lg'/>
                <input type="text" placeholder='Search for tags, people, articles and many more' className='w-full outline-none bg-transparent'/>
            </div>
            : ''
        }

        <div className='flex items-center justify-center gap-2'>
            <Link href='/draft' className='px-[10px] py-[7px] flex items-center justify-center gap-2 md:px-[17px] md:py-[10px] bg-[#2962FF] hover:bg-[#3b6fff] text-white rounded-3xl lg:mr-5'
             style={{visibility: blogPage ? 'hidden' : 'visible'}}
            >
                <BsFillPencilFill />
                <button className='font-medium'>Write</button>
            </Link>

            {!blogPage &&
                <div className='flex items-center justify-center gap-4'>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <BiGitBranch style={{fontSize: '25px', cursor: 'pointer'}}/>
                        <IoMdNotifications style={{fontSize: '25px', cursor: 'pointer'}}/>
                        <BsFillMoonFill style={{fontSize: '20px', cursor: 'pointer'}}/>
                    </div>

                    <div className="flex">
                        <button>
                            <Image src={session?.user.image} 
                            width={35}
                            height={35}
                            className='rounded-3xl bg-blue-400 ml-[10px] cursor-pointer' title='Sign Out' alt="profile" 
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                            />
                        </button>
                        {toggleDropdown && (
                            <div className='absolute z-10 right-5 top-12 h-fit mt-3 p-3 rounded-lg bg-white w-[9rem] border-[1.5px] flex flex-col gap-2 justify-end items-end'>
                                <Link
                                href='/profile'
                                className='text-[#2962FF] hover:text-[#3b6fff]'
                                onClick={() => setToggleDropdown(false)}
                                >
                                My Profile
                                </Link>

                                <button
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className='mt-3 w-full p-[5px] bg-[#2962FF] hover:bg-[#3b6fff] text-white text-sm rounded-3xl'
                                >
                                Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    </nav>
  )
}

export default Navbar