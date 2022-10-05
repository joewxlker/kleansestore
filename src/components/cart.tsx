import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react"
import { CartContext } from "../pages/_app";
import { ProductData } from "./products";


export const Cart: FC = (): JSX.Element => {

    const [items, setItems] = useContext<any>(CartContext)

    const handleQuantities = (item: ProductData | undefined, incDec: boolean) => {
        if (!item || !items) return null
        const [start, end] = findStartEnd(item)
        if (!start || !end) return null
        if (incDec) {
            console.log(items[0].quantity)
            return setItems([...start, { ...item, quantity: item.quantity + 1 }, ...end]);
        }
        return setItems([...start, { ...item, quantity: item.quantity - 1 }, ...end]);
    }

    const handleRemoveItem = (item: ProductData) => {
        if (!item || !items) return null
        const [start, end] = findStartEnd(item);
        if (!start || !end) return null
        if (items.length === 1) {
            return setItems([])
        }
        return setItems([...start, ...end]);
    }

    const findStartEnd = (item: ProductData) => {
        const index = items.findIndex((x: ProductData | undefined) => { return x?.default_price === item.default_price });
        let start: Array<ProductData> = []
        let end: Array<ProductData> = []
        for (let i = 0; i <= index - 1; i++) {
            if (i !== index) start.push(items[i])
        }
        for (let i = index; i < items.length; i++) {
            if (i !== index) end.push(items[i])
        }
        return [start, end]
    }

    if (!items || items.length === 0) return (
        <div id='hardfadein' className="w-full h-full flex flex-col justify-center items-center">
            <p className='text-grey'>Your cart is empty</p>
            <button className='bg-grey px-3 py-2 text-white' onClick={e => window.location.href = '/products/all-products'}>Shop Now</button>
        </div>
    )

    return (
        <>
            <div key={items[0].name} className='w-full flex flex-col justify-center items-center h-full z-10 bg-white'>
                <div className='overflow-y-scroll' style={{ maxHeight: '20vh' }}>
                    {items !== undefined && items !== null &&
                        items.map((data: ProductData) => {
                            return (
                                <div key={data.name} id='hardfadein' className='p-2 w-full flex flex-row items-center justify-between'>
                                    <p className='text-grey'>{data.name}</p>
                                    {data.image !== undefined && <Image alt={`kleanse product ${data.name}`} src={data.image} height={90} width={90} />}
                                    <span className='flex w-1/2 flex-row justify-center items-center'>
                                        <div className='flex w-4/6 flex-col jusitfy-center items-center'>
                                            <button className='w-8 h-8 bg-salmon'
                                                disabled={data.quantity === 10}
                                                onClick={e => { handleQuantities(data, true); }}
                                                style={{ borderRadius: '25px', opacity: `${data?.quantity === 10 ? '50%' : '100%'}` }}>+</button>
                                            <h3>{data.quantity}</h3>
                                            <button className='w-8 h-8 bg-salmon'
                                                disabled={data.quantity === 1}
                                                onClick={e => { handleQuantities(data, false); }}
                                                style={{ borderRadius: '25px', opacity: `${data.quantity === 1 ? '50%' : '100%'}` }}>-</button>
                                        </div>
                                        <button
                                            className="h-16 w-16 text-grey rounded m-2"
                                            onClick={e => {
                                                //@ts-ignore
                                                handleRemoveItem(data);
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
