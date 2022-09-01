import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import HelpLayout from "../../layout";

const TrackingOrders: NextPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <div className='w-screen h-screen flex flex-col justify-start items-center'>
                    <div className='h-4/6 my-20 w-1/2 flex flex-col items-center justify-evenly'>
                        <h1 className='text-2xl'>TRACKING ORDERS</h1>
                        <p>
                            Kleanse values self driven indiviuals and because of that we have decided to give power to the amazing influencers of todays social media platforms to convey our products.
                        </p>
                        <div className='w-full flex flex-col justify-center item-center'>
                            <h2 className='text-lg text-center'></h2>
                        </div>
                    </div>
                </div>
            </HelpLayout>
        </>

    )
}

export default TrackingOrders