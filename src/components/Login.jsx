import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useLoginMutation,useCreateMutation } from '../apis/user.apis';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
const Login = () => {
  const route = useNavigate();
  const [SignUp, setSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    register:register2,
    handleSubmit:handleSubmit2,
    formState: { errors:errors2 },
  } = useForm();
  const [Login, result] = useLoginMutation();
  const [createUser, userResult] = useCreateMutation();
  const onLogin = (data) => { 
    console.log(data)
    Login(data).unwrap()
      .then((res) => {
        localStorage.setItem('token', `${res.data.token}`)
        route('/dashboard');
      })
      .catch((err) => {
        alert(err.message);
      })
  };
  const onSignup = (data) => {
    createUser(data).unwrap()
    .then((res) => {
      setSignUp(!SignUp)
    })
    .catch((err) => {
      alert(err.message);
    })
  };
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      route('/dashboard')
    }
  },[])
  return (
    <main className='bg-gray-100 h-screen w-screen flex justify-center items-center px-4 sm:px-auto'>
      <motion.form className={`px-4 py-4 flex flex-col justify-center items-center gap-6 ${SignUp ? 'hidden':'block'}`} onSubmit={handleSubmit(onLogin)}
       initial={{ y: 10, opacity: 0 }}
       whileInView={{y: 0, opacity: 1 }}
       exit={{y: -10, opacity: 0 }}
       transition={{ duration: 0.5 }}
      >
        <h1 className='text-lg font-bold'>Log In</h1>
        <input type="email" placeholder='Email' className='w-full sm:w-[300px] rounded-md focus:outline-none text-lg px-4 py-2' {...register('email',{required:"Email required"})} />
        <input type="password" placeholder='Password' className='w-full sm:w-[300px] rounded-md focus:outline-none text-lg px-4 py-2'{...register('password',{required:'Password required'})} />
        <div className='flex gap-2'>
          <button type='submit' className='sm:text-xl text-sm font-bold px-4 py-2 rounded-md bg-black text-white '>LOGIN</button>
          <button type='button' className='sm:text-xl text-sm font-bold px-4 py-2 rounded-md bg-black text-white 'onClick={()=>setSignUp(!SignUp)}>SIGN UP</button>
        </div>
      </motion.form>
      <motion.form onSubmit={handleSubmit2(onSignup)} className={`px-4 relative py-4 flex flex-col justify-center items-center gap-6 ${SignUp ? 'block':'hidden'}`}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}>
        <h1 className='text-lg font-bold'>Sign UP</h1>
        <input type="email" placeholder='Email' className='w-full sm:w-[300px] rounded-md focus:outline-none text-lg px-4 py-2' {...register2('email',{required:"Email required"})} />
        <input type="password" placeholder='Password' className='w-full sm:w-[300px] rounded-md focus:outline-none text-lg px-4 py-2'{...register2('password',{required:"Password required"})} />
        <div className='flex gap-2'>
          <button type='submit' className='sm:text-xl text-sm font-bold px-4 py-2 rounded-md bg-black text-white '>SUBMIT</button>
        </div>
        <button className='px-2 py-1 bg-slate-200 font-bold text-xl hover:bg-slate-300 absolute top-4 left-4 rounded-full' onClick={()=>setSignUp(!SignUp)}>{"<"}</button>
      </motion.form>
    </main>
  )
}

export default Login