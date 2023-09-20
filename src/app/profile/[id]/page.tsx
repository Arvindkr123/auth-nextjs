import React from 'react'

export default function UserProfile({ params }: any) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl'>User Profile</h1>
            <p className='my-4'>User Name <span className='bg-pink-600 px-3 py-2 rounded-md ml-3'>{params.id}</span></p>
        </div>
    )
}


