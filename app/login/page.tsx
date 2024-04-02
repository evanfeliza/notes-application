"use client"
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { submitForm } from "./actions";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";

type LoginInFormData = {
    email: string;
    password: string;
};

const useLogin = () => {
    const methods = useForm<LoginInFormData>({
        shouldUseNativeValidation: true,
    });

    const onSubmit = async (formData: LoginInFormData) => {
        try {
            const res = await submitForm(formData)
            if (res?.message) {
                throw new Error(res?.message)
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

const LoginForm = () => {

    const { register, formState: { errors }, } = useFormContext<LoginInFormData>();
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="w-96 rounded-2xl bg-base-300 shadow-md px-10 py-8">
                <div className="flex flex-col gap-4 py-8">
                    <h3 className="text-3xl tracking-tight font-bold mx-auto flex-none">Login</h3>
                    <p className="flex-none text-sm tracking-wider">Please enter your email and password to access the application.</p>
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
                    <p className='text-sm text-right '>You don't have an account?<Link href={`/signup`} className=' ml-2 btn-link'>Sign Up here!</Link></p>
                </div>
            </div>
        </div>
    );
};

const LoginDetails = () => {
    const { methods, handleSubmit } = useLogin();

    return (
        <FormProvider {...methods}>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <form noValidate onSubmit={handleSubmit}>
                <LoginForm />
            </form>
        </FormProvider>
    );
};

export default LoginDetails;
