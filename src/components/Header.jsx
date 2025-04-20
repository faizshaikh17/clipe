import React from 'react'

export default function Header() {
    return (
        <>
            <header className='flex justify-between h-15 px-20 py-2 w-full border border-black shadow-md transition focus:outline-hidden focus:shadow-xs items-center'>
                <h1 className='text-lg lg:text-2xl font-semibold'>Clip</h1>
                <h1 className='text-lg lg:text-2xl font-semibold'>Faiz</h1>
            </header>
        </>
    )
}
