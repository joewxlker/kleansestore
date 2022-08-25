import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { client } from "../pages/_app";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { products?: inferQueryOutput<'stripe.all-products'>, params: string }



const Products: FC<ShopProps> = (props): JSX.Element => {

    const { data: session } = useSession()

    const [overlay, openOverlay] = useState(false);
    const [productData, setProductData] = useState<ProductData>();

    const handleClick = (images: string, name: string, amount: number, price: string) => {
        setProductData({ images: images, name: name, amount: amount, default_price: price })
        openOverlay(true);
    }

    return (
        <>
            <div className='z-1 relative w-full flex flex-col items-center justify-start'>
                <h1 className='text-center p-5 text-2xl'>{props.params}</h1>
                <div className='w-2/3 h-full flex flex-row flex-wrap'>{props.products?.map((data) => {
                    return (
                        <>
                            {data.metadata.category !== props.params && <div key={data.name} className='w-80 m-6 flex flex-col bg-white'>
                                <div className='w-full hover:blur cursor-pointer' onClick={e => handleClick(data.images[0], data.name, data.unit_amount! / 100, data.default_price)}>
                                    <Image alt='' src={data.images[0]!} height={350} width={400} />
                                </div>
                                <h2>{data.name}</h2>
                                {data.unit_amount! / 100}
                                <button className='' onClick={e => handleCartUpdates({ image: data.images[0], price: data.default_price, quantity: 1 }, session)}>Add to cart</button>
                            </div>}
                        </>
                    )
                    // renders static data ( stripe product data) to elements 
                })}</div>
            </div>
            {overlay && <ProductOverlay onCloseOverlay={() => openOverlay(false)} data={productData!} />}
        </>
    );
}

export default Products

interface ProductData {
    images: string;
    name: string;
    amount: number;
    default_price: string;
}
interface ProductOverlayProps {
    onCloseOverlay: () => void;
    data: ProductData;
}
export const ProductOverlay: FC<ProductOverlayProps> = ({ onCloseOverlay, data }): JSX.Element => {


    const { data: session } = useSession()

    const callBack = useCallback(() => {
        onCloseOverlay();
    }, [onCloseOverlay])

    return (
        <div className='fixed top-0 w-screen h-screen flex items-center justify-center'>
            <div className='w-4/6 h-4/6 bg-grey'>
                <div className='h-20 w-full bg-salmon'>
                    <button onClick={e => callBack()}>X</button>
                </div>
                <div className='z-1 relative w-full h-full flex flex-col'>
                    <div key={data.name} className='w-80 m-5 flex flex-col bg-white'>
                        <div className='w-full h-full cursor-pointer'>
                            <Image alt='' src={data.images[0]!} height={350} width={400} />
                        </div>
                        <h2>{data.name}</h2>
                        {data.amount}
                        <button className='' onClick={e => handleCartUpdates({ image: data.images[0], price: data.default_price, quantity: 1 }, session)}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export interface CartItem {
    image: string;
    item: string;
    price: string;
    quantity: number;
}

export const handleCartUpdates = async (item: CartItem, session: string) => {

    if (session !== null) {
        const res = client.mutation('mongo.mongo-carts', { session: session, item: item });
        return console.log(res)
    }
    return setLocalStorage(item)

    //sends cart data to db if sesison detected, else uses local storage
}

export const setLocalStorage = (data: CartItem) => {

    const localCart = window.localStorage.getItem('cart');
    if (localCart !== null) {
        const filtered = JSON.parse(localCart).filter((x: CartItem) => x.price === data.price);
        if (filtered.length !== 0) return
        window.localStorage.setItem('cart', JSON.stringify([...JSON.parse(localCart), data]));
        return
    }
    else return window.localStorage.setItem('cart', JSON.stringify([data]));

    // checks storage against input data and inserts data into array if no duplicates, else inserts new json array  

}