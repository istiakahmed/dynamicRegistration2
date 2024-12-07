import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../../Slice/UserSlice';





const Login = () => {
  // =========== useState part
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({email:'', password:''})
  const [error, setError] = useState({EmailError:'', passwordError:''})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // =========== fireBse Variables
  const auth = getAuth();


  // ========== Function part 
  const handleSubmit =(e)=>{
    e.preventDefault()
    if( formData.email == ''){
      setError((prev) =>({...prev, EmailError:'Enter email'}))
    }
    if( formData.password == ''){
      setError((prev) =>({...prev, passwordError:'Enter email'}))
    }
    else{
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ========== Navigate to Home page
    
      if(user.emailVerified == true){
        navigate('/')
        toast.success('Email is verified', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
          // ========== store the user data
          // ====== reducers: incrementByAmount, calling in dispatch

          dispatch(incrementByAmount(user))

        // ========= keeping data in local storage
        localStorage.setItem('dataUser', JSON.stringify(user))

      }else{

        toast.error('Email is not verified', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }

      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode){
        toast.error('Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
      });
    }
  }


  return (
    <>
    <div className='logIn-Istiak'>
        <div className='logInData-Istiak'>
            <form>
              <div className='log-content'>
              <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
              </div>

              <div>
              <label className="text-gray-800 text-md mb-2 block">Email</label>
              <p className='text-[16px] text-red-600 font-semibold'>{error.EmailError}</p>
                <input onChange={(e)=>{setFormData((prev)=>({...prev, email:e.target.value})), setError((prev)=>({...prev, EmailError:''}))}} name="password" type="mail" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Email" />
              </div>

              </div>

              <div className='mt-2 relative'>
              <label className="text-gray-800 text-md mb-2 block">Password</label>
              <p className='text-[16px] text-red-600 font-semibold'>{error.passwordError}</p>
              <input onChange={(e)=>{setFormData((prev)=>({...prev, password:e.target.value})), setFormData((prev)=>({...prev, passwordError:''}))}}  name="cpassword" type={show? "text" : "password"} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
              {
                show?
                <IoEyeOutline onClick={()=>setShow(false)} className='absolute top-[50%] translate-x-[-50%] text-gray-500 right-[5px] text-xl' />
                :
                <IoEyeOffOutline onClick={()=>setShow(true)} className='absolute top-[50%] translate-x-[-50%] text-gray-500 right-[5px] text-xl' />
              }
             
              </div>

              <div className="!mt-12">
           
              <button onClick={handleSubmit} type='button' className="w-full bg-[#6439FF] hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:text-white shadow-white transition ease-in duration-500 ">
              Login </button>
               {/* <button onClick={handleSubmit} type="button" classNameName="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Create an account
               </button> */}

               </div>
               

               <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            {/* ============== social link========== */}
            
            <div className='socialLink'>
              <button type='submit' className='btnOne'>
                <a href='https://www.google.com/' className='flex gap-3' >
                <FcGoogle className='text-2xl' /> 
                <p className='text-[20px] text-[#E4E0E1] font-medium'>Google</p>
                </a>

              </button>
              <button type='submit' className='btnTwo'>
                <Link to={'https://www.facebook.com/'} className='flex gap-3'>
                <MdFacebook className='text-2xl text-blue-800' />
                <p className='text-[20px] text-[#E4E0E1] font-medium'>Facebook</p>
                </Link>

              </button>

            </div>

            <div>
               <p className="text-gray-800 text-sm mt-6 mb-4 text-center">Don't have an account? <Link to={'/register'} className="text-[#FCFAEE] font-semibold hover:underline ml-1">Register</Link></p>
               </div>

                
            </form>

        </div>

    </div>
    </>
  )
}

export default Login
