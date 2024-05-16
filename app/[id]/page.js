import React from 'react'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()
export default async function page({params}) {
    const result = await prisma.linkcontainer.findUnique({
        where:{
            uniqueID:params.id
        }
    })
    if (!result){
        return(
            <div className='flex flex-col min-w-full'>
                <div className='flex flex-col mt-[30vh] items-center justify-center  gap-5'>
                    <p className='text-white text-3xl md:text-5xl font-semibold'>Page Not Found !!</p>
                    <span className='text-white'>Please try Create new like</span>
                </div>
                <div className='min-w-full h-[25vh]'></div>
                <div className='flex justify-center'>
                    <a href='/'>
                        <span className='bg-cyan-600 text-2xl px-6 py-3 rounded-md font-semibold text-white text hover:bg-cyan-700 duration-200'>
                            Create New Link
                        </span>
                    </a>
                </div>
            </div>
        )
    }
    redirect(result.origin)
  return (
    <div>page</div>
  )
}
