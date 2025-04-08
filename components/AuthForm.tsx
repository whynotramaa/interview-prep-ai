"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
// import FormField from "./FormField"
import CustomFormField from "./FormField"
import { Form } from "./ui/form"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(5)
    })
}


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const formSchema = authFormSchema(type)

    const isSignIn = type === 'sign-in';
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if (type === 'sign-up') {
                console.log("Sign-Up", values)
                toast.success("Account created successfully. Please Sign in.")
                router.push('/sign-in')
            }
            else {
                console.log("Sign-in", values)
                toast.success("You are successfully logged in.")
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }
    }

    return (
        <>
            <div className="card-border lg:min-w-[566px]">
                <div className="flex flex-col gap-6 card py-14 px-10">
                    <div className="flex flex-row gap-2 justify-center">
                        <Image src="/logo.svg" alt="logo" height={32} width={38} />
                        <h2 className="text-primary-100">Preperr</h2>
                    </div>

                    <p className="text-sm text-center my-[-4px] opacity-55">Ace your Job interviews with AI</p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                            {!isSignIn && (
                                <CustomFormField control={form.control} name="name" label="Name" placeholder="Your Name"
                                />)}
                            <CustomFormField control={form.control} name="email" label="Email" placeholder="Your Email Address"
                            />
                            <CustomFormField control={form.control} name="password" label="Password" placeholder="Password goes here" type="password"
                            />


                            <Button type="submit" className="btn">{isSignIn ? "Sign In" : "Create an account"}</Button>



                        </form>
                    </Form>

                    <p className="text-center text-gray-500">
                        {isSignIn ? "No Account Yet" : "Have an account already"}
                        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1 underline text-gray-200">
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </Link>
                    </p>

                </div>

            </div>
        </>
    )
}

export default AuthForm