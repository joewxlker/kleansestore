import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { CartContext, client } from "../pages/_app";
import { handleCartUpdates, ProductData } from "./products";

interface CartProps {
    onCloseCart: () => void
};

export const Cart: FC<CartProps> = ({ onCloseCart }): JSX.Element => {

    const [items, setItems] = useState<Array<ProductData | undefined>>();
    //@ts-ignore
    const [cartItems, setCartItems] = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        handleCartClientData();
    }, [])

    const handleCartClientData = async () => {
        setLoading(true)
        if (!await getItemsFromDb()) {
            const localCart = window.localStorage.getItem('cart')
            if (localCart !== undefined || localCart !== null) { setLoading(false); return setItems(JSON.parse(localCart!)) }
            // set items using local storage
            setLoading(false)
            return setItems(cartItems);
            // set items using cart context
        }
        return setItems(await getItemsFromDb())
        // set items using database data
    }

    const getItemsFromDb = async () => {
        if (session) {
            // @ts-ignore
            const user = await client.query('mongo.mongo-carts', { email: session.user?.email });
            setLoading(false)
            return user?.cart
        }
        // return cart
        else return false
    }

    const handleCallback = useCallback(() => {
        onCloseCart()
    }, [onCloseCart])

    if (loading) return (
        <div className='h-full w-full flex justify-center items-center'>
        </div>
    )

    if (!loading && (items === undefined || items === null || items.length === 0)) return (
        <div id='hardfadein' className="w-full h-full flex flex-col justify-center items-center">
            <p className='text-grey'>Your cart is empty</p>
            <button className='bg-grey px-3 py-2 text-white' onClick={e => window.location.href = '/products/all-products'}>Shop Now</button>
        </div>
    )

    return (
        <>
            {items !== undefined && items !== null && <div className='w-full flex flex-col justify-center items-center'>
                {
                    items.map((data) => {
                        return (
                            <div key={data?.name} id='hardfadein' className='w-full flex flex-row items-center justify-between'>
                                <p className='text-grey'>{data?.name}</p>
                                {data?.image !== undefined && <Image src={data?.image} height={90} width={90} />}
                                <span className='flex w-1/2 flex-col justify-center items-center'>
                                    <div className='flex w-4/6 flex-col jusitfy-center items-center'>
                                        <button className='w-full bg-salmon'>+</button>
                                        <h3>{data?.quantity}</h3>
                                        <button className='w-full bg-salmon'>-</button>
                                    </div>

                                    <button
                                        className="h-full w-full text-white bg-grey"
                                        onClick={e => {
                                            //@ts-ignore
                                            handleCartUpdates(data, session, false, null);
                                            handleCartClientData()
                                        }
                                        }>X</button>
                                </span>
                            </div>
                        )
                    }

                    )}
                {items.length !== 0 && <button className='mt-5 px-3 py-2 bg-white' onClick={e => {
                    window.localStorage.clear();
                    setItems([]);
                    handleCallback();
                }}>Clear cart</button>}
            </div>}
        </>
    )
}
