import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { client } from "../../pages/_app";
import { Form } from "../form";

export const Footer: FC = (): JSX.Element => {

    const [success, setSuccess] = useState(false)

    const handleResponse = async (data: {email: string}) => {
        const res = await client.mutation('mongo.add-maillist', { email: data.email })
        setSuccess(res.result === 'ADDED_MAILLIST')
        return null
    }

    return (
        <div id='hardfadein' className='flex bg-grey p-5 text-white flex-col justify-center items-center' style={{ color: 'rgb(150,150,150)' }}>
            <div className='flex flex-row items-center justify-center h-full flex-wrap'>

                <div className='flex lg:flex-row justify-evenly h-5/6 mx-20 mb-12 md:flex-col flex-col' style={{ color: 'rgb(150,150,150)' }}>
                    <div className='lg:w-1/6 pl-8 w-full mr-8 h-full'>
                        <Image alt='kleanse logo' src='/images/kleanse-logos/kleanse-k.svg' height={200} width={200} />
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>FIND US HERE</h3>
                        <span className="flex flex-col items-start h-full w-full justify-evenly">
                            <Link href='https://www.facebook.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/facebook-f-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-3">Facebook</p></span></Link>
                            <Link href='https://www.instagram.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/instagram-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-3">Instagram</p></span></Link>
                            <Link href='https://www.twitter.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/twitter-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-8">Twitter</p></span></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>KLEANSE</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link className='' href='/about'><span className=''><p>About Kleanse</p></span></Link>
                            <Link className='' href='/help/careers'><span className=''><p>Careers</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>Code of Ethics</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>Privacy Policy</p></span></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 h-full flex flex-col items-start pt-4'>
                        <h3>HOW CAN WE HELP</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link href='/help/general/shipping'><span className=''><p>Shipping</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>FAQ&#39;s</p></span></Link>
                            <Link className='' href='/help/unsubscribe'><span className=''><p>Unsubscribe</p></span></Link>
                        </span>
                    </div>
                </div>

                <div className="lg:w-2/6 flex flex-col items-center justify-start">
                    {!success ? <>
                        <div className=' w-full flex flex-col items-center p-8'>
                            <h1 className="text-lg p-3" >Join our mailing system</h1>
                            <p className='text-sm'>By entering your email address below,
                                you consent to receiving our newsletter
                                with access to our latest collections,
                                events and initiatives. More details on
                                this are provided in our Privacy Policy</p>
                        </div>
                        <div className='w-80 h-full'>
                            <Form formData={{ email: '', hidden: '' }} onResponse={(e) => handleResponse(e)} buttons={[]} ></Form>
                        </div>
                    </> :
                        <div className=' w-full flex flex-col items-center p-8'>
                            <p>Thank you for joining our mailing system</p>
                        </div>
                    }
                </div>

            </div>
            <p className='text-sm center'>© 2016-2020 Kleanse - All rights reserved. SIAE LICENCE SIAE LICENCE # 2294/I/1936 and 5647/I/1936</p>
        </div>
    );
}
