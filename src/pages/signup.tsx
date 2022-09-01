import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect } from "react"
import { Form } from "../components/form"
import Layout from "../components/layout"
import { Login } from "../components/login";
import { FormType, SignUpForm } from "../hooks/SetForm";
import { client } from "./_app";

interface SignupProps { };

const Signup: FC<SignupProps> = ({ }): JSX.Element => {

    const handleRequest = async (data: FormType<SignUpForm>) => {
        if (data.password !== data.confirm_password) {
            return <PasswordError />
        }
        const res = await client.mutation('mongo.sign-up', data);
        if (res.result === 'ACCOUNT_EXISTS') return <Exists />
        return <Success data={data} />
    }

    const Exists: FC = (): JSX.Element => {
        return (
            <div className='fixed top-0 left-0 flex w-screen h-screen fixed z-10 flex-col justify-center items-center'
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}>
                <div className="h-1/2 w-1/2 flex flex-col items-center justify-center bg-grey text-white">
                    <span className="h-1/6 w-full flex flex-col justify-evenly items-center">
                        <h2 className='text-xl'>It looks like you have already created an account with us</h2>
                        <Link href='/signup'>
                            <a>
                                <p onClick={e => { if (window.location.pathname === '/signup') { window.location.reload() } }}>
                                    Sign up with a new account?
                                </p>
                            </a>
                        </Link>
                    </span>
                    <Login />
                </div>
            </div>)
    }

    type SuccessProps = { data: FormType<SignUpForm> }

    const Success: FC<SuccessProps> = ({ data }): JSX.Element => {

        useEffect(() => {
            const handleRequest = async () => {
                const res = await client.mutation('mongo.login', { email: data.email, password: data.password });
                if (res.result) {
                    handleSuccess(data.email);
                }
            }
            handleRequest();
            const handleSuccess = async (email: string) => {
                signIn().then((data) => {
                })
                // login binds session to document which can then be used to access document without user input
            }
        })

        return (
            <p></p>
        )
    }
    const PasswordError: FC = (): JSX.Element => {

        return (
            <p>Passwords do not match</p>
        )
    }

    return (
        <>
            <Head>
                <meta name="description" content="Signup to kleanse today" />
            </Head>
            <Layout>
                <div className='w-screen flex flex-col items-center'>
                    <div className='h-screen justify-center flex items-center flex-col w-1/3' style={{ minWidth: '20rem' }}>
                        <button className='h-12 w-full bg-salmon m-4'>Sign up with google</button>
                        <Form
                            formData={{ firstname: '', lastname: '', email: '', password: '', hidden: '', confirm_password: '', }}
                            buttons={['day', 'month', 'year']}
                            onResponse={e => handleRequest(e)}
                        />
                        {/** pass types to create input fields, pass endpoint to target, buttons only needs definition for date of birth elements */}
                        {/** onResponse returns complete form obj */}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Signup