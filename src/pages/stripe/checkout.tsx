import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { client } from '../_app';
import Head from 'next/head';
import { ProductData } from '../../components/products';
import Layout from '../../components/layout';

const Checkout: NextPage = (): JSX.Element => {

    const [items, setItems] = useState([]);

    const { data: session, data: loading } = useSession();

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    useEffect(() => {
        const fetchItems = async () => {
            if (session) {
                if (session.user?.email === undefined || session.user?.email === null) return
                const data = await client.query('mongo.mongo-carts', { email: session.user.email });
                return setItems(data?.cart);
            }
            setItems(JSON.parse(window.localStorage.getItem('cart')!))
        }
        fetchItems();
    }, [useSession, session])

    const handleResponse = async () => {
        const itemData = items.map((x: ProductData) => { return { quantity: x.quantity, price: `${x.default_price.replace(/[^a-zA-Z0-9 _ ]/g, '')}` } });
        const res = await client.mutation('stripe.create-checkout-session', { items: itemData, email: session?.user?.email, });
        res.url !== undefined && res.url !== null ? window.location.href = res.url : '';
        return null
    }

    if (items === undefined) return <></>
    return (
        <>
            <Head>
                <meta name='description' />
                <title>Kleanse checkout</title>
            </Head>
            <Layout>
                <div className='w-screen h-screen flex flex-col justify-center items-center'>
                    <div className='w-full h-full flex-row flex justify-center items-center'>
                        <div className='w-2/6 flex flex-col justify-evenly items-center h-4/6'>
                            <h1 className='text-2xl'>Checkout Items</h1>
                            {items !== null && <>
                                <div className='h-1/2 overflow-y-scroll'>
                                    {items.map(({ image, quantity, amount, name }) => {
                                        return (
                                            <div key={name} className="flex flex-row">
                                                <Image src={image} alt={`${name} image`} height={100} width={100} />
                                                <div>
                                                    <h2 className='text-xl'>{name}</h2>
                                                    <h3><strong>Quantity {quantity}</strong></h3>
                                                    <p>${quantity * amount / 100}</p>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                                <p>Total : ${items.map(({ amount, quantity }) => { return (amount * quantity) / 100 }).reduce((x, y) => x + y, 0)}</p>
                            </>}
                            <div className='checkout-side-container'>
                                {/**TODO, fix infinite load when proceed clicked before data can load */}
                                {/* <p>TODO, implement order tracking and create middleware to handle user input</p> */}
                            </div>
                        </div>
                        <button onClick={e => handleResponse()} className='px-4 h-80 w-60 py-3 bg-grey text-white'>Proceed to checkout</button>
                    </div>
                </div>
            </Layout>
        </>
    )
};
export default Checkout;

const checkoutWithoutSession = {
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    hidden: '',
}

const checkoutWithSession = {
    street: '',
    city: '',
    state: '',
    hidden: '',
}

export interface CheckoutWithSessionForm {
    street: string,
    city: string,
    state: string,
    hidden: string,
}

export interface CheckoutWithoutSessionForm {
    firstname: string,
    lastname: string,
    email: string,
    street: string,
    city: string,
    state: string,
    hidden: string,
}