import React from 'react'
import ShortLink from './ShortLink'

export default async function Dashboard() {
  const response = await fetch('http://localhost:3000/api/link',{method:"GET",cache:'no-store'})
  const result = await response.json()
  return (
    <>
        <section className='flex justify-center mt-10'>
            <div className='flex flex-col justify-center h-fit items-center gap-3 py-5 mb-10 bg-gray-600 rounded-lg w-[70%]'>
                {result.data.length===0 ? <p className='text-white'>No avaliable shorten link</p>:<></>}
                <div className='flex flex-col gap-6'>
                  
                  {result.data.map(e=>{
                    return <ShortLink id={e.uniqueID} key={e.uniqueID} origin={e.origin}/>
                  })}
                </div>
            </div>
        </section>
    </>
  )
}
