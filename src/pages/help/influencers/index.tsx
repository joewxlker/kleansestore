import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import HelpLayout from "../layout";

const About: NextPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <div className='w-screen h-screen flex flex-col justify-start items-center'>
                    <div className='h-4/6 my-20 w-1/2 flex flex-col items-center justify-evenly'>
                        <h1 className='text-2xl'>INFLUENCERS</h1>
                        <p>
                            Kleanse values self driven indiviuals and because of that we have decided to give power to the amazing influencers of todays social media platforms to convey our products.
                        </p>
                        <div className='w-full flex flex-col justify-center item-center'>
                            <h2 className='text-lg text-center'>Contact us on our socials for more info!</h2>
                            <span className="flex flex-row items-start h-full w-full justify-evenly p-12">
                                <Link href='https://www.facebook.com'><a className='flex flex-row w-full items-center' >
                                    <Image src='/images/ui-elements/facebook-f-brands.svg' width={80} height={80} />
                                    <p className="mx-3">Facebook</p></a></Link>
                                <Link href='https://www.twitter.com'><a className='flex flex-row w-full items-center' >
                                    <Image src='/images/ui-elements/instagram-brands.svg' width={80} height={80} />
                                    <p className="mx-3">Instagram</p></a></Link>
                                <Link href='https://www.instagram.com'><a className='flex flex-row w-full items-center' >
                                    <Image src='/images/ui-elements/twitter-brands.svg' width={80} height={80} /><p className="mx-3">Twitter</p>
                                </a></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </HelpLayout>
        </>

    )
}

export default About

interface ModuleProps {
    title?: string;
    images?: Array<string>;
    textBody?: Array<string>;
    align: string;
}

export const Module: FC<ModuleProps> = ({ title, images, textBody, align }): JSX.Element => {
    return (
        <div className={`w-full px-40 py-20 flex flex-col items-${align}`}>
            <div className='w-2/3 flex flex-col justify-evenly'>
                <h1 className='text-4xl'>{title}</h1>
                <h2 className='text-2xl'>sub heading</h2>
                {textBody !== undefined && <p>{textBody[0]}</p>}
                {/* @ts-ignore */}
                {images !== undefined && <Image alt={``} src={images[0]} height={400} width={700} objectFit='cover' />}
            </div>
        </div>
    )
}