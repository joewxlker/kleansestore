import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import { inferQueryOutput } from "../../utils/trpc"
import { client } from "../_app"

const Success: NextPage = (props) => {

    const { data: session } = useSession();

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <Layout>
                <div className='w-screen flex flex-col justify-center items-center pt-18'>
                    <div className='h-80 w-full mb-20'>
                        <Image src='/images/models/womenputtingcream.jpg' alt='womens skin care banner' height={400} width={2000} objectFit='cover' />
                    </div>
                    <div className='h-80 my-20 w-1/2 flex flex-col items-center justify-evenly'>
                        <h1>YOUR ORDER HAS BEEN CANCELED</h1>
                        <Link href='/' ><button className="bg-grey px-3 py-2 text-white">Return to shopping</button></Link>
                        <Link href='/checkout' ><button className="bg-grey px-3 py-2 text-white">Return to checkout</button></Link>
                    </div>
                </div>
            </Layout>
        </>

    )
}

export default Success

