import React from 'react'
import './Navbar.css'
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';


const Navbar = () => {
  //  =========== taking data from redux
  const reData = useSelector((state)=>state.CurrentUser.value)

  return (
    <>
    <nav className='main_menu'>
        <div className="container"> 
           <div className='flex justify-end'>
            <div className='userProfile flex items-center gap-3'>
              <div className='userPhoto overflow-hidden border-2 border-black w-[50px] h-[50px] rounded-full bg-slate-500'>
                <img src={reData?.photoURL} alt="" />
              </div>
              <h2 className='text-xl font-semibold '>{reData?.displayName}</h2>
              <FaSignOutAlt className='text-2xl text-slate-500'/>

            </div>
            </div> 
        </div>

    </nav>
    </>
  )
}

export default Navbar
