"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import Avatar from './generator/avatar'
import DarkMode from './utils/dark-mode/dark-mode'
import { useRouter } from 'next/navigation'


const getUser = async () => {
    const supabase = createClient()
    const { data: user } = await supabase?.auth?.getUser()

    return user
}
const Navbar = () => {
    const router = useRouter()
    const supabase = createClient()
    const [userData, setUserData] = useState<User | null>()


    useEffect(() => {
        const getUserData = async () => {
            const res = await getUser()
            setUserData(res.user)
        }

        getUserData()
    }, [])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUserData(null)
            return router.replace(`/`);
        }
    };


    return (
        <div className="fixed top-0 navbar container bg-base-100 px-8 py-2 drop-shadow-sm z-50">
            <div className="flex-1">
                <label htmlFor="sidebar" aria-label="open sidebar" className="btn btn-ghost">
                    <i className=" fi fi-br-menu-burger"></i>
                </label>
            </div>
            <input id="sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu px-4 gap-y-2 w-80 min-h-full bg-base-200 text-base-content">
                    <li><DarkMode /></li>
                    <hr />
                    <li>
                        <Link href={`/protected/${userData?.id}`} className="flex items-center justify-between btn btn-secondary">
                            <span className="tracking-wider">Home</span>
                            <i className="fi fi-rs-home"></i>
                        </Link>
                    </li>
                    <li >
                        <button onClick={handleSignOut} className="flex items-center justify-between">
                            <span className="tracking-wider">Logout</span>
                            <i className="fi fi-rs-sign-out-alt"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-none">
                {userData ? (<div className='flex gap-2 items-center avatar dropdown dropdown-bottom'>
                    {userData?.email}
                    <div tabIndex={0} role='button' className='rounded-full'>
                        <Avatar email={userData?.email as string} />
                    </div>
                    <ul className="p-2 shadow menu dropdown-content right-1 top-1  z-[1] bg-base-100 rounded-box w-52 ">
                        <li >
                            <button onClick={handleSignOut} className="flex items-center justify-between">
                                <span className="tracking-wider">Logout</span>
                                <i className="fi fi-rs-sign-out-alt"></i>
                            </button>
                        </li>
                    </ul>
                </div>) : (<Link href={"/login"} className='btn btn-ghost text-secondary'>Login <i className="fi fi-sr-sign-in-alt"></i></Link>)}
            </div>
        </div >
    )
}
export default Navbar