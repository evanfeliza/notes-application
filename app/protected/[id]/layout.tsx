import React from 'react'
import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/server";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';

const ProtectedPageLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="h-screen mx-auto container">
            <Navbar />
            <div className='max-h-full h-full flex flex-col'>
                <div className='max-h-full h-full'>
                    {children}
                    <Footer />
                </div>

            </div>

        </div>
    )
}

export default ProtectedPageLayout