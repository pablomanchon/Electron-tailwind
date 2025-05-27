import React from 'react'

export default function Main({ children }) {
  return (
    <main className='md:col-start-2 p-2 h-screen w-full min-h-screen overflow-y-auto bg-cyan-800'>
      <div className='bg-gray-900 w-full h-full rounded shadow-inner shadow-black border-black border-2 flex flex-col items-center overflow-auto relative'>
        {children}
      </div>
    </main>
  )
}
