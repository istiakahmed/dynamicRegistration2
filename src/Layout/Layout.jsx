import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {
  //  =========== taking data from redux
  const reData = useSelector((state)=>state.CurrentUser.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(reData == null){
      navigate('/login')
    }

  },[])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
