import React, { useState } from 'react'
import './Register.css'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';
import { GiConsoleController } from 'react-icons/gi';


const Register = () => {
    //  =========== useState part
     const [show, setShow] = useState(false)
     const [fromData, setFormData] = useState({userName:'', email:'', password:''})
     const [error, setError] = useState({userNameError:'', emailError:'', passError:''})

    //  ========== firebase variables
    const auth = getAuth();


    // ============ function part
     const handleSubmit = (e)=>{
      e.preventDefault() //stop reloading
      if(fromData.userName == ''){
        setError((prev) =>({...prev, userNameError:'Enter your Name'}))
      }
      if(fromData.email == ''){
        setError((prev) =>({...prev, emailError:'Enter email'}))
      }
      if(fromData.password == ''){
        setError((prev) =>({...prev, passError:'Enter password'}))
      }
      else{
        createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
           .then((userCredential) => {

             const user = userCredential.user;
             console.log(user)

            // ============ update user name and photo

            updateProfile(auth.currentUser, {
              displayName: fromData.userName, 
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            
            .then(() => {

              // ========= sending verification email
              sendEmailVerification(auth.currentUser)
              .then(() => {
                toast.info('Email varify first!', {
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
               });
              
            })
            .catch((error) => {
              
            });

            
            //================= success toast

            //  toast.success('Successfully Registered!', {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            //   transition: Bounce,
            //   });


              // setFormData((prev)=>({...prev, userName:'', email:'', password:''}));


              
             
           })
           .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
            //  console.log(errorCode)
             if(errorCode == 'auth/email-already-in-use' ){
              // ------------ error toast
              toast.error('Email has already used!', {
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
             if(errorCode == 'auth/weak-password'){
              toast.error('Please set strong password!', {
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
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto bg-[#0A97B0] border border-gray-300 rounded-2xl p-8 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
        

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <p className='text-[16px] text-red-600 font-semibold'>{error.userNameError}</p>
              <input onChange={(e)=>{setFormData((prev)=>({...prev, userName:e.target.value})), setError((prev)=>({...prev, userNameError:''}))}} name="name" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Your Name" />
            </div>


            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <p className='text-[16px] text-red-600 font-semibold'>{error.emailError}</p>
                <input onChange={(e)=>{setFormData((prev)=>({...prev, email:e.target.value})), setError((prev)=>({...prev, emailError:''}))}} name="password" type="mail" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Email" />
            </div>


            <div className='relative'>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <p className='text-[16px] text-red-600 font-semibold'>{error.passError}</p>
              <input onChange={(e)=>{setFormData((prev)=>({...prev, password:e.target.value})), setError((prev)=>({...prev, passError:''}))}} name="cpassword" type={show? "text" : "password"} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
              {
                show?
                <IoEyeOutline  onClick={()=>setShow(false)} className='absolute top-[50%] translate-x-[-50%] text-gray-500 right-[5px] text-xl' />
                :
                <IoEyeOffOutline onClick={()=>setShow(true)} className='absolute top-[50%] translate-x-[-50%] text-gray-500 right-[5px] text-xl' />

              }
              


            </div>

            
          </div>

          <div className="!mt-12">
           
            <button onClick={handleSubmit} type='button' className="w-full bg-red-300 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:text-white shadow-white ">
            Register </button>
            {/* <button onClick={handleSubmit} type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Create an account
            </button> */}

          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register
