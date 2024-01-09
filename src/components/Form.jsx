import React from 'react'
import { useForm } from "react-hook-form";
import {useCreateMutation,useUpdateMutation} from '../apis/note.apis'
import {motion} from 'framer-motion'
const Form = ({title, description,_id,heading,fun}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const [createNotes, noteResult] = useCreateMutation();
      const [updateNotes, noteUpates] = useUpdateMutation();
      const onSubmit = (data) => {
        if(_id){
            updateNotes({data,_id})
            .unwrap()
            .then(()=>{
                fun()
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
        if (!_id) {
            createNotes(data)
            .unwrap()
            .then(()=>{
                fun()
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
      }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='sm:w-1/3 w-full h-auto flex justify-center items-center flex-col gap-2 relative'>
        <h1 className='font-bold'>{heading}</h1>
        <input type="text" className='w-full px-4 py-2 focus:outline-none ' placeholder='Title' {...register('title', {required:"Title required"})} defaultValue={title?title:""}/>
        <textarea id="" cols={30} rows={10} className='w-full resize-y px-4 py-2 focus:outline-none ' placeholder='Description' {...register('description',{required:'Description required'})} defaultValue={description?description:""}></textarea>
        <button type='submit' className='bg-black text-lg rounded-md px-4 py-2 text-white '>SUBMIT</button>
        <motion.button type="button" className='absolute top-2 right-2 text-sm' whileHover={{fontSize:"13px"}} transition={{duration:0.3,type:"spring"}} onClick={()=>fun()}>❌</motion.button>
    </form>
  )
}

export default Form