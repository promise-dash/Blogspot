import {RxMagicWand} from "react-icons/rx"
import {AiOutlineStar} from "react-icons/ai"
import {IoMdTime} from "react-icons/io"
import {FiFilter} from "react-icons/fi"
import {BsViewList} from "react-icons/bs"
import BlogCard from './BlogCard'
import { useEffect, useState } from "react";

const Feed = () => {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
   const fetchPosts = async () => {
      const response = await fetch("/api/blog");
      const data = await response.json();
  
      setPosts(data);
    }

    fetchPosts();
  }, []);



  return (
    <section className='basis-[64%] border-[1px] rounded-lg'>
      <div className='w-full'>
      <div className='flex items-center justify-between px-[20px] pt-[20px] pb-[10px] border-b-[1px] text-lg'>
        <div className='flex items-center gap-7'>
          <button className='flex items-center gap-1 text-[#2962FF]'>
            <RxMagicWand style={{color:'#2962FF'}}/>
            <p>Personalized</p>
          </button>
          <button className='flex items-center gap-1'>
            <AiOutlineStar/>
            <p>Featured</p>
          </button>
          <button className='flex items-center gap-1'>
            <IoMdTime />
            <p>Recent</p>
          </button>
        </div>
        <div className='flex items-center gap-10'>
          <button className='flex items-center gap-1'>
            <FiFilter />
          </button>
          <button className='flex items-center gap-1'>
            <BsViewList />
            <p>View</p>
          </button>
        </div>
      </div>
      </div>

      {/* map through the blogs and display them here */}
      {posts.map((post) => {
        return(
          <BlogCard post={post}/>
        )
      })}
    </section>
  )
}

export default Feed
