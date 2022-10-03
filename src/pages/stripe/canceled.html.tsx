import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Layout from "../../components/layout"


const Success: NextPage = (props) => {

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

