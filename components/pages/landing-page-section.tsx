import React from 'react'

type Props = {}

const LandingPageSection = (props: Props) => {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-4 px-6 py-4'>
            <h1 className='text-8xl tracking-tight font-semibold'><span className='text-primary text-9xl'>Todo</span>fy.</h1>
            <p className='tracking-wider text-lg'>A <span className='font-bold text-primary hover:text-2xl duration-700'>web based application</span> that enables you to <span className='font-bold text-primary hover:text-2xl duration-700'>record</span> task or take notes for your daily activities.</p>
        </div>
    )
}

export default LandingPageSection