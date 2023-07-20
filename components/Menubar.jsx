import menubarList from '@assets/menubar';
import Menu from './Menu';

const Menubar = () => {
  return (
    <section className='hidden md:block basis-[18%] border-[1px] rounded-lg py-[10px] h-fit lg:sticky top-[17%]'>
       {menubarList.map((menu, index) => {
            return(
                <Menu key={index} icon={menu.icon} title={menu.title}/>
            )
        })}
    </section>
  )
}

export default Menubar


// bg-[#1a1a1a]