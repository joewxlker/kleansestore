import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { ContactFormComponent } from "../..";
import { Layover } from "../../../../components/layover";
import HelpLayout from "../../layout";

const Shipping: NextPage = () => {

    const [contact, setContactForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <div className='flex flex-col justify-start items-center h-screen  pt-18'>
                    <h1 className='text-2xl'>Shipping Info</h1>
                    <div className='w-screen h-4/6 flex flex-row justify-center items-start'>
                        <div className='my-20 w-1/2 h-4/6 flex flex-col items-center justify-start'>
                            <h2 className='text-xl p-8'>Frequent shipping issues</h2>
                            <ul className='h-full flex flex-col justify-evenly items-center'>
                                <Link href='/help/general/shipping/tracking-orders'><li className='p-2 cursor-pointer'>Didn&apos;t receive a tracking order?</li></Link>
                                <Link href='/help/general/shipping'><li></li></Link>
                                <Link href='/help/general/shipping'><li></li></Link>
                            </ul>

                        </div>
                        <div className='my-20 w-1/2 h-4/6 flex flex-col items-center justify-start'>
                            <h2 className='text-xl p-8'>How do we handle shipping at KLEANSE?</h2>
                            <p>Kleanse is a small start up based in perth australia and currently only ships to australian states </p>
                        </div>
                    </div>
                    <span className='flex flex-col justify-center items-center'>
                        <p>Can&apos;t find what You&apos;re looking for?</p>
                        <button className='bg-grey px-4 py-3 text-white w-40' onClick={e => setContactForm(true)}>CONTACT US</button>
                    </span>
                    {contact && <Layover>
                        <div className="w-full h-full flex flex-col justify-start items-center">
                            <header className='h-12 w-full flex flex-col items-end'>
                                <button className='w-20 h-full flex items-center justify-center bg-grey text-white' onClick={e => setContactForm(false)}>x</button>
                            </header>
                            <div className="h-full w-full flex justify-center items-center">
                                <ContactFormComponent />
                            </div>
                        </div>
                    </Layover>}
                </div>

            </HelpLayout>
        </>

    )
}

export default Shipping