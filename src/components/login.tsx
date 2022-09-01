import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { FormType, LoginForm } from "../hooks/SetForm";
import { client } from "../pages/_app";
import { Form } from "./form";

interface LoginProps { }
export const Login: FC<LoginProps> = ({ }): JSX.Element => {

    const { data: session } = useSession()

    if (session) {
        return (
            <div className='h-1/2 w-full flex flex-col justify-evenly items-center'>
                <h1 className='text-white'> Welcome back {session.user?.email}</h1>
                <button onClick={e => signOut()} className='px-3 py-2 bg-white'>Log out</button>
            </div>
        )
    }
    return (
        <>
            <Link href={'/signup'}><a><p className=' relative bottom-0 text-white text-center'>Don&#39;t have an account? Sign up here</p></a></Link>
            <button onClick={e => signIn()} className='px-5 py-3 text-black bg-white'>LOGIN</button>
        </>
    )

}


export const Forgotten: FC = (): JSX.Element => {
    return (
        <p className='text-white'>Forgotten Password?</p>
    )
}
