import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import Stripe from "stripe";
import { CartContext, client } from "../pages/_app";
import { inferQueryOutput } from "../utils/trpc";
import { Layover } from "./layover";

interface ShopProps {
    products?: inferQueryOutput<'stripe.all-products'>, params: string;
}

export interface RawProductData {
    images: Array<string | undefined>;
    default_price: string | Stripe.Price | null | undefined;
    unit_amount: number | null | undefined;
    name: string;
    quantity: number;
    description: string | null;
}


const Products: FC<ShopProps> = (props): JSX.Element => {

    const { data: session } = useSession()

    const [overlay, openOverlay] = useState(false);
    const [productData, setProductData] = useState<RawProductData>({ images: [''], default_price: '', name: '', unit_amount: 0, quantity: 0, description: '' });
    //@ts-ignore
    const [cartItems, setCartItems] = useContext(CartContext);

    const handleClick = (data: RawProductData) => {
        // react component functions use raw product data
        setProductData(data);
        productData !== undefined && openOverlay(true);
    }

    const setContext = (item: ProductData) => {
        // react callback functions use refined product data
        // if (session) return
        if (cartItems === undefined) return setCartItems([item]);
        const filtered = cartItems.filter((x: ProductData) => x.default_price === item.default_price);
        if (filtered.length === 0) setCartItems([...cartItems, item]);
        //TODO fix - setContext callback in overlay updates cart, products doesnt update cart
    }

    return (
        <>
            <div className='z-1 relative w-full flex flex-col items-center justify-start'>
                <h1 className='text-center p-5 text-2xl'>{props.params}</h1>
                <div className='lg:w-2/3 w-full h-full flex flex-row lg:justify-start justify-center flex-wrap'>{props.products?.map((data) => {
                    return (
                        <div key={data.name}>
                            {data.metadata.category !== props.params && <div className='w-80 m-6 flex flex-col bg-white items-center'>
                                <button className='w-full hover:blur cursor-pointer' onClick={e => {
                                    handleClick({
                                        images: data.images,
                                        default_price: data.default_price,
                                        name: data.name,
                                        unit_amount: data.unit_amount,
                                        description: data.description,
                                        quantity: 1
                                    })
                                    // if no image url provided sets image to empty string
                                    // if no price provided, disables usage
                                }
                                }
                                >
                                    <Image alt={`kleanse product ${data.name}`} src={data.images[0]!} height={350} width={400} />
                                </button>
                                {/* <h2>{data.name}</h2>
                                {data.unit_amount! / 100} */}
                                <AddToCartButton
                                    data={{
                                        images: data.images,
                                        default_price: data.default_price,
                                        name: data.name,
                                        unit_amount: data.unit_amount,
                                        quantity: 1,
                                        description: data.description,
                                    }}
                                    onSetContext={item => setContext(item)}
                                    session={session} />
                            </div>}
                        </div>
                    )
                    // renders static data ( stripe product data) to elements 
                })}</div>
            </div>
            {overlay && <ProductOverlay onCloseOverlay={() => openOverlay(false)} data={productData} onSetContext={item => setContext(item)} />}
        </>
    );
}

export default Products

export interface ProductData {
    image: string;
    name: string;
    amount: number;
    default_price: string;
    quantity: number;
}
interface ProductOverlayProps {
    onCloseOverlay: () => void;
    data: RawProductData;
    onSetContext: (item: ProductData) => void;
}
export const ProductOverlay: FC<ProductOverlayProps> = ({ onCloseOverlay, data, onSetContext }): JSX.Element => {

    const { data: session } = useSession()

    const callBack = useCallback(() => {
        onCloseOverlay()
    }, [])

    return (
        <>
            <Layover>
                <div className='flex flex-col'>
                    <div className='h-20 w-full bg-grey flex justify-end'>
                        <button className='w-2/6 bg-grey flex justify-center items-center p-auto text-white' onClick={e => callBack()}>X</button>
                    </div>

                    <div className='flex flex-col justify-center items-center w-full h-full'>
                        <div className='z-1 relative h-full flex lg:flex-row md:flex-row flex-col w-full'>
                            <div key={data.name} className='w-full flex lg:flex-row md:flex-row flex-col flex-wrap' style={{ height: 'fit-content' }}>
                                <div className='h-full w-full flex flex-col justify-start'>
                                    <div className='w-full flex lg:flex-row md:flex-row flex-col'>
                                        <div className='w-full h-full md:w-full'>
                                            <Image alt={`kleanse product ${data.name}`} src={data.images[0]!} height={390} width={800} objectFit={'cover'} />
                                        </div>
                                        <div className='lg:w-1/6 md:w-1/6 w-full  h-4/6 flex lg:flex-col md:flex-col flex-row justify-center items-center'>
                                            <div className='h-1/3 w-full'>
                                                <Image alt={`kleanse product ${data.name}`} src={data.images[0]!} height={122.4} width={130} objectFit={'cover'} />
                                            </div>
                                            <div className='h-1/3 w-full'>
                                                <Image alt={`kleanse product ${data.name}`} src={data.images[0]!} height={122.4} width={130} objectFit={'cover'} />
                                            </div>
                                            <div className='h-1/3 w-full'>
                                                <Image alt={`kleanse product ${data.name}`} src={data.images[0]!} height={122.4} width={130} objectFit={'cover'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:w-5/6 md:w-full w-full bg-white lg:p-8 md:p-8 p-2 flex flex-col' style={{ height: '80%' }}>
                                        <h1 className="text-grey">{data.description}</h1>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:w-2/6 md:w-full w-full">
                                    <div className='lg:w-5/6 md:w-full p-3 w-full flex flex-col text-grey'>
                                        <h2>{data.name}</h2>
                                        {data.unit_amount}
                                    </div>



                                </div>
                            </div>
                            {/* images */}

                        </div>
                        <span className='lg:w-1/6 md:w-1/6 w-5/6'><AddToCartButton data={data} onSetContext={onSetContext} session={session} /></span>
                    </div>
                </div>
            </Layover>

        </>
    )
}


interface AddToCartButtonProps {
    onSetContext: (item: ProductData) => void;
    data: RawProductData;
    session: null | Session;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ onSetContext, data, session }): JSX.Element => {

    const onCallback = useCallback((item: ProductData) => {
        onSetContext(item)
    }, [])

    return (
        <button
            className='shadow w-full flex flex-row justify-center items-center p-2'
            onClick={e => {
                if (data.default_price === undefined || data.default_price === null) return;
                const images = data.images[0] !== undefined ? data.images[0] : '';
                const amount = data.unit_amount !== undefined ? data.unit_amount : 0;
                const finalAmount = amount !== null ? amount : 0;
                // if no image url provided sets image to empty string
                // if no unit_amount provided, sets unit amount to 0 on client side
                const item = {
                    image: images,
                    name: data.name,
                    amount: finalAmount,
                    default_price: JSON.stringify(data.default_price),
                    quantity: 1
                };
                handleCartUpdates(item, session, true, null).then((cart) => {
                    onCallback(item);
                });
            }
            }
            disabled={
                data.default_price === undefined || data.default_price === null
            }
        >
            <span className='w-full h-full flex flex-row justify-center items-center'>
                <p className="w-4/6">Add to cart</p>
                <span className='h-full w-2/6'>
                    <Image alt='kleanse' src='/images/kleanse-logos/kleanse-wing.svg' height={40} width={40} />
                </span>
            </span>
        </button>
    )
}

export const handleCartUpdates = async (item: ProductData, session: Session | null, insert: boolean, clear: null | boolean) => {

    if (session) {
        //TODO session.email.use possibly undefined
        //@ts-ignore
        const res = await client.mutation('mongo.mongo-carts', { email: session.user?.email, item: item, options: { insert: insert, clear: clear } });
        if (res !== false) {
            return res
        }
        return false
    }
    return setLocalStorage(item)

    //sends cart data to db if sesison detected, else uses local storage
}

export const setLocalStorage = (data: ProductData) => {

    const localCart = window.localStorage.getItem('cart');
    if (localCart !== null) {
        const filtered = JSON.parse(localCart).filter((x: ProductData) => x.default_price === data.default_price);
        if (filtered.length !== 0) return
        window.localStorage.setItem('cart', JSON.stringify([...JSON.parse(localCart), data]));
        return
    }
    else return window.localStorage.setItem('cart', JSON.stringify([data]));

    // checks storage against input data and inserts data into array if no duplicates, else inserts new json array  

}

