import React from 'react'

type Props = {}

const LandingPageSection = (props: Props) => {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-4'>
            <h1 className='text-8xl tracking-tight font-semibold'>Todofy.</h1>
            <p className='tracking-wider text-lg'>A <span className='font-bold text-primary'>web based application</span> that enables you to <span className='font-bold text-primary'>record</span> task or take notes for your daily activities.</p>
        </div>
    )
}

export default LandingPageSection