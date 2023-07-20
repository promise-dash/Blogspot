"use client";

import Navbar from '@components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsBook, BsBookmark, BsChatText, BsHeart, BsShare } from 'react-icons/bs';

const BlogPost = (props) => {

  const id = props.params.id;
  const [blogDetails, setBlogDetails] = useState({});

  const wpm = 265;
  const words = blogDetails?.content?.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wpm);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();

      setBlogDetails(data);
    }

    fetchBlogDetails();
  }, []);

  console.log(blogDetails);

  return (
    <section>
      <Navbar blogPage={true} creator={blogDetails.creator}/>
      <div className='max-w-[90%] md:max-w-[80%] lg:max-w-[70%] m-auto mt-[1.5rem] relative'>
        <img className='h-[15rem] md:h-[25rem] lg:h-[30rem] w-full mb-[3rem] rounded-2xl' src={blogDetails?.image} alt="" />
        <h1 className='text-center text-4xl md:text-5xl font-bold mb-[3rem]'>{blogDetails?.title}</h1>
        <div className='flex items-center justify-evenly'>
          <div className='flex items-center gap-3'>
            <img className='w-[2.7rem] h-[2.7rem] rounded-3xl' src={blogDetails?.creator?.image} alt="" />
            <p className='font-semibold text-[17px]'>{blogDetails?.creator?.username}</p>
          </div>

          <div className={`flex items-center gap-2 px-[20px] py-[10px] rounded-3xl border-[1px]`}>
            <BsBook className='text-[#2962FF]'/>
            <p>{readingTime} min read</p>
          </div>
        </div><br />
        <div className='text-[1.2rem]' dangerouslySetInnerHTML={{ __html: blogDetails?.content }}/>
        <br />
        <div className={`flex items-center gap-5 max-w-fit mx-auto sticky bottom-[25px] px-[30px] py-[10px] rounded-3xl z-5 text-lg shadow-lg bg-white`}>
            <div className=' flex items-center gap-2'>
              <BsHeart className='cursor-pointer'/>
            </div>
            <div className='w-[1px] h-[1.2rem] bg-slate-300'></div>
            <div className=' flex items-center gap-2'>
              <BsChatText className='cursor-pointer'/>
            </div>
            <div className='w-[1px] h-[1.2rem] bg-slate-300'></div>
            <div className=' flex items-center gap-2'>
              <BsBookmark className='cursor-pointer'/>
            </div>
            <div className='w-[1px] h-[1.2rem] bg-slate-300'></div>
            <div className=' flex items-center gap-2'>
              <BsShare className='cursor-pointer'/>
            </div>
        </div>
      </div>
      <br />
    </section>
  )
}

export default BlogPost;