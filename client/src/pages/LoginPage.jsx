import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from "../context/AuthContext.jsx"

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if (!isTermsChecked) {
      alert('You must agree to the terms & policy.');
      return;
    }

    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login' , {fullName, email, password, bio})
  }

  return (
    <div className='flex min-h-screen bg-cover bg-center items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-3xl' >
      <img src={assets.orbit_logo} alt="" className='w-2xl' />

      {/* right side */}

      <form onSubmit={onSubmitHandler} className='w-sm border-2 bg-white/8 text-white border-gray-500 p-10 flex flex-col gap-7 rounded-lg shadow-lg' >
      <h2 className='font-medium text-2xl flex justify-between items-center' >
        {currState}
        {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
        
      </h2>

      {currState === "Sign up" && !isDataSubmitted && (
        <input onChange={(e) => setFullName(e.target.value)} value={fullName}
         type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' 
        placeholder='Enter Full Name' required/>
      )}
      
      {!isDataSubmitted && (
        <>
        <input onChange={(e) => setEmail(e.target.value)} value={email}
         type="email" placeholder='Enter Email Address' required className='p-2 border border-gray-500 rounded-md 
         focus:outline-none focus:ring-2 focus-ring-indigo-500' />
        <input onChange={(e) => setPassword(e.target.value)} value={password}
         type="password" placeholder='Enter Password' required className='p-2 border border-gray-500 rounded-md 
         focus:outline-none focus:ring-2 focus-ring-indigo-500' />
        </>
      )}
      
      {currState === "Sign up" && isDataSubmitted && (
        <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus-ring-indigo-500'
        placeholder='provide a short bio' required></textarea>
      )}

      <button type="submit" className='py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' >
        {currState === "Sign up" ? "Create Account" : "Login Now"}
      </button>

      <div className='flex items-center'>
        <input type="checkbox" checked={isTermsChecked} onChange={e => setIsTermsChecked(e.target.checked)} />
        <p className='ml-2' >Agree to the terms & policy.</p>
      </div>

      <div className='flex flex-col gap-2' >
        {currState === "Sign up" ? (
          <p className='text-sm text-gray-500' >Already have an account?
          <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer ml-1' >Login here</span> </p>
        ) : (
        <p className='text-sm text-gray-500' >
          New Here? <span onClick={()=> setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer' >Create an Account</span>
        </p>
      )}
      </div>

      </form>
    </div>
  )
}

export default LoginPage