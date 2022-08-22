import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { products?: inferQueryOutput<'stripe.all-products'>, params: string }

const Products: FC<ShopProps> = (props): JSX.Element => {

    const [overlay, openOverlay] = useState(false);
    const [productData, setProductData] = useState<ProductData>();

    const handleClick = (images: Array<string>, name: string, amount: number) => {
        setProductData({ images: images, name: name, amount: amount })
        openOverlay(true);
    }

    return (
        <>
            <div className='z-1 relative w-full flex flex-col'>
                <h1 className='text-center p-5'>{props.params} Items</h1>
                <div className='w-full h-full flex flex-row flex-wrap'>{props.products?.map((props) => {
                    return (
                        <div key={props.name} className='w-80 m-5 flex flex-col bg-white'>
                            <div className='w-full hover:blur cursor-pointer' onClick={e => handleClick(props.images, props.name, props.unit_amount! / 100)}>
                                <Image alt='' src={props.images[0]!} height={350} width={400} />
                            </div>
                            <h2>{props.name}</h2>
                            {props.unit_amount! / 100}
                            <button className=''>Add to cart</button>
                        </div>)
                    // renders static data ( stripe product data) to elements 
                })}</div>
            </div>
            {overlay && <ProductOverlay onCloseOverlay={() => openOverlay(false)} data={productData!} />}
        </>
    );
}

export default Products

interface ProductData {
    images: Array<string>;
    name: string;
    amount: number;
}
interface ProductOverlayProps {
    onCloseOverlay: () => void;
    data: ProductData;
}
export const ProductOverlay: FC<ProductOverlayProps> = ({ onCloseOverlay, data }): JSX.Element => {

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
                        <button className=''>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

