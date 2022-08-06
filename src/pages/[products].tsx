import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Layout from "../components/layout";
import { sendData } from "../utils/sendData";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { products: inferQueryOutput<'stripe.all-products'>, params: string }

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { products: 'all-products' } }],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const req = await fetch('http://localhost:3000/api/stripe');
    const products = await req.json();
    const params = context.params?.products
    return { props: { products, params } }
}

const Products: FC<ShopProps> = (props): JSX.Element => {

    useEffect(() => {
        console.log(props)
    })

    return (
        <>
            <Layout>
                <div className='Products-entry-container'>
                    <h1>{props.params} Items</h1>
                    <button onClick={e => sendData('sendgrid', { email: 'joewxlk3r@gmail.com' }).then((res) => console.log(res))}>CLICK ME</button>
                    <h1>{props.products.map((props) => {
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