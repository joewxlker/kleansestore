import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import HelpLayout from "../layout";

const Stockists: NextPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <>

            <Head>
                <meta name="description" content="" />
            </Head>
            <HelpLayout>
                <div className='w-screen h-screen flex flex-col justify-start items-center pt-18'>
                    <div className='lg:w-1/2 h-3/6 my-20 w-5/6 flex flex-col items-center justify-evenly'>
                        <h1 className='text-2xl'>Stockists</h1>
                        <p>Influential, innovative and progressive, Kleanse is reinventing a wholly modern approach
                            to fashion. Under the new vision of creative director Fabrice, the House has
                            redefined luxury for the 21st century, further reinforcing its position as one of the
                            world&#39;s most desirable fashion houses. Eclectic, contemporary, romantic—Kleanse products
                            represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality
                            and attention to detail.
                            Kleanse is part of the Kering Group. A global Luxury group, Kering manages the development
                            of a series of renowned Houses in Fashion, Leather Goods, Jewellery and Watches.
                            Discover the stories behind Alessandro Michele&apos;s collections, exclusively on Stories.</p>
                    </div>
                </div>
            </HelpLayout>
        </>

    )
}

export default Stockists
