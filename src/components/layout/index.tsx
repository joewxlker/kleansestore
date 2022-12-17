import { useSession } from "next-auth/react";
import Head from "next/head";
import { FC, useContext, useEffect } from "react";
import { CartContext, client } from "../../pages/_app";
import { Messenger } from "../messenger";
import { Header } from "../header";
import { Footer } from "../footer";


const Layout: FC<{ children: JSX.Element; }> = ({ children }): JSX.Element => {

    const classes = {
        eventHeader: "w-full h-12 bg-grey text-white flex flex-row justify-center items-center hover:opacity-80 cursor-pointer z-[100] relative"
    }

    const [, setitems] = useContext(CartContext);
    const { data: session } = useSession();

    useEffect(() => {
        const loadResources = async () => {
            if (!setitems) {
                throw new Error('setitems context is undefined')
            }
            else if (!session) {
                const rawLocalData = window.localStorage.getItem('cart');
                if (rawLocalData === 'undefined' || !rawLocalData) return console.log('cart is undefined or null');
                console.log('loading local storage');
                return JSON.parse(rawLocalData) && setitems(JSON.parse(rawLocalData));
            } else {
                console.log('loading data from database');
                const res = session && client.query('mongo.mongo-carts', { email: session.user?.email ? session.user.email : '' });
                const result = await res

                result !== undefined && setitems(result)
            }
        }
        loadResources();
    }, [session, setitems])

    return (
        <>
            <Head>
                <title>kleanse</title>
                <meta name="description" content="kleanse official website" />
            </Head>
            <section className={classes.eventHeader}>
                <h2>New stock out now</h2>
            </section>
            <Header />
            {children}
            <Messenger />
            <Footer />
        </>
    )
}

export default Layout;





