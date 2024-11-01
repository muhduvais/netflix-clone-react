import React, { useState } from 'react'
import './Login.css';
import logo from '../../assets/logo.png'
import {login, signup} from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner w-full h-screen flex items-center justify-center">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login px-40 py-5'>
      <img src={logo} alt="" className='login-logo'/> 
      <div className="form-div max-w-md mx-auto my-10 rounded">
        <h1 className='text-3xl font-bold'>{signState}</h1>
        <div className="form-part flex flex-col py-8 gap-y-3">
        <form action="" className='login-form flex flex-col gap-y-3'>

          {signState === 'Sign Up' ? 
          <input value={name} onChange={(e) => {setName(e.target.value)}} type="email" name="" id="" placeholder='Your name' className=' border-gray-300 rounded'/> : <></>}

          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" name="" id="" placeholder='Your email' className=' border-gray-300 rounded'/>

          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" name="" id="" placeholder='Password' className=' border-gray-300 rounded'/>

          <button className='bg-red-600 px-2 py-2 rounded font-bold sm:font-semibold'
          onClick={userAuth} type='submit'
          >{signState}</button>

        </form>
          <span className='w-full text-center text-gray-300'>OR</span>
          <button className='bg-gray-600 bg-opacity-50 outline-none px-2 py-2 rounded font-semibold'>Use a sign-In code</button>

          {signState === 'Sign Up' ? 
          <p className='w-full text-center py-1 cursor-pointer'>Forgot password?</p> : <></>}
          
          <div className="remember-me flex gap-x-2 items-center pt-2">
            <input type="checkbox" name="" id="" defaultChecked className='custom-checkbox'/>
            <p>Remember me</p>
          </div>

          {signState === 'Sign In' ? 
          <p className='py-2'><span className='opacity-65 pr-1'>New to Netflix?</span><span className='font-semibold cursor-pointer' onClick={() => setSignState('Sign Up')}>Sign up now</span></p> :
          <p className='py-2'><span className='opacity-65 pr-1'>Already have an account?</span><span className='font-semibold cursor-pointer' onClick={() => setSignState('Sign In')}>Sign In now</span></p>}

          <p className='leading-4'><span className='text-xs opacity-60 py-4 pr-1'>This site is protected by google reCAPTCHA to ensure you are not a bot.</span><span className='text-xs text-blue-600 opacity-100'>Learn more</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login;