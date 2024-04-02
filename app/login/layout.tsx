import DarkMode from '@/components/utils/dark-mode/dark-mode'
import React from 'react'

const LoginLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen">
            <div className='container mx-auto relative'>
                <div className='absolute top-5 left-5'>
                    <DarkMode />
                </div>
                {children}
            </div>
        </div>
    )
}

export default LoginLayout