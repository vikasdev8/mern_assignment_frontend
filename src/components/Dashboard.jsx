import React, { useEffect, useReducer } from 'react';
import { useAllnotesQuery, useDeleteMutation } from '../apis/note.apis.js';
import { useNavigate } from 'react-router-dom';
import Form from './Form.jsx';
import {motion} from "framer-motion";
const Dashboard = () => {
    const [ ,forceUpdate ] = useReducer(x => x + 1, 0)
    const route = useNavigate();
    const { data, isError, isLoading, isSuccess } = useAllnotesQuery("",{refetchOnMountOrArgChange: true});
    const [deleteNotes, noteResult] = useDeleteMutation();
    useEffect(() => {
        console.log(isLoading,isSuccess, isError)
        if (isError && isLoading === false) {
            localStorage.removeItem('token')
            route('/')
        }
    }, [isSuccess,isError])
    const toogleAdd = (e) => {
        const classList = document.getElementById("add")?.classList;
        classList?.toggle('hidden')
        classList?.toggle('flex')
        const classList2 = document.getElementById("add2")?.classList;
        classList2?.toggle('hidden')
        classList2?.toggle('flex')
        forceUpdate()
    }
    const Logout = () => {
        localStorage.removeItem('token');
        route('/')
        forceUpdate()
    }
    return (
        <main className='w-screen h-screen flex flex-col justify-start py-8 items-center gap-2 relative'>
            {
                (isLoading === false && isSuccess === true)
                &&
                (
                    (data.data?.notes && data.data.notes.length > 0)
                        ?
                        <>
                            <h1 className='font-bold text-xl'>Notes</h1>
                            <div className='flex flex-col gap-2 bg-slate-50 rounded-md md:w-1/3 sm:w-2/3 w-10/12 h-auto overflow-y-scroll scrollX'>
                                <button className='w-full bg-slate-200 hover:bg-slate-100 py-2 px-4 rounded-md' onClick={toogleAdd}>Add +</button>
                                <motion.div id="add" className='hidden z-10 absolute top-0 left-0 w-screen h-screen bg-gray-200 px-4 py-2 justify-center items-center' layout exit={{width:"0px", height:"0px"}} whileInView={{className:"formWhileInView"}}>
                                    <Form heading={"Add Note"} fun={toogleAdd}/>
                                </motion.div>
                                {
                                    data.data.notes.map((note, i) => {
                                        const toogle = () => {
                                            const classList = document.getElementById(i)?.classList;
                                            classList?.toggle('hidden')
                                            classList?.toggle('flex')
                                            forceUpdate();
                                        }
                                        return (
                                            <>
                                                <div className='flex justify-center bg-slate-100 items-center w-full relative group'>
                                                <button className=' basis-11/12 bg-slate-100 group-hover:bg-slate-200 py-2 rounded-md flex justify-between items-center relative' key={i} onClick={(e)=>toogle(e)}>
                                                    {note.title} 
                                                </button>
                                                <motion.button type="button" className='absolute bg-slate-100 group-hover:bg-slate-200 basis-1/12 top-auto h-full right-2 text-sm' whileHover={{fontSize:"13px"}} transition={{duration:0.3,type:"spring"}} onClick={()=>deleteNotes(note._id)}>❌</motion.button>
                                                </div>
                                                <div id={i} className='hidden absolute z-10 top-0 left-0 w-screen h-screen bg-gray-200 px-4 py-2 justify-center items-center' layout exit={{width:"0px", height:"0px"}} whileInView={{className:"formWhileInView"}}>
                                                    <Form title={note.title} description={note.description} _id={note._id} heading={"Update Note"} fun={toogle}/>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <>
                            <h1 className='font-bold text-xl'>Notes</h1>
                            <div className='flex flex-col gap-2 bg-slate-50 rounded-md w-1/3'>
                                <button className='w-full bg-slate-200 hover:bg-slate-100 py-2 px-4 rounded-md' onClick={toogleAdd}>Add +</button>
                                <motion.div id="add2" className='hidden z-10 absolute top-0 left-0 w-screen h-screen bg-gray-200 px-4 py-2 justify-center items-center' layout exit={{width:"0px", height:"0px"}} whileInView={{className:"formWhileInView"}}>
                                <Form heading={"Add Note"} fun={toogleAdd}/>
                                </motion.div>
                                <p className='text-slate-600 text-lg font-bold text-center'>No Notes Avaiable</p>
                            </div>
                        </>
                )
            }
        <button className='bg-black text-white px-4 py-2 rounded-md absolute top-2 right-2 sm:text-base text-xs' onClick={Logout}>Log Out</button>
        </main>
    )
}

export default Dashboard