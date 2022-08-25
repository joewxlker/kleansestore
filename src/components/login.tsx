import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { FormType, LoginForm } from "../hooks/SetForm";
import { client } from "../pages/_app";
import { Form } from "./form";

interface LoginProps { }
export const Login: FC<LoginProps> = ({ }): JSX.Element => {

    const [errer, setError] = useState<string | null>(null);
    const { data: session } = useSession()
    // using session here to render login / logout

    const handleRequest = async (data: FormType<LoginForm>) => {
        const res = await client.mutation('mongo.login', data);
        res.result ? signIn() : setError('INVALID INPUT');
    }

    // if (session) {
    //     return (
    //         <>
    //             <button onClick={e => signOut()}>Log out</button>
    //         </>
    //     )
    // }
    return (
        <>
            <Link href={'/signup'}><a><p className=' relative bottom-0 text-white text-center'>Don&#39;t have an account? Sign up here</p></a></Link>
            <Form formData={{ email: '', password: '', hidden: '' }} buttons={[]} onResponse={handleRequest} />
            {errer !== null && <h1 className='text-white text-center'>{errer}</h1>}
        </>
    )

}