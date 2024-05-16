'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ShortenForm() {
    const router = useRouter()
    const [Link,setLink] = useState()
    const [Disable,setDisable] = useState(true)
    const [Hiddencopy,setHiddencopy] = useState(true)
    const [Hiddencopied,setHiddencopied] = useState(true)
    const onchangehandler = (e) =>{
        setHiddencopy(true)
        console.log(e.target.value);
        if(e.target.value){
            setDisable(false)
        }else{setDisable(true)}
        setLink(e.target.value)
    }
    const onsubmithandler = async (e) =>{
        setDisable(true)
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/link`,{
            method:"POST",
            body:JSON.stringify({
                'origin':Link
            })
        })
        if(!response?.status === 201){
            return
        }
        setHiddencopy(false)
        const data = await response.json()
        
        setLink(`${process.env.NEXT_PUBLIC_URL}${data.data.uniqueID}`)
        router.refresh()
    }
    const copy = (e) => {
        navigator.clipboard.writeText(Link);
        setHiddencopied(false)
        setTimeout(()=>{setHiddencopied(true)},3000)
      }

  return (
    <>
        <form onSubmit={onsubmithandler} className="flex flex-col md:flex-row justify-center items-center md:items-stretch w-full gap-4">
            <input className="bg-transparent border w-[25%] h-10 min-w-56 rounded-md text-white items-center p-3 focus:outline-none"
            onChange={onchangehandler} value={Link}></input>
            <button type='submit' className="bg-cyan-600 px-7 h-10 max-w-96 rounded-md font-semibold text-white text hover:bg-cyan-700 duration-200 disabled:bg-slate-800 disabled:text-slate-400"
            disabled={Disable} hidden={!Hiddencopy}>Shorten !!</button>
            <button type='button' className="bg-cyan-600 px-7 h-10 max-w-96 rounded-md font-semibold text-white text hover:bg-cyan-700 duration-200 disabled:bg-slate-800 disabled:text-slate-400"
            onClick={copy} hidden={Hiddencopy}>COPY</button>
            <span className='text-white self-center' hidden={Hiddencopied}>Copied!</span>
        </form>
    </>
  )
}
