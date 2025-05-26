import React from 'react'

export default function Main({children}) {
  return (
    <div className='md:col-start-2 p-2 h-screen w-full min-h-screen overflow-y-auto flex flex-col items-center justify-center'>{children}</div>
  ) 
}
