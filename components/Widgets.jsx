import trendingTags from "@assets/tags";
import {BiTrendingUp} from "react-icons/bi"


const Widgets = () => {

  return (
    <section className='basis-[18%] border-[1px] p-[10px] rounded-lg h-fit sticky top-[17%]'>
      <div className='flex items-center justify-start gap-3 mb-[10px]'>
        <h3 className='text-xl'>Trending tags</h3>
        <BiTrendingUp className='text-xl'/>
      </div>
        {trendingTags.map((tag, index) => {
          return(
            <div key={index} className='flex text-sm items-center justify-between hover:bg-[#f0f5ff] px-[10px] py-[10px] w-full rounded-lg cursor-pointer'>
              <p>{tag.name}</p>
              <span className='text-xs px-[5px] py-[2px] rounded-xl'>{tag.count}</span>
            </div>
          )
        })}
    </section>
  )
}

export default Widgets;