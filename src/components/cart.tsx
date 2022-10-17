import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react"
import { useAddCart } from "../hooks/addToCart";
import { CartContext } from "../pages/_app";
import { ProductData, setLocalStorage } from "./products";


export const Cart: FC = (): JSX.Element => {

    const [items] = useContext<any[]>(CartContext);
    const { handleQuantities, handleRemoveItem } = useAddCart();

    useEffect(() => {
        items && setLocalStorage(items);
    }, [useAddCart, items])

    if (!items || items.length === 0) return (
        <div id='hardfadein' className="w-full flex flex-col justify-center items-center">
            <p className='text-grey'>Your cart is empty</p>
            <button className='bg-grey px-3 py-2 text-white' onClick={e => window.location.href = '/products/all-products'}>Shop Now</button>
        </div>
    )

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center z-10 bg-white'>
                <div className='overflow-y-scroll'>
                    {items !== undefined && items !== null &&
                        items.map((data: ProductData) => {
                            return (
                                <div key={data.name} id='hardfadein' className='p-2 w-full flex flex-row items-center justify-between'>
                                    <p className='text-grey'>{data.name}</p>
                                    {data.image !== undefined && <Image alt={`kleanse product ${data.name}`} src={data.image} height={90} width={90} />}
                                    <span className='flex w-1/2 flex-row justify-center items-center'>
                                        <div className='flex w-4/6 flex-col jusitfy-center items-center'>
                                            <button className='w-6 h-6'
                                                disabled={data.quantity === 10}
                                                onClick={e => { handleQuantities(data, true); }}
                                                style={{ opacity: `${data?.quantity === 10 ? '50%' : '100%'}` }}>+</button>
                                            <h3>{data.quantity}</h3>
                                            <button className='w-6 h-6'
                                                disabled={data.quantity === 1}
                                                onClick={e => { handleQuantities(data, false); }}
                                                style={{ opacity: `${data.quantity === 1 ? '50%' : '100%'}` }}>-</button>
                                        </div>
                                        <button
                                            className="h-16 w-16 text-grey m-2 bg-salmon rounded"
                                            onClick={e => handleRemoveItem(data)}>X</button>
                                    </span>
                                </div>
                            )
                        }

                        )}
                </div>
                {items?.length !== 0 && <Link
                    href='/stripe/checkout'
                ><a className='w-[90%]' ><button className='mt-5 py-2 bg-salmon rounded margin-4 w-[100%]' onClick={e => {
                }}>Checkout</button></a></Link>}
            </div>
            {/* <div className='bg-grey w-screen h-screen fixed top-0 left-0' onMouseEnter={e => handleCartUpdates(items, session, false, null)}></div> */}
        </>
    )
}
