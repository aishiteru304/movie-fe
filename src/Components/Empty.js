import React from 'react'

export default function Empty({ bg }) {
    return (
        <div className='flex justify-center items-center w-full min-h-[200px]'>
            <div className="w-10 h-10 bg-subMain rounded-full animate-pulse animate-expand">
                <div className={`w-6 h-6 mx-auto mt-2 ${bg} rounded-full`}></div>
            </div>
        </div>
    )
}
