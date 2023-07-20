"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { BsBook } from 'react-icons/bs'

const BlogCard = ({ post: {_id, creator, title, content, image}, handleEdit, handleDelete, profilePage }) => {

  const {data: session} = useSession();
  const router = useRouter();
  const pathName = usePathname(); 
 
  const wpm = 265; 
  const words = content?.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wpm);

  const truncatedContent = content?.length > 180 ? content.slice(0, 180).concat("...") : content;

  return (
    <div key={_id}>
        <div className={`p-[20px] ${profilePage ? 'border-[1px] rounded-2xl shadow-xl' : 'border-b-[1px]'}`}>
            <div className={`flex gap-3 items-center ${profilePage ? 'mb-2' : 'mb-7'}`}>
                <div className={`${profilePage ? 'w-[2rem] h-[2rem]' : 'w-[2.5rem] h-[2.5rem]'}`}>
                    <img className='rounded-3xl' src={creator?.image} alt="" />
                </div>
                <div>
                    <p className={`${profilePage ? 'text-sm' : 'text-base'} font-semibold`}>{creator?.username}</p>
                    <p className={`${profilePage ? 'text-[10px]' : 'text-xs'}`}>{creator?.email}</p>
                </div>
            </div>
            <Link href={`/blog/${_id}`} className={`flex ${profilePage ? 'flex-col-reverse p-5' : 'flex-col sm:flex-row gap-3'}`}>
                <div className='basis-[60%]'>
                        <h3 className={`${profilePage ? 'text-[1.3rem]' : 'text-[1.7rem]'} max-w-[90%] mb-[0.5rem] font-bold`}>{
                            profilePage 
                            ? title.length > 20 ? title.slice(0, 20).concat('...') : title
                            : title
                        }</h3>
                        <div className='max-w-fit text-xs flex items-center mb-[0.5rem] gap-2 px-[10px] py-[5px] rounded-3xl border-[1px]'>
                            <BsBook className='text-[#2962FF]'/>
                            <p>{readingTime} min read</p>
                        </div>
                        <div className={`${profilePage? 'text-[13px]': 'text-[15px]'}`} dangerouslySetInnerHTML={{__html:truncatedContent}} />
                </div>
                {profilePage ? 
                    <img src={image} width='100%' className='rounded-xl mb-4'/> :
                    <div className='md:basis-[40%] h-[10rem] rounded-xl' style={{backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                }
            </Link>
            <br />
            {session?.user.id === creator._id && pathName === '/profile' && (
            <div className='flex items-center justify-end gap-3 px-[20px] text-lg'>
                <button
                className='border-[1.5px] px-[20px] py-[5px] text-base rounded-3xl'
                 onClick={handleDelete}>Delete</button>
                <button  
                 className='border-[1px] px-[25px] py-[5px] text-base text-white rounded-3xl bg-[#2962FF] hover:bg-[#3b6fff]'
                 onClick={handleEdit}>Edit</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default BlogCard