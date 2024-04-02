"use server"
import { createClient } from "@/utils/supabase/server";
type SignUpFormData = {
    email: string;
    password: string;
};

export const submitSignupForm = async (formData: SignUpFormData) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email: formData?.email, password: formData?.password });

    // if (error) {
    //     return error?.message
    // } else if (data?.user?.identities?.length === 0) {
    //     return `${formData?.email} is already in use.`
    // } else {
    //     return data?.user
    // }

    if (data?.user?.identities?.length === 0 || error) {
        return `${formData?.email} is already in use.` || error?.message
    }
};
