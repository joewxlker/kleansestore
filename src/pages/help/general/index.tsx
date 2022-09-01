import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import HelpLayout from "../layout";

const FAQS: NextPage = () => {

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <div className='w-screen h-screen flex flex-col justify-start items-center pt-18'>
                    <div className='h-80 my-20 w-1/2 flex flex-col items-center justify-evenly'>
                        <h1 className='text-2xl'>FAQS</h1>
                        <Link href='/help/general/shipping'><a>Shipping</a></Link>
                        <Link href='/help/general/products'><a>Our Products</a></Link>
                        <Link href='/help/general/shipping'><a>Shipping</a></Link>
                    </div>
                </div>
            </HelpLayout>
        </>

    )
}

export default FAQS