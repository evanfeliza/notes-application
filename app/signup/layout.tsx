import DarkMode from '@/components/utils/dark-mode/dark-mode'
import React from 'react'

const SignUpLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen">
            <div className='container mx-auto relative'>
                <div className='absolute top-5 left-5 px-8 py-4'>
                    <DarkMode />
                </div>
                {children}
            </div>
        </div>
    )
}

export default SignUpLayout