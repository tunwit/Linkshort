'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Signoutbutton() {
  return (
    <>
        <button className="text-red-800 font-medium" onClick={()=>signOut()}>Sign out</button>
    </>
  )
}
