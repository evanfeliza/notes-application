"use client"
import React from 'react'
import Link from 'next/link';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { submitSignupForm } from './actions';

type SignUpFormData = {
    email: string;
    password: string;
};


const useSignUp = () => {
    const methods = useForm<SignUpFormData>({
        shouldUseNativeValidation: true,
    });

    const onSubmit = async (formData: SignUpFormData) => {
        try {
            const res = await submitSignupForm(formData)
            if (res) {
                toast.success(`You have Successfully signed up!`, { className: "capitalize tracking-widest text-xs" })
            } else {
                throw new Error(res as string)
            }
        } catch (error) {
            toast.error(`${error}`, { className: "capitalize tracking-widest text-xs" })
        }
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(onSubmit),
    };
};

const SignUpForm = () => {
    const { register, formState: { errors }, } = useFormContext<SignUpFormData>();
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="w-96 rounded-2xl bg-base-300 drop-shadow-md px-10 py-8">
                <div className="flex flex-col gap-4 py-8">
                    <h3 className="text-3xl tracking-tight font-bold mx-auto flex-none">Sign Up</h3>
                    <p className="flex-none text-sm tracking-wider">Please enter your email and password for registration.</p>
                    <label htmlFor="email">
                        <input
                            placeholder="Email"
                            type="email"
                            autoComplete="off"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                            {...register("email", {
                                required: "Email is required", pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: `This is not a valid email address`
                                }
                            })}
                        />
                        {errors?.email && <p className="text-xs text-warning flex py-2 px-1 gap-2 items-center"><i className="fi fi-sr-info"></i>{errors.email?.message}</p>}
                    </label>

                    <label htmlFor="password">
                        <input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors?.password && <p className="text-xs text-warning flex py-2 px-1 gap-2 items-center"><i className="fi fi-sr-info"></i>{errors.password?.message}</p>}
                    </label>
                    <input type="submit" className="btn btm-nav-sm btn-outline btn-secondary uppercase tracking-widest text-accent-content" />
                    <p className='text-sm text-right'>Already have an account?<Link href={`/login`} className=' ml-2 btn-link'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

const SignUpDetails = () => {
    const { methods, handleSubmit } = useSignUp();


    return (
        <FormProvider {...methods}>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <form noValidate onSubmit={handleSubmit}>
                <SignUpForm />
            </form>
        </FormProvider>
    );
}

export default SignUpDetails