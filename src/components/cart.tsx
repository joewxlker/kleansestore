import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { CartContext, client } from "../pages/_app";
import { handleCartUpdates, ProductData } from "./products";

interface CartProps {
    onCloseCart: () => void
};

export const Cart: FC<CartProps> = (): JSX.Element => {

    const [items, setItems] = useState<Array<ProductData | undefined>>();
    //@ts-ignore
    const [cartItems, setCartItems] = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        console.log('')
        handleCartClientData();
    }, [])

    const handleQuantities = (item: ProductData | undefined, incDec: boolean) => {
        if (item === undefined) return
        if (items) {
            const index = items.findIndex((x: ProductData | undefined) => { return x?.default_price === item.default_price });
            // finds index of value to be updated
            if (incDec) {
                if (item.quantity > 10) return
                items.splice(index, 1, { ...item, quantity: item.quantity++ })
                return items
            }
            if (item.quantity === 1) return
            items.splice(index, 1, { ...item, quantity: item.quantity++ })
            return items
        }
    }

    const handleCartClientData = async () => {
        setLoading(true)
        if (!await getItemsFromDb()) {
            const localCart = window.localStorage.getItem('cart')
            if (localCart !== undefined || localCart !== null) { setLoading(false); return setItems(JSON.parse(localCart!)) }
            // set items using local storage2^49
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
            <div className='w-full flex flex-col justify-center items-center h-full z-10 bg-white'>
                <div className='overflow-y-scroll' style={{ maxHeight: '20vh' }}>
                    {items !== undefined && items !== null &&
                        items.map((data) => {
                            return (
                                <div key={data?.name} id='hardfadein' className='p-2 w-full flex flex-row items-center justify-between'>
                                    <p className='text-grey'>{data?.name}</p>
                                    {data?.image !== undefined && <Image alt={`kleanse product ${data.name}`} src={data?.image} height={90} width={90} />}
                                    <span className='flex w-1/2 flex-row justify-center items-center'>
                                        <div className='flex w-4/6 flex-col jusitfy-center items-center'>
                                            <button className='w-8 h-8 bg-salmon'
                                                disabled={data?.quantity === 10}
                                                onClick={e => setItems(handleQuantities(data, true))}
                                                style={{ borderRadius: '25px', opacity: `${data?.quantity === 10 ? '50%' : '100%'}` }}>+</button>
                                            <h3>{data?.quantity}</h3>
                                            <button className='w-8 h-8 bg-salmon'
                                                disabled={data?.quantity === 1}
                                                onClick={e => setItems(handleQuantities(data, false))}
                                                style={{ borderRadius: '25px', opacity: `${data?.quantity === 1 ? '50%' : '100%'}` }}>-</button>
                                        </div>
                                        <button
                                            className="h-16 w-16 text-grey rounded m-2"
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
                </div>
                {items?.length !== 0 && <Link
                    href='/stripe/checkout'
                ><a><button className='mt-5 px-3 py-2 bg-white' onClick={e => {
                }}>Checkout</button></a></Link>}
            </div>
            {/* <div className='bg-grey w-screen h-screen fixed top-0 left-0' onMouseEnter={e => handleCartUpdates(items, session, false, null)}></div> */}
        </>
    )
}
