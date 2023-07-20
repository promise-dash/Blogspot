import React from 'react'
import BlogCard from './BlogCard'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import Link from 'next/link';

const Profile = ({ name, data, desc, handleEdit, handleDelete }) => {

  const router = useRouter();
  const goBack = () => {
    router.back();
  }

  return (
    <section>
      <nav className={`flex items-center justify-between border-b-[1px] px-[1.5rem] py-[15px] left-0 top-0 right-0 z-10`}
      style={{backgroundColor: '#2962FF', color: 'white'}}
      >
        <div className='flex gap-7 items-center'>
          <div className='cursor-pointer' onClick={goBack}>
            <AiOutlineArrowLeft style={{fontSize: '1.5rem'}}/>
          </div>
          <div className='flex items-center'>
            <p className='text-xl font-semibold'>{name} Profile</p>
          </div>
        </div>
        <Link href='/draft' className='flex items-center justify-center gap-2 px-[15px] py-[8px] bg-white text-[#2962FF] rounded-3xl'>
          <BsFillPencilFill />
          <button className='font-medium'>Write</button>
        </Link>
      </nav>
      
      <div className='max-w-[90%] md:max-w-[80%] m-auto mt-[3rem]'>
        <p className=''>{
          data?.length === 0 ? 'You have not created any blog yet' : desc
        }</p>
        <br />
        <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((post) => {
            return(
              <BlogCard 
                profilePage={true}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            )
          })}
        </div>
        <br />
      </div>
    </section>
  )
}

export default Profile