import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ContactFormComponent } from "../..";
import { Layover } from "../../../../components/layover";
import HelpLayout from "../../layout";

const ProductsFAQS: NextPage = () => {

    const [contact, setContactForm] = useState(false);

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <>
                    <div className='w-screen flex flex-col justify-center items-center py-12 '>
                        <div className='h-80 my-20 w-1/2 flex flex-col items-center justify-evenly'>
                            <h1 className='text-2xl'>About our products</h1>
                            <h2></h2>
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
                </>
            </HelpLayout>
        </>

    )
}

export default ProductsFAQS