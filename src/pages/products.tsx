import { GetStaticProps } from "next";
import { FC } from "react";
import Layout from "../components/layout";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { stripe: inferQueryOutput<'stripe.all-products'> }

export const getStaticProps: GetStaticProps = async () => {
    const database = await fetch('http://localhost:3000/api/getStripeItems');
    const stripe = await database.json();
    return { props: { stripe } }
}
export const Products: FC<ShopProps> = (props): JSX.Element => {
    return (
        <>
            <Layout>
                <div className='Products-entry-container'>
                    <h1>{props.stripe.map((props) => {
                        return (
                            <>
                                {props.name}
                                {props.description}
                                <div style={{ background: `url(${props.images})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '15vw', width: '20vw' }}>

                                    {props.unit_amount}
                                    {props.currency}
                                </div>
                            </>)
                    })}</h1>
                </div>
            </Layout>
            {/* {bool['sidebar'] && mobile && <div className='darken-bg'/>} */}
        </>
    );
}

export default Products