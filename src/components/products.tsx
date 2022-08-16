import { FC } from "react";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { products?: inferQueryOutput<'stripe.all-products'>, params: string }

const Products: FC<ShopProps> = (props): JSX.Element => {

    return (
        <>
            <div className='z-1 relative w-full flex flex-column'>
                <h1>{props.params} Items</h1>
                <h1>{props.products?.map((props) => {
                    return (
                        <>
                            {props.name}
                            {props.description}
                            <div style={{ background: `url(${props.images})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '15vw', width: '20vw' }}>
                                {props.unit_amount}
                                {props.currency}
                            </div>
                        </>)
                    // renders static data ( stripe product data) to elements 
                })}</h1>
            </div>
        </>
    );
}

export default Products