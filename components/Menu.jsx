import {FaRegNewspaper} from "react-icons/fa"
import {MdOutlineExplore, MdOutlineNoteAlt, MdOutlineCollectionsBookmark} from "react-icons/md"
import {BiTrendingUp} from "react-icons/bi"
import {AiOutlineArrowRight} from "react-icons/ai"

const Menu = ({icon, title}) => {

    const availableIcons = {
        FaRegNewspaper,
        MdOutlineExplore,
        MdOutlineNoteAlt,
        MdOutlineCollectionsBookmark,
        BiTrendingUp,
        AiOutlineArrowRight,
    };
       
    const getCorrectIcon = (givenName) => {
           return availableIcons[givenName];
    }
    const Icon = getCorrectIcon(icon);

  return (
    <button className='hover:bg-[#f0f5ff] px-[20px] py-[10px] w-full rounded-lg'>
        <div className='flex items-center justify-start gap-3'>
            <Icon className='text-xl'/>
            <p className='text-base'>{title}</p>
        </div>
    </button>
  )
}

export default Menu