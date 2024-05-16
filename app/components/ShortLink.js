'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";

export default function ShortLink({id,origin}) {
  const router = useRouter()
  const [hidden,SetHidden] = useState(false)

  const handledelete = async (e) => {
    SetHidden(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/link`,{
            method:"DELETE",
            body:JSON.stringify({
                'id':id
            })
        })
        router.refresh()
  }

  return (
    <>
        <div className='flex flex-row text-white'>
          <div className='flex flex-row gap-3 items-center'>
            <Link href={origin} rel="noopener noreferrer" target="_blank" className='flex flex-row w-fit'>
              <p>{process.env.NEXT_PUBLIC_URL}{id}</p>
              <div className='bg-yellow-50 w-[0.5px] mx-3'></div>
              <p>{origin}</p>
            </Link>
            <button type='button' onClick={handledelete}>
              <MdDeleteForever className='bg-red-600 w-8 h-6'/>
            </button>
          </div>
        </div>
    </>
  )
}
